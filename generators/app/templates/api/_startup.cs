using <%= applicationName %>.API.Authentication;
using <%= applicationName %>.API.AutoMapping;
using <%= applicationName %>.API.Controllers;
using <%= applicationName %>.API.Exceptions;
using <%= applicationName %>.API.Filters;
using Autofac;
using Autofac.Integration.WebApi;
using AutoMapper;
using AutoMapper.Mappers;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Microsoft.Owin.Security.Jwt;
using Microsoft.Owin.Security.OAuth;
using Owin;
using System;
using System.Configuration;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;

[assembly: OwinStartup(typeof(<%= applicationName %>.API.Startup))]

namespace <%= applicationName %>.API
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();

            var builder = new ContainerBuilder();

            builder.RegisterType<TypeMapFactory>().As<ITypeMapFactory>();
            builder.RegisterType<ConfigurationStore>()
                .As<ConfigurationStore>()
                .OnActivated(c =>
                {
                    c.Instance.LoadProfiles();
                })
                .WithParameter("mappers", MapperRegistry.Mappers)
                .As<IConfiguration>()
                .As<IConfigurationProvider>()
                .SingleInstance();

            builder.RegisterType<MappingEngine>()
                .As<IMappingEngine>();

            builder.RegisterApiControllers(typeof(BaseController).Assembly)
                .InstancePerRequest();

            builder.RegisterWebApiFilterProvider(config);
            builder.RegisterType<APIExceptionFilterAttribute>()
                .AsWebApiExceptionFilterFor<BaseController>()
                .InstancePerRequest()
                .PropertiesAutowired();

            builder.RegisterType<ModelValidationFilterAttribute>()
                .AsWebApiActionFilterFor<BaseController>()
                .InstancePerRequest();

            var container = builder.Build();

            WebApiConfig.Register(config);

            config.Services.Replace(typeof(IExceptionHandler),
                new APIGlobalExceptionHandler());

            var resolver = new AutofacWebApiDependencyResolver(container);
            config.DependencyResolver = resolver;

            //middleware setup
            ConfigureOAuthTokenGeneration(app);
            ConfigureOAuthTokenConsumption(app);

            app.UseAutofacMiddleware(container);
            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(config);
        }

        private void ConfigureOAuthTokenConsumption(IAppBuilder app)
        {
            var issuer = "http://localhost:50306/";
            var audienceId = ConfigurationManager.AppSettings["audienceId"];
            var audienceSecret = TextEncodings.Base64Url.Decode(ConfigurationManager.AppSettings["audienceSecret"]);

            // Api controllers with an [Authorize] attribute will be validated with JWT 
            app.UseJwtBearerAuthentication(
                new JwtBearerAuthenticationOptions
                {
                    AuthenticationMode = AuthenticationMode.Active,
                    AllowedAudiences = new[] { audienceId },
                    IssuerSecurityTokenProviders = new IIssuerSecurityTokenProvider[]
                    {
                        new SymmetricKeyIssuerSecurityTokenProvider(issuer, audienceSecret)
                    }
                });
        }

        private void ConfigureOAuthTokenGeneration(IAppBuilder app)
        {
            app.CreatePerOwinContext(AuthenticationContext.Create);
            app.CreatePerOwinContext<AuthenticationUserManager>((o, c) => AuthenticationUserManager.Create(o, c, new AuthenticationEmailService()));

            var OAuthServerOptions = new OAuthAuthorizationServerOptions()
            {
                //For Dev enviroment only (on production should be AllowInsecureHttp = false)
                AllowInsecureHttp = true,
                TokenEndpointPath = new PathString("/api/oauth/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
                Provider = new OAuthProvider(),
                AccessTokenFormat = new ApplicationJwtFormat("http://localhost:50306")
            };

            // OAuth 2.0 Bearer Access Token Generation 
            app.UseOAuthAuthorizationServer(OAuthServerOptions);
        }
    }
}