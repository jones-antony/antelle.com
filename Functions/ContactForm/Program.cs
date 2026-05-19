using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWorkerDefaults()
    .ConfigureServices((_, services) =>
    {
        services.AddHttpClient();
        services.AddSingleton<ContactFormOptions>();
        services.AddSingleton<SpamAssessmentService>();
        services.AddSingleton<GraphMailSender>();
    })
    .Build();

host.Run();
