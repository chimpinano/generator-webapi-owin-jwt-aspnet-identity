namespace <%= applicationName %>.API.Models.Request
{
    public class ResetPasswordRequest
    {
        public string UserId { get; set; }

        public string Token { get; set; }

        public string Password { get; set; }
    }
}