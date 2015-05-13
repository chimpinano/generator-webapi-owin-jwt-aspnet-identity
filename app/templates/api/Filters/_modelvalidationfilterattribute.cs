using <%= applicationName %>.API.Exceptions;
using <%= applicationName %>.API.Models.Response;
using Autofac.Integration.WebApi;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace <%= applicationName %>.API.Filters
{
    public class ModelValidationFilterAttribute : ActionFilterAttribute, IAutofacActionFilter
    {
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            var errors = new List<string>();
            if (!actionContext.ModelState.IsValid)
            {
                errors = actionContext.ModelState
                    .Select(s => s.Value)
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                actionContext.Response = actionContext.Request.CreateResponse<DefaultResponseModel>(HttpStatusCode.OK,
                    new APIException("").BuildFailedResponseWithMessages(errors));
            }

            base.OnActionExecuting(actionContext);
        }
    }
}