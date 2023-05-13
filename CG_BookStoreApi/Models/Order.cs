using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace CG_BookStoreApi.Models
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? BookId { get; set; }
        public int? CartId { get; set; }
        public bool? PaymentStatus { get; set; }
        public decimal TotalPrice { get; set; }
        public DateTime OrderDate { get; set; }
      // [JsonIgnore]

        public virtual Book? Book { get; set; }
       [JsonIgnore]
        public virtual Cart? Cart { get; set; }
       // [JsonIgnore]
        public virtual User? User { get; set; }
    }
}
