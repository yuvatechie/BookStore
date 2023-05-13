using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CG_BookStoreApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace CG_BookStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly CG_BookStoreDbContext _context;

        public OrdersController(CG_BookStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Orders
        [HttpGet]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }

           
                //var orders =await _context.Orders
                //    .Include(o => o.Book)
                //    .Include(o => o.Cart)
                //        .Include(c => c.User)
                    
                //    .ToList();

               



            var orders = await _context.Orders
                                        .Include(o => o.User)
                                        .Include(o => o.Book)
                                        .Include(o => o.Cart)
                                            .ThenInclude(c => c.Book)

                                        .ToListAsync();
            // return orders;



            return await _context.Orders.ToListAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        //[Authorize]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        //changes

        [HttpGet("ordersByUsersId")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserid(int userId)
        {

            var Order = await _context.Orders.Where(x => x.UserId == userId).Include(x => x.User)

                  .ToListAsync();
            var orders = await _context.Orders
                         .Include(c => c.Book)
                         // .Include(c => c.User)
                         .ToListAsync();
            return Order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        //[Authorize]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Orders == null)
          {
              return Problem("Entity set 'CG_BookStoreDbContext.Orders'  is null.");
          }
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return (_context.Orders?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
