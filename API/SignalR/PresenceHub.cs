using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker _tracker;
        public PresenceHub(PresenceTracker tracker)
        {
            _tracker = tracker;
        }

        public override async Task OnConnectedAsync() // Called when Clients Connects.
        {
            var isOnline = await _tracker.UserConnected(Context.User.GetUserName(), Context.ConnectionId); // Updated Presence Tracker
            if(isOnline)
            {
                await Clients.Others.SendAsync("UserIsOnline",Context.User.GetUserName());
            }
            

            var currentUsers = await _tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers); // Send Updated list of users to everyone who is connected.
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            var isOffline = await _tracker.UserDisconnected(Context.User.GetUserName(), Context.ConnectionId);
            if(isOffline){
                await Clients.Others.SendAsync("UserIsOffline",Context.User.GetUserName());
            }
            

            //var currentUsers = await _tracker.GetOnlineUsers();
            //await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers); // Send Updated list of users to everyone who is connected.
            
            await base.OnDisconnectedAsync(exception);

           
        }
    }
}