namespace CG_BookStoreApi.Dtos
{
    public class LoginDto
    {
        public int Id { get; set; }
        public string Email { get; set; } /*= null!;*/
        public string Name { get; set; }
        public string Role { get; set; } /*= null!;*/
        public string Token { get; set; }
    }
}
