using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web;

public sealed class GraphMailSender
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web)
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    };

    private readonly IHttpClientFactory httpClientFactory;
    private readonly ContactFormOptions options;

    public GraphMailSender(IHttpClientFactory httpClientFactory, ContactFormOptions options)
    {
        this.httpClientFactory = httpClientFactory;
        this.options = options;
    }

    public async Task SendAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        var accessToken = await GetAccessTokenAsync(cancellationToken);
        var client = httpClientFactory.CreateClient();
        var sender = Uri.EscapeDataString(options.GraphSenderMailbox);
        var payload = CreatePayload(message);

        using var request = new HttpRequestMessage(HttpMethod.Post, $"https://graph.microsoft.com/v1.0/users/{sender}/sendMail");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
        request.Content = new StringContent(JsonSerializer.Serialize(payload, JsonOptions), Encoding.UTF8, "application/json");

        using var response = await client.SendAsync(request, cancellationToken);
        response.EnsureSuccessStatusCode();
    }

    private async Task<string> GetAccessTokenAsync(CancellationToken cancellationToken)
    {
        var client = httpClientFactory.CreateClient();
        var tokenUrl = $"https://login.microsoftonline.com/{Uri.EscapeDataString(options.GraphTenantId)}/oauth2/v2.0/token";
        var form = new Dictionary<string, string>
        {
            ["client_id"] = options.GraphClientId,
            ["client_secret"] = options.GraphClientSecret,
            ["scope"] = "https://graph.microsoft.com/.default",
            ["grant_type"] = "client_credentials"
        };

        using var response = await client.PostAsync(tokenUrl, new FormUrlEncodedContent(form), cancellationToken);
        response.EnsureSuccessStatusCode();

        var body = await response.Content.ReadAsStringAsync(cancellationToken);
        var token = JsonSerializer.Deserialize<TokenResponse>(body, JsonOptions);

        if (string.IsNullOrWhiteSpace(token?.AccessToken))
        {
            throw new InvalidOperationException("Graph access token response did not include an access token.");
        }

        return token.AccessToken;
    }

    private object CreatePayload(ContactMessage message)
    {
        var subject = $"Website enquiry: {message.EnquiryType ?? "General enquiry"}";
        var body = new StringBuilder();

        body.AppendLine("A new enquiry has been submitted through the Antelle website.");
        body.AppendLine();
        body.AppendLine($"Name: {message.Name}");
        body.AppendLine($"Organisation: {message.Organisation ?? "-"}");
        body.AppendLine($"Email: {message.Email}");
        body.AppendLine($"Phone: {message.Phone ?? "-"}");
        body.AppendLine($"Enquiry type: {message.EnquiryType ?? "-"}");
        body.AppendLine();
        body.AppendLine("Message:");
        body.AppendLine(message.Message);

        return new
        {
            message = new
            {
                subject,
                body = new
                {
                    contentType = "Text",
                    content = body.ToString()
                },
                toRecipients = new[]
                {
                    new
                    {
                        emailAddress = new
                        {
                            address = options.ToEmail
                        }
                    }
                },
                replyTo = new[]
                {
                    new
                    {
                        emailAddress = new
                        {
                            address = message.Email,
                            name = message.Name
                        }
                    }
                }
            },
            saveToSentItems = true
        };
    }

    private sealed class TokenResponse
    {
        [JsonPropertyName("access_token")]
        public string? AccessToken { get; init; }
    }
}
