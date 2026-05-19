using System.Net;
using System.Text.Json;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

public sealed class SubmitContact
{
    private static readonly JsonSerializerOptions JsonOptions = new(JsonSerializerDefaults.Web);

    private readonly ContactFormOptions options;
    private readonly SpamAssessmentService spamAssessment;
    private readonly GraphMailSender mailSender;
    private readonly ILogger<SubmitContact> logger;

    public SubmitContact(
        ContactFormOptions options,
        SpamAssessmentService spamAssessment,
        GraphMailSender mailSender,
        ILogger<SubmitContact> logger)
    {
        this.options = options;
        this.spamAssessment = spamAssessment;
        this.mailSender = mailSender;
        this.logger = logger;
    }

    [Function("SubmitContact")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", "options", Route = "contact")] HttpRequestData request,
        CancellationToken cancellationToken)
    {
        var origin = GetOrigin(request);

        if (!options.IsAllowedOrigin(origin))
        {
            logger.LogWarning("Rejected contact form request from disallowed origin {Origin}", origin);
            return AddCors(request.CreateResponse(HttpStatusCode.Forbidden), origin);
        }

        if (request.Method.Equals("OPTIONS", StringComparison.OrdinalIgnoreCase))
        {
            return AddCors(request.CreateResponse(HttpStatusCode.NoContent), origin);
        }

        ContactFormRequest? contactRequest;

        try
        {
            contactRequest = await JsonSerializer.DeserializeAsync<ContactFormRequest>(request.Body, JsonOptions, cancellationToken);
        }
        catch (JsonException exception)
        {
            logger.LogWarning(exception, "Invalid contact form JSON payload.");
            return await JsonResponse(request, origin, HttpStatusCode.BadRequest, "The enquiry could not be processed.");
        }

        var assessment = spamAssessment.Assess(contactRequest);

        if (!assessment.IsAccepted || assessment.Message is null)
        {
            logger.LogWarning("Rejected contact form submission: {Reason}", assessment.Reason);
            return await JsonResponse(request, origin, HttpStatusCode.BadRequest, "The enquiry could not be processed.");
        }

        try
        {
            await mailSender.SendAsync(assessment.Message, cancellationToken);
        }
        catch (Exception exception)
        {
            logger.LogError(exception, "Contact form email delivery failed.");
            return await JsonResponse(request, origin, HttpStatusCode.InternalServerError, "The enquiry could not be sent.");
        }

        logger.LogInformation("Contact form submission sent for {Email}", assessment.Message.Email);
        return await JsonResponse(request, origin, HttpStatusCode.OK, "Your enquiry has been sent.");
    }

    private async Task<HttpResponseData> JsonResponse(HttpRequestData request, string? origin, HttpStatusCode status, string message)
    {
        var response = AddCors(request.CreateResponse(status), origin);
        response.Headers.Add("Content-Type", "application/json; charset=utf-8");
        await response.WriteStringAsync(JsonSerializer.Serialize(new { message }, JsonOptions));
        return response;
    }

    private HttpResponseData AddCors(HttpResponseData response, string? origin)
    {
        if (options.IsAllowedOrigin(origin))
        {
            response.Headers.Add("Access-Control-Allow-Origin", origin);
            response.Headers.Add("Vary", "Origin");
            response.Headers.Add("Access-Control-Allow-Methods", "POST, OPTIONS");
            response.Headers.Add("Access-Control-Allow-Headers", "Content-Type");
        }

        return response;
    }

    private static string? GetOrigin(HttpRequestData request)
    {
        return request.Headers.TryGetValues("Origin", out var values) ? values.FirstOrDefault() : null;
    }
}
