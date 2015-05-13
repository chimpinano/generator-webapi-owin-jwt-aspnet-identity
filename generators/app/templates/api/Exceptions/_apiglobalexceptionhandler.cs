using NLog;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace <%= applicationName %>.API.Exceptions
{
    public class APIGlobalExceptionHandler : ExceptionHandler
    {
        private static readonly Logger _logger = LogManager.GetLogger("defaultLogger");

        public override void Handle(ExceptionHandlerContext context)
        {
            context.Result = new TextPlainErrorResult
            {
                Request = context.ExceptionContext.Request,
                Content = ConfigurationManager.AppSettings["defaultErrorMessage"]
            };

            _logger.Log(LogLevel.Error, context.Exception.Message, context.Exception);
        }

        private class TextPlainErrorResult : IHttpActionResult
        {
            public string Content { get; set; }

            public HttpRequestMessage Request { get; set; }

            public Task<HttpResponseMessage> ExecuteAsync(CancellationToken cancellationToken)
            {
                HttpResponseMessage response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.Content = new StringContent(Content);
                response.RequestMessage = Request;
                return Task.FromResult(response);
            }
        }
    }
}