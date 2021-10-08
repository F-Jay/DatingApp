using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Photos")] // Added to ensure when Entity Framework creates the tble - Its called Photo's
    public class Photo
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public bool IsMain { get; set; }

        public string PublicId { get; set; }

        // Fully Define Entiry
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}