using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using System.Threading.Tasks;

namespace <%= applicationName %>.API.Authentication
{
    public class OAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = "*";

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });

            var userManager = context.OwinContext.GetUserManager<AuthenticationUserManager>();
            var user = await userManager.FindAsync(context.UserName, context.Password);

            if (user == null)
            {
                context.SetError("OOPS!", "Your user name or password is incorrect.");
                return;
            }

            var oAuthIdentity = await user.GenerateUserIdentityAsync(userManager, "JWT");
            var ticket = new AuthenticationTicket(oAuthIdentity, null);

            context.Validated(ticket);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }
    }
}