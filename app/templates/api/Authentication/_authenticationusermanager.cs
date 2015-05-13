using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using System;

namespace <%= applicationName %>.API.Authentication
{
    public class AuthenticationUserManager : UserManager<User>
    {
        public AuthenticationUserManager(IUserStore<User> store)
            : base(store)
        {
        }

        public static AuthenticationUserManager Create(IdentityFactoryOptions<AuthenticationUserManager> options, IOwinContext context, AuthenticationEmailService emailService)
        {
            var appDbContext = context.Get<AuthenticationContext>();
            var appUserManager = new AuthenticationUserManager(new UserStore<User>(appDbContext));

            appUserManager.EmailService = emailService;

            var dataProtectionProvider = options.DataProtectionProvider;
            if (dataProtectionProvider != null)
            {
                appUserManager.UserTokenProvider = new DataProtectorTokenProvider<User>(dataProtectionProvider.Create("ASP.NET Identity"))
                {
                    TokenLifespan = TimeSpan.FromHours(24)
                };
            }

            appUserManager.UserValidator = new UserValidator<User>(appUserManager)
            {
                AllowOnlyAlphanumericUserNames = true,
                RequireUniqueEmail = true
            };

            appUserManager.PasswordValidator = new PasswordValidator
            {
                RequiredLength = 8,
                RequireNonLetterOrDigit = false,
                RequireDigit = false,
                RequireLowercase = false,
                RequireUppercase = false,
            };

            return appUserManager;
        }
    }
}