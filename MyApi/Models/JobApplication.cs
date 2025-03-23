using System.ComponentModel.DataAnnotations;

namespace MyApi.Models
{
    public class JobApplication
    {
        [Key]
        public int Id { get; set; }
        public string Company { get; set; }
        public string Position { get; set; }
        public string Status { get; set; }
        public DateTime ApplicationDate { get; set; }
        
    }
}