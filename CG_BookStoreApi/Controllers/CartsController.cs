using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CG_BookStoreApi.Models;
using System.Security.Policy;
using Microsoft.AspNetCore.Cors;

namespace CG_BookStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : ControllerBase
    {
        private readonly CG_BookStoreDbContext _context;

        public CartsController(CG_BookStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            if (_context.Carts == null)
            {
                return NotFound();
            }
            var carts = await _context.Carts
                           .Include(c => c.Book)
                           .Include(c => c.User)
                           .ToListAsync();

            return await _context.Carts.ToListAsync();
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            if (_context.Carts == null)
            {
                return NotFound();
            }
            var cart = await _context.Carts.FindAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        //Changes 
        //[HttpGet("Users/{id}")]
        [HttpGet("cartsByUsersId")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCartsByUserid(int userId)
        {

            var Cart = await _context.Carts.Where(x => x.UserId == userId).Include(x => x.User)

                  .ToListAsync();
            var carts = await _context.Carts
                         .Include(c => c.Book)
                        // .Include(c => c.User)
                         .ToListAsync();
            return Cart;
        }
        // GET: api/Appointments/    -- By Patient Id
        //[HttpGet("appointmentsByPatientId")]
        //public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointmentsByPatientId(int patientId)
        //{
        //    // Retrieve the appointments using the patient ID.
        //    var appointments = await _context.Appointments.Where(a => a.PatientId == patientId).Include(a => a.Doctor).ToListAsync();



        //    return appointments;
        //}


        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Cart cart)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != cart.Id)
            {
                return BadRequest();
            }

            _context.Entry(cart).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Carts == null)
            {
                return Problem("Entity set 'CG_BookStoreDbContext.Carts'  is null.");
            }
            _context.Carts.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Id }, cart);
        }
        //changes inner join

        [HttpGet("carts-with-orders")]
        public IActionResult GetCartsWithOrders()
        {
            var query = from cart in _context.Carts
                        join book in _context.Books
                        on cart.BookId equals book.Id
                        select new { book.Name, book.Price};

            var result = query.ToList();

            return Ok(result);
        }
       

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> DeleteCart(int id)
        {
            if (_context.Carts == null)
            {
                return NotFound();
            }
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Carts.Remove(cart);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CartExists(int id)
        {
            return (_context.Carts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
