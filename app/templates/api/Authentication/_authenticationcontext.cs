using Microsoft.AspNet.Identity.EntityFramework;

namespace <%= applicationName %>.API.Authentication
{
    public class AuthenticationContext : IdentityDbContext<User>
    {
        public AuthenticationContext()
            : base("<%= applicationName %>Membership", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public static AuthenticationContext Create()
        {
            return new AuthenticationContext();
        }
    }
}