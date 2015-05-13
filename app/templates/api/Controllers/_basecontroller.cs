using <%= applicationName %>.API.Authentication;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Web.Http;

namespace <%= applicationName %>.API.Controllers
{
    public abstract class BaseController : ApiController
    {
        private readonly AuthenticationUserManager _userManager = null;

        public BaseController()
        {
        }

        protected AuthenticationUserManager UserManager
        {
            get { return _userManager ?? Request.GetOwinContext().GetUserManager<AuthenticationUserManager>(); }
        }

        protected string GetAuthenticationId()
        {
            return this.User.Identity.GetUserId();
        }
    }
}