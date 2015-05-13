namespace <%= applicationName %>.API.Models.Request
{
    public class ConfirmEmailAddressRequest
    {
        public string UserId { get; set; }

        public string Token { get; set; }
    }
}