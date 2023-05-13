using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionAppBookToDb
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public string Author { get; set; } = null!;
        public string Publisher { get; set; } = null!;
        public decimal Price { get; set; } 
        public DateTime PublishDate { get; set; }
        public string BookLink { get; set; } = null!;
    }
}
