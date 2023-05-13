using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CG_BookStoreApi.Models
{
    public partial class Book
    {
        public Book()
        {
            Carts = new HashSet<Cart>();
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Publisher { get; set; } = null!;
        public decimal Price { get; set; } 
        public DateTime PublishDate { get; set; }
        public string BookLink { get; set; } = null!;
        [JsonIgnore]

        public virtual ICollection<Cart> Carts { get; set; }
        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
