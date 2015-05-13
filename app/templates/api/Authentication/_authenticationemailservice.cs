using Microsoft.AspNet.Identity;
using NLog;
using System.Configuration;
using System.Net.Mail;
using System.Threading.Tasks;

namespace <%= applicationName %>.API.Authentication
{
    public class AuthenticationEmailService : IIdentityMessageService
    {
        private static readonly Logger _logger = LogManager.GetLogger("defaultLogger");

        public async Task SendAsync(IdentityMessage message)
        {
            using (var smtpClient = new SmtpClient(ConfigurationManager.AppSettings["emailHost"]))
            {
                smtpClient.Credentials = new System.Net.NetworkCredential
                {
                    UserName = ConfigurationManager.AppSettings["emailUser"],
                    Password = ConfigurationManager.AppSettings["emailPassword"]
                };
                using (var mailMessage = new MailMessage(new MailAddress(ConfigurationManager.AppSettings["supportEmailAddress"], ConfigurationManager.AppSettings["supportEmailName"]),
                    new MailAddress(message.Destination, "")))
                {
                    mailMessage.Body = message.Body;
                    mailMessage.Subject = message.Subject;
                    mailMessage.IsBodyHtml = true;

                    await smtpClient.SendMailAsync(mailMessage);
                }
            }
        }
    }
}