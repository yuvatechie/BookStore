using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CG_BookStoreApi.Models
{
    public partial class User
    {
        public User()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        [EmailAddress]
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Role { get; set; } = null!;
        [JsonIgnore]

        public virtual ICollection<Cart> Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
