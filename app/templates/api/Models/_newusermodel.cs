namespace <%= applicationName %>.API.Models
{
    public class NewUserModel : UserModel
    {
        public string Password { get; set; }
    }
}