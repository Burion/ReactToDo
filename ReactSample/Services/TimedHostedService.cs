using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using ReactSample.Hubs;
using ReactSample.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ReactSample.Services
{
    public class TimedHostedService : IHostedService, IDisposable
    {
        private int executionCount = 0;
        private readonly ILogger<TimedHostedService> _logger;
        private Timer _timer;
        private IHubContext<ChatHub> _hub;

        public TimedHostedService(ILogger<TimedHostedService> logger, IHubContext<ChatHub> hub)
        {
            _logger = logger;
            _hub = hub;
        }

        public Task StartAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service running.");

            _timer = new Timer(DoWork, null, TimeSpan.FromSeconds(30),
                TimeSpan.FromSeconds(10));
            Console.WriteLine("The service is working.");
            return Task.CompletedTask;
        }

        private void DoWork(object state)
        {
            var count = Interlocked.Increment(ref executionCount);

            _logger.LogInformation(
                "Timed Hosted Service is working. Count: {Count}", count);
            Console.WriteLine("The service has gone through the iteration.");
            ChatMessage message = new ChatMessage() { User = "Billy Herrington", Message = "Ass we can!" };
            ChatHub chatHub = new ChatHub();
            _hub.Clients.All.SendAsync("ReceiveMessage", message);
            //chatHub.SendMessage(message);
        }

        public Task StopAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Timed Hosted Service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
