using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CG_BookStoreApi.Models;
using CG_BookStoreApi.Dtos;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace CG_BookStoreApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CG_BookStoreDbContext _context;
        private readonly IConfiguration config;

        public UsersController(CG_BookStoreDbContext context, IConfiguration config)
        {
            _context = context;
            this.config = config;
        }

        // GET: api/Users
        [HttpGet]
       // [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
       // [Authorize]
        public async Task<ActionResult<User>> GetUser(int id)
        {
          if (_context.Users == null)
          {
              return NotFound();
          }
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        //[Authorize]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            //Server validation part
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (_context.Users == null)
          {
              return Problem("Entity set 'CG_BookStoreDbContext.Users'  is null.");
          }
            var u = await _context.Users.FirstOrDefaultAsync(u =>
               u.Email == user.Email && u.Password == user.Password);
            if (u != null)
            {
                //existing User
                return Conflict(new
                {
                    Message = "User already exists"
                });
            }

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }
        //Post: api/Auth/login
        [HttpPost("login")]
        
        public async Task<ActionResult<User>> Login(User usersinfo)
        {
            if (ModelState.IsValid)
            {
                //user exists?
                var existingurUser = _context.Users.FirstOrDefault(
                u => u.Email == usersinfo.Email && u.Password == usersinfo.Password);

                //not correct => 404 not found
                if (existingurUser == null)
                {
                    return NotFound();
                }
                //correct => Ok(loginDto)
                LoginDto loginDto = new LoginDto
                {
                    Id=existingurUser.Id,
                    Email= existingurUser.Email,
                    Name = existingurUser.Name,
                    Role = existingurUser.Role,
                    Token = GenerateJwtToken(existingurUser)
                };
                return Ok(loginDto);
            }
            return BadRequest(ModelState);
        }

        private string GenerateJwtToken(User existingUser)
        {
            var secret = config["Secret"];
            var expiryDays = config.GetValue<int>("ExpiryDays");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = config["Issuer"],
                Audience = config["Audience"],
                Subject = new ClaimsIdentity(new[]
            {
                new Claim (JwtRegisteredClaimNames.Jti, existingUser.Id.ToString()),
                new Claim("role", existingUser.Role.ToString())
            }),
                Expires = DateTime.UtcNow.AddDays(expiryDays),
                SigningCredentials = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.ASCII.GetBytes(secret)),
            SecurityAlgorithms.HmacSha256Signature)
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_context.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
