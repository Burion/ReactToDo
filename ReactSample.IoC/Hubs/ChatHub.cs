using System.Threading.Tasks;
using ReactSample.Hubs.Clients;
using ReactSample.Models;
using Microsoft.AspNetCore.SignalR;

namespace ReactSample.Hubs
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
