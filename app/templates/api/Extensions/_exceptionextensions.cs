using <%= applicationName %>.API.Exceptions;
using <%= applicationName %>.API.Models.Response;
using System;
using System.Collections.Generic;

namespace <%= applicationName %>.API
{
    public static class ExceptionExtensions
    {
        public static DefaultResponse BuildErrorResponseWithMessage(this Exception exception)
        {
            var errorResponse = new DefaultResponse
            {
                Success = false,
                Message = exception.Message
            };

            if (exception.InnerException != null)
            {
                errorResponse.Message += exception.InnerException.Message;
            }

            return errorResponse;
        }

        public static DefaultResponse BuildFailedResponseWithMessages(this APIException exception, IList<string> modelErrors)
        {
            if (!string.IsNullOrWhiteSpace(exception.Message))
            {
                modelErrors.Insert(0, exception.Message);
            }

            return new DefaultResponse
            {
                Success = false,
                Message = string.Join(" ", modelErrors)
            };
        }
    }
}