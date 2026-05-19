public sealed class ContactFormOptions
{
    public string[] AllowedOrigins { get; } = ReadList("CONTACT_ALLOWED_ORIGINS");

    public string ToEmail { get; } = ReadRequired("CONTACT_TO_EMAIL");

    public string GraphTenantId { get; } = ReadRequired("GRAPH_TENANT_ID");

    public string GraphClientId { get; } = ReadRequired("GRAPH_CLIENT_ID");

    public string GraphClientSecret { get; } = ReadRequired("GRAPH_CLIENT_SECRET");

    public string GraphSenderMailbox { get; } = ReadRequired("GRAPH_SENDER_MAILBOX");

    public bool IsAllowedOrigin(string? origin)
    {
        if (string.IsNullOrWhiteSpace(origin))
        {
            return false;
        }

        return AllowedOrigins.Any((allowed) => string.Equals(allowed, origin, StringComparison.OrdinalIgnoreCase));
    }

    private static string[] ReadList(string name)
    {
        return (Environment.GetEnvironmentVariable(name) ?? string.Empty)
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);
    }

    private static string ReadRequired(string name)
    {
        var value = Environment.GetEnvironmentVariable(name);

        if (string.IsNullOrWhiteSpace(value))
        {
            throw new InvalidOperationException($"{name} is not configured.");
        }

        return value;
    }
}
