using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser: IdentityUser<int>
    {
        public DateTime DateOfBirth { get; set; } // Use extention methods to calculate age.

        public string KnownAs { get; set; }

        public DateTime Created { get; set; } = DateTime.Now;

        public DateTime LastActive { get; set; } = DateTime.Now;

        public string Gender { get; set; }

        public string Introduction { get; set; }

        public string LookingFor { get; set; }

        public string Interests { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public ICollection<Photo> Photos { get; set; } // One to Many Relationship -> One user can have many Photo's

        public ICollection<UserLike> LikedByUsers { get; set; } // List of Users who liked the logged in users.
        public ICollection<UserLike> LikedUsers { get; set; } // List of user the currently logged in user has liked.

        // Messaging System
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }

        public ICollection<AppUserRole> UserRoles { get; set; } // Acting as Join Table

    }
}