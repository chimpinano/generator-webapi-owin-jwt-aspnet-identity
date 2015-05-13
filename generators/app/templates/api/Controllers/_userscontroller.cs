using <%= applicationName %>.API.Authentication;
using <%= applicationName %>.API.Exceptions;
using <%= applicationName %>.API.Models;
using <%= applicationName %>.API.Models.Request;
using <%= applicationName %>.API.Models.Response;
using AutoMapper;
using System;
using System.IO;
using System.Reflection;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace <%= applicationName %>.API.Controllers
{
    [RoutePrefix("api/users")]
    public class UsersController : BaseController
    {
        private readonly IMappingEngine _mapper;

        public UsersController(IMappingEngine mapper)
        {
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("")]
        public async Task<UserResponse> CreateUser(CreateUserRequest request)
        {
            var response = new UserResponse
            {
                Message = "You will receive an email to confirm your email address.  You must confirm your email address before you can login.",
                Success = true
            };
            try
            {
                var user = _mapper.Map<User>(request.User);

                var userResult = await UserManager.CreateAsync(user, request.User.Password);
                if (!userResult.Succeeded)
                    throw new APIResponseException(string.Join(" | ", userResult.Errors));

                var token = await UserManager.GenerateEmailConfirmationTokenAsync(user.Id);
                var template = GetTemplateFromAssemblyOfType<UsersController>("<%= applicationName %>.API.Authentication.EmailTemplates.ConfirmEmailAddressEmail.html");
                var confirmEmailLink = string.Format("http://localhost:50309/confirmemailaddress?userId={0}&code={1}", user.Id, HttpUtility.UrlEncode(token));
                var emailBody = string.Format(template, confirmEmailLink);

                await UserManager.SendEmailAsync(user.Id, "Please Confirm Your Email Address", emailBody);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<UserResponse>(response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("confirmemailaddress")]
        public async Task<DefaultResponse> ConfirmEmailAddress(ConfirmEmailAddressRequest request)
        {
            var response = new DefaultResponse { Success = true, Message = "Your email address was confirmed!  Go log in!" };
            try
            {
                var result = await UserManager.ConfirmEmailAsync(request.UserId, HttpUtility.UrlDecode(request.Token));

                if (!result.Succeeded)
                    throw new APIResponseException(string.Join(" | ", result.Errors));
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<DefaultResponse>(response);
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("{id}")]
        public async Task<UserResponse> GetUser(string id)
        {
            var response = new UserResponse { Success = true };

            var user = await UserManager.FindByIdAsync(id);
            response.User = _mapper.Map<UserModel>(user);

            return await Task.FromResult<UserResponse>(response);
        }

        [AllowAnonymous]
        [HttpPut]
        [Route("{id}")]
        public async Task<UserResponse> UpdateMember(UserRequest request, string id)
        {
            var response = new UserResponse { Success = true };
            try
            {
                var user = await UserManager.FindByIdAsync(id);

                var updateUser = _mapper.Map(request.User, user);

                var result = await UserManager.UpdateAsync(updateUser);
                if (!result.Succeeded)
                    throw new APIResponseException(string.Join(" | ", result.Errors));

                response.User = _mapper.Map<UserModel>(updateUser);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<UserResponse>(response);
        }

        [AllowAnonymous]
        [HttpDelete]
        [Route("{id}")]
        public async Task<DefaultResponse> DeleteMember(string id)
        {
            var response = new DefaultResponse { Success = true };
            try
            {
                var user = await UserManager.FindByIdAsync(id);
                var deleteResult = await UserManager.DeleteAsync(user);

                if (!deleteResult.Succeeded)
                    throw new APIResponseException(string.Join(" | ", deleteResult.Errors));
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<DefaultResponse>(response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("sendresetpassword")]
        public async Task<DefaultResponse> SendResetPassword(SendPasswordResetRequest request)
        {
            var response = new DefaultResponse { Success = true };
            try
            {
                var user = await UserManager.FindByNameAsync(request.EmailAddress);

                var token = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                var template = GetTemplateFromAssemblyOfType<UsersController>("<%= applicationName %>.API.Authentication.EmailTemplates.ResetPasswordEmail.html");
                var tokenLink = string.Format("http://localhost:50309/resetpassword?userId={0}&code={1}", user.Id, HttpUtility.UrlEncode(token));
                var emailBody = string.Format(template, tokenLink);

                await UserManager.SendEmailAsync(user.Id, "Password Reset Request", emailBody);

                response.Message = "We sent you an email with a link to reset your password.";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<DefaultResponse>(response);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("resetpassword")]
        public async Task<DefaultResponse> ResetPassword(ResetPasswordRequest request)
        {
            var response = new DefaultResponse { Success = true, Message = "Your password was reset. Go log in!" };
            try
            {
                var result = await UserManager.ResetPasswordAsync(request.UserId, HttpUtility.UrlDecode(request.Token), request.Password);
                if (!result.Succeeded)
                    throw new APIResponseException(string.Join(" ", result.Errors));
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

            return await Task.FromResult<DefaultResponse>(response);
        }

        private string GetTemplateFromAssemblyOfType<T>(string resourceName)
        {
            var assembly = Assembly.GetAssembly(typeof(T));
            var fileString = string.Empty;

            using (var stream = assembly.GetManifestResourceStream(resourceName))
            {
                using (StreamReader reader = new StreamReader(stream))
                {
                    fileString = reader.ReadToEnd();
                }
            }

            return fileString;
        }
    }
}