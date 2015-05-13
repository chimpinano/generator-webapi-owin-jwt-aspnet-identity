'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var guid = require('uuid');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super ' + chalk.red('Web API Microsoft.Owin JWT ASP.NET Identity application') + ' generator!'
      ));

    var prompts = [{
      type: 'input',
      name: 'applicationName',
      message: 'What is the name of your application?',
      default: true,
      required: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.apiProjectGuid = guid.v4();
      this.props.apiAssemblyGuid = guid.v4();
      done();
    }.bind(this));

    this.on('end', function () {
      this.log(yosay(
        'All done!' + chalk.red('There are a few things you still need to do....') +
        '\n 1. Open the solution.' +
        '\n 2. Right click on the solution file' + 
        '\n 3. Manage NuGet Packages' +
        '\n 4. Click on the restore button on the right of the yellow bar.' + 
        '\n    This will pull down all of your dependencies from NuGet.' +
        '\n 5. Build the solution.' + 
        '\n 6. Open the Package Manager Console, type in \"update-database\".' +
        '\n 7. You are now ready to use your API!  ENJOY!'
        ));
    });
  },

  createDirectories: function () {
    this.packagesDirectory = this.destinationRoot() + '/packages/';
    this.appDirectory = this.destinationRoot() + '/' + this.props.applicationName + '/';
    this.appStart = 'App_Start/';
    this.authenticationDirectory = this.appDirectory + 'Authentication/';
    this.emailTemplatesDirectory = this.authenticationDirectory + 'EmailTemplates/';
    this.autoMappingDirectory = this.appDirectory + 'AutoMapping/';
    this.controllersDirectory = this.appdirectory + 'Controllers/';
    this.exceptionsDirectory = this.appDirectory + 'Exceptions/';
    this.filtersDirectory = this.appDirectory + 'Filters/';
    this.migrationsDirectory = this.appDirectory + 'Migrations/';
    this.modelsDirector = this.appDirectory + 'Models/';
    this.responseDirectory = this.modelsDirectory + 'Response/';
    this.requestDirectory = this.modelsDirectory + 'Request/';
    this.propertiesDirectory = this.appDirectory + 'Properties/';

    this.mkdir(this.destinationRoot() + '/packages');
    this.mkdir(this.appStart);
    this.mkdir(this.authenticationDirectory);
    this.mkdir(this.emailTemplatesDirectory);
    this.mkdir(this.autoMappingDirectory);
    this.mkdir(this.controllersDirectory);
    this.mkdir(this.exceptionsDirectory);
    this.mkdir(this.filtersDirectory);
    this.mkdir(this.migrationsDirectory);
    this.mkdir(this.modelsDirectory);
    this.mkdir(this.responseDirectory);
    this.mkdir(this.requestDirectory);
    this.mkdir(this.propertiesDirectory);
  },

  writing: {
    appStart: function () {
      this.fs.copyTpl(
        this.templatePath('api/AppStart/_webapiconfig.cs'),
        this.destinationPath(this.appStart + 'WebApiConfig.cs', { applicationName: this.props.applicationName })
        );
    },
    authentication: function () {
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationjwtformat.cs'),
        this.destinationPath(this.authenticationDirectory + 'ApplicationJwtFormat.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationuser.cs'),
        this.destinationPath(this.authenticationDirectory + 'ApplicationUser.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationcontext.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationContext.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationemailservice.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationEmailService.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationusermanager.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationUserManager.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_oauthprovider.cs'),
        this.destinationPath(this.authenticationDirectory + 'OAuthProvider.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_confirmemailaddressemail.html'),
        this.destinationPath(this.emailTemplatesDirectory + 'ConfirmEmailAddressEmail.html', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_resetpasswordemail.html'),
        this.destinationPath(this.emailTemplatesDirectory + 'ResetPasswordEmail.html', { applicationName: this.props.applicationName })
        );
    },
    autoMapping: function () {
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_automappingextensions.cs'),
        this.destinationPath(this.autoMappingDirectory + 'AutoMappingExtensions.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_newuserprofile.cs'),
        this.destinationPath(this.autoMappingDirectory + 'NewUserProfile.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_userprofile.cs'),
        this.destinationPath(this.autoMappingDirectory + 'UserProfile.cs')
        );
    },
    controllers: function () {
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_basecontroller.cs'),
        this.destinationPath(this.controllersDirectory + 'BaseController.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_userscontroller.cs'),
        this.destinationPath(this.controllersDirectory + 'UsersController.cs', { applicationName: this.props.applicationName })
        );
    },
    exceptions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiexception.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIException.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiglobalexceptionhandler.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIGlobalExceptionHandler.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiresponseexception.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIResponseException.cs', { applicationName: this.props.applicationName })
        );
    },
    extensions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Extensions/_exceptionExtensions.cs'),
        this.destinationPath(this.extensionsDirectory + 'ExceptionExtensions.cs', { applicationName: this.props.applicationName })
        );
    },
    filters: function () {
      this.fs.copyTpl(
        this.templatePath('api/Filters/_apiexceptionfilterattribute.cs'),
        this.destinationPath(this.filtersDirectory + 'APIExceptionFilterAttribute.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Filters/_modelvalidationfilterattribute.cs'),
        this.destinationPath(this.filtersDirectory + 'ModelValidationFilterAttribute.cs', { applicationName: this.props.applicationName })
        );
    },
    migrations: function () {
      this.fs.copyTpl(
        this.templatePath('api/Migrations/_configuration.cs'),
        this.destinationPath(this.migrationsDirectory + 'Configuration.cs', { applicationName: this.props.applicationName })
        );
    },
    models: function () {
      this.fs.copyTpl(
        this.templatePath('api/Models/_newusermodel.cs'),
        this.destinationPath(this.modelsDirectory + 'NewUserModel.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/_usermodel.cs'),
        this.destinationPath(this.modelsDirectory + 'UserModel.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_confirmemailaddressrequest.cs', { applicationName: this.props.applicationName }),
        this.destinationPath(this.requestDirectory + 'ConfirmEmailAddressRequest.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_createuserrequest.cs'),
        this.destinationPath(this.requestDirectory + 'CreateUserRequest.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_resetpasswordrequest.cs'),
        this.destinationPath(this.requestDirectory + 'ResetPasswordRequest.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_sendpasswordresetrequest.cs'),
        this.destinationPath(this.requestDirectory + 'SendPasswordResetRequest.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_userrequest.cs'),
        this.destinationPath(this.requestDirectory + 'UserRequest.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_defaultresponse.cs'),
        this.destinationPath(this.responseDirectory + 'DefaultResponse.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_userresponse.cs'),
        this.destinationPath(this.responseDirectory + 'UserResponse.cs', { applicationName: this.props.applicationName })
        );
    },
    properties: function () {
      this.fs.copyTpl(
        this.templatePath('api/Properties/_assemblyinfo.cs'),
        this.destinationPath(this.propertiesDirectory + 'AssemblyInfo.cs',
          {
            applicationName: this.props.applicationName,
            apiProjectGuid: this.props.apiAssemblyGuid
          })
        );
    },
    rootFiles: function () {
      this.fs.copy(
        this.templatePath('api/_packages.config'),
        this.destinationPath(this.appDirectory + 'Packages.config')
        );
      this.fs.copyTpl(
        this.templatePath('api/_startup.cs'),
        this.destinationPath(this.appDirectory + 'Startup.cs', { applicationName: this.props.applicationName })
        );
      this.fs.copyTpl(
        this.templatePath('api/_web.config'),
        this.destinationPath(this.appDirectory + 'Web.config', { applicationName: this.props.applicationName })
        );
      this.fs.copy(
        this.templatePath('api/_web.debug.config'),
        this.destinationPath(this.appDirectory + 'Web.Debug.config')
        );
      this.fs.copy(
        this.templatePath('api/_web.release.config'),
        this.destinationPath(this.appDirectory + 'Web.Release.config')
        );
    },
    solution: function () {
      this.fs.copyTpl(
        this.templatePath('api/_app.sln'),
        this.destinationPath(this.props.applicationName + '.sln',
          {
            applicationName: this.props.applicationName,
            apiProjectGuid: this.props.apiProjectGuid
          })
        );
      this.fs.copyTpl(
        this.templatePath('packages/_repositories.config'),
        this.destinationPath(this.packagesDirectory + 'repositories.config', { applicationName: this.props.applicationName })
        );
    }

  }
});
