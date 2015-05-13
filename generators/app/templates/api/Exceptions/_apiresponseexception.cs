using System;

namespace <%= applicationName %>.API.Exceptions
{
    public class APIResponseException : Exception
    {
        public APIResponseException(string message)
            : base(message)
        {
        }

        public APIResponseException(string message, Exception innerException)
            : base(message, innerException)
        {
        }
    }
}