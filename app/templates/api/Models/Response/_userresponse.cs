
namespace <%= applicationName %>.API.Models.Response
{
    public class UserResponse : DefaultResponse
    {
        public UserModel User { get; set; }
    }
}