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
            return user.FindFirst(ClaimTypes.Name)?.Value; //  ClaimTypes.Name - Represents the UniqueName property that we set in our token
        }

        public static int GetUserId(this ClaimsPrincipal user) // Claims - Get GetUserId from token that API uses to Authenticate user.
        {
            return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)?.Value); //  ClaimTypes.NameIdentifier - Represents the NameId property that we set in our token
        }
    }
}