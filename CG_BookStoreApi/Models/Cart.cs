
//using Newtonsoft.Json;
//using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace CG_BookStoreApi.Models
{
    public partial class Cart
    {
        public Cart()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public int? BookId { get; set; }
        public int? UserId { get; set; }
        public int Quantity { get; set; }
        public decimal BookPrice { get; set; }

       //[JsonIgnore]
        public virtual Book? Book { get; set; }


        // [JsonIgnore]
        //[ForeignKey("UserId")]

        public virtual User? User { get; set; }
        //[ForeignKey("UserId")]
       // [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }
    }
}
