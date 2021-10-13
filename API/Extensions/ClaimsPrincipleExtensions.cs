using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUserName(this ClaimsPrincipal user) // Claims - Get Username from token that API uses to Authenticate user.
        {
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}