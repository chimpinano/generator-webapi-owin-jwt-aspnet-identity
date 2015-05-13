using <%= applicationName %>.API.Exceptions;
using <%= applicationName %>.API.Models.Response;
using Autofac.Integration.WebApi;
using NLog;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace <%= applicationName %>.API.Filters
{
    public class APIExceptionFilterAttribute : ExceptionFilterAttribute, IAutofacExceptionFilter
    {
        private static readonly Logger _logger = LogManager.GetLogger("defaultLogger");

        public override void OnException(HttpActionExecutedContext context)
        {
            if (context.Exception is APIException)
            {
                context.Response = context.Request.CreateResponse<DefaultResponseModel>(HttpStatusCode.OK,
                    (context.Exception as APIException).BuildFailedResponseWithMessages(new List<string>()));
            }
            else
            {
                var response = new Exception(ConfigurationManager.AppSettings["defaultErrorMessage"]).BuildErrorResponseWithMessage();
                context.Response = context.Request.CreateResponse<DefaultResponseModel>(HttpStatusCode.InternalServerError,
                    response);
            }

            _logger.Log(LogLevel.Error, context.Exception.Message, context.Exception);
        }
    }
}