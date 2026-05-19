using System.Collections.Concurrent;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

public sealed class SpamAssessmentService
{
    private static readonly TimeSpan MinimumCompletionTime = TimeSpan.FromSeconds(3);
    private static readonly TimeSpan DuplicateWindow = TimeSpan.FromMinutes(10);
    private static readonly Regex LinkPattern = new(@"https?://|www\.", RegexOptions.IgnoreCase | RegexOptions.Compiled);
    private static readonly Regex ScriptPattern = new(@"<\s*script|javascript:", RegexOptions.IgnoreCase | RegexOptions.Compiled);

    private readonly ConcurrentDictionary<string, DateTimeOffset> recentSubmissions = new();

    public (bool IsAccepted, string Reason, ContactMessage? Message) Assess(ContactFormRequest? request)
    {
        if (request is null)
        {
            return Reject("Invalid request body.");
        }

        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            return Reject("Hidden field completed.");
        }

        if (WasSubmittedTooQuickly(request.LoadedAt))
        {
            return Reject("Form submitted too quickly.");
        }

        var name = Normalise(request.Name, 120);
        var organisation = Optional(request.Organisation, 160);
        var email = Normalise(request.Email, 254);
        var phone = Optional(request.Phone, 60);
        var enquiryType = Optional(request.EnquiryType, 80);
        var message = Normalise(request.Message, 4000);

        if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(message))
        {
            return Reject("Required fields missing.");
        }

        if (!IsEmailAddress(email))
        {
            return Reject("Invalid email address.");
        }

        if (ScriptPattern.IsMatch(message) || CountLinks(message) > 3)
        {
            return Reject("Message matched spam heuristics.");
        }

        var fingerprint = CreateFingerprint(email, message);

        if (IsDuplicate(fingerprint))
        {
            return Reject("Duplicate submission.");
        }

        return (true, "Accepted", new ContactMessage(name, organisation, email, phone, enquiryType, message));
    }

    private static (bool IsAccepted, string Reason, ContactMessage? Message) Reject(string reason) => (false, reason, null);

    private static string Normalise(string? value, int maxLength)
    {
        return (value ?? string.Empty).Trim().Replace("\0", string.Empty)[..Math.Min((value ?? string.Empty).Trim().Length, maxLength)];
    }

    private static string? Optional(string? value, int maxLength)
    {
        var normalised = Normalise(value, maxLength);
        return string.IsNullOrWhiteSpace(normalised) ? null : normalised;
    }

    private static bool IsEmailAddress(string value)
    {
        try
        {
            var address = new MailAddress(value);
            return string.Equals(address.Address, value, StringComparison.OrdinalIgnoreCase);
        }
        catch
        {
            return false;
        }
    }

    private static bool WasSubmittedTooQuickly(string? loadedAt)
    {
        if (!long.TryParse(loadedAt, out var loadedAtMilliseconds))
        {
            return true;
        }

        var loadedAtTime = DateTimeOffset.FromUnixTimeMilliseconds(loadedAtMilliseconds);
        return DateTimeOffset.UtcNow - loadedAtTime < MinimumCompletionTime;
    }

    private static int CountLinks(string value) => LinkPattern.Matches(value).Count;

    private bool IsDuplicate(string fingerprint)
    {
        var now = DateTimeOffset.UtcNow;

        foreach (var item in recentSubmissions.Where((item) => now - item.Value > DuplicateWindow))
        {
            recentSubmissions.TryRemove(item.Key, out _);
        }

        return !recentSubmissions.TryAdd(fingerprint, now);
    }

    private static string CreateFingerprint(string email, string message)
    {
        var input = $"{email.ToLowerInvariant()}:{message.ToLowerInvariant()}";
        var hash = SHA256.HashData(Encoding.UTF8.GetBytes(input));
        return Convert.ToHexString(hash);
    }
}
