namespace <%= applicationName %>.API.Models.Request
{
    public class SendPasswordResetRequest
    {
        public string EmailAddress { get; set; }
    }
}