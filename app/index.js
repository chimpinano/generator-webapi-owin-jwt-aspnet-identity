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

    this.prompt([{
      type: 'input',
      name: 'applicationName',
      message: 'What is the name of your application?',
      default: 'My Application',
      required: true
    }, {
        type: 'input',
        name: 'dbServerName',
        message: 'What is the name of your SQL Server instance (e.g. .\sqlexpress or .)',
        default: '.\sqlexpress',
        required: true
      }], function (props) {
        this.appData = props;
        this.appData.applicationName = this._s.slugify(this.appData.applicationName);
        this.appData.apiProjectGuid = guid.v4();
        this.appData.apiAssemblyGuid = guid.v4();

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
    this.appDirectory = this.destinationRoot() + '/' + this.appData.applicationName + '/';
    this.appStart = this.appDirectory + 'App_Start/';
    this.authenticationDirectory = this.appDirectory + 'Authentication/';
    this.emailTemplatesDirectory = this.authenticationDirectory + 'EmailTemplates/';
    this.autoMappingDirectory = this.appDirectory + 'AutoMapping/';
    this.controllersDirectory = this.appdirectory + 'Controllers/';
    this.exceptionsDirectory = this.appDirectory + 'Exceptions/';
    this.filtersDirectory = this.appDirectory + 'Filters/';
    this.migrationsDirectory = this.appDirectory + 'Migrations/';
    this.modelsDirectory = this.appDirectory + 'Models/';
    this.responseDirectory = this.modelsDirectory + 'Response/';
    this.requestDirectory = this.modelsDirectory + 'Request/';
    this.propertiesDirectory = this.appDirectory + 'Properties/';

    this.mkdirp(this.packagesDirectory);
    this.mkdirp(this.appDirectory);
    this.mkdirp(this.appStart);
    this.mkdirp(this.authenticationDirectory);
    this.mkdirp(this.emailTemplatesDirectory);
    this.mkdirp(this.autoMappingDirectory);
    this.mkdirp(this.controllersDirectory);
    this.mkdirp(this.exceptionsDirectory);
    this.mkdirp(this.filtersDirectory);
    this.mkdirp(this.migrationsDirectory);
    this.mkdirp(this.modelsDirectory);
    this.mkdirp(this.responseDirectory);
    this.mkdirp(this.requestDirectory);
    this.mkdirp(this.propertiesDirectory);
  },

  writing: {
    appStart: function () {
      this.fs.copyTpl(
        this.templatePath('api/App_Start/_webapiconfig.cs'),
        this.destinationPath(this.appStart + 'WebApiConfig.cs'), { applicationName: this.appData.applicationName }
        );
    },
    authentication: function () {
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationjwtformat.cs'),
        this.destinationPath(this.authenticationDirectory + 'ApplicationJwtFormat.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationuser.cs'),
        this.destinationPath(this.authenticationDirectory + 'ApplicationUser.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationcontext.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationContext.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationemailservice.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationEmailService.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationusermanager.cs'),
        this.destinationPath(this.authenticationDirectory + 'AuthenticationUserManager.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_oauthprovider.cs'),
        this.destinationPath(this.authenticationDirectory + 'OAuthProvider.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_confirmemailaddressemail.html'),
        this.destinationPath(this.emailTemplatesDirectory + 'ConfirmEmailAddressEmail.html'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_resetpasswordemail.html'),
        this.destinationPath(this.emailTemplatesDirectory + 'ResetPasswordEmail.html'), { applicationName: this.appData.applicationName }
        );
    },
    autoMapping: function () {
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_automappingextensions.cs'),
        this.destinationPath(this.autoMappingDirectory + 'AutoMappingExtensions.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_newuserprofile.cs'),
        this.destinationPath(this.autoMappingDirectory + 'NewUserProfile.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_userprofile.cs'),
        this.destinationPath(this.autoMappingDirectory + 'UserProfile.cs'), { applicationName: this.appData.applicationName }
        );
    },
    controllers: function () {
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_basecontroller.cs'),
        this.destinationPath(this.controllersDirectory + 'BaseController.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_userscontroller.cs'),
        this.destinationPath(this.controllersDirectory + 'UsersController.cs'), { applicationName: this.appData.applicationName }
        );
    },
    exceptions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiexception.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIException.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiglobalexceptionhandler.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIGlobalExceptionHandler.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiresponseexception.cs'),
        this.destinationPath(this.exceptionsDirectory + 'APIResponseException.cs'), { applicationName: this.appData.applicationName }
        );
    },
    extensions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Extensions/_exceptionextensions.cs'),
        this.destinationPath(this.extensionsDirectory + 'ExceptionExtensions.cs'), { applicationName: this.appData.applicationName }
        );
    },
    filters: function () {
      this.fs.copyTpl(
        this.templatePath('api/Filters/_apiexceptionfilterattribute.cs'),
        this.destinationPath(this.filtersDirectory + 'APIExceptionFilterAttribute.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Filters/_modelvalidationfilterattribute.cs'),
        this.destinationPath(this.filtersDirectory + 'ModelValidationFilterAttribute.cs'), { applicationName: this.appData.applicationName }
        );
    },
    migrations: function () {
      this.fs.copyTpl(
        this.templatePath('api/Migrations/_configuration.cs'),
        this.destinationPath(this.migrationsDirectory + 'Configuration.cs'), { applicationName: this.appData.applicationName }
        );
    },
    models: function () {
      this.fs.copyTpl(
        this.templatePath('api/Models/_newusermodel.cs'),
        this.destinationPath(this.modelsDirectory + 'NewUserModel.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/_usermodel.cs'),
        this.destinationPath(this.modelsDirectory + 'UserModel.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_confirmemailaddressrequest.cs'),
        this.destinationPath(this.requestDirectory + 'ConfirmEmailAddressRequest.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_createuserrequest.cs'),
        this.destinationPath(this.requestDirectory + 'CreateUserRequest.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_resetpasswordrequest.cs'),
        this.destinationPath(this.requestDirectory + 'ResetPasswordRequest.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_sendpasswordresetrequest.cs'),
        this.destinationPath(this.requestDirectory + 'SendPasswordResetRequest.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_userrequest.cs'),
        this.destinationPath(this.requestDirectory + 'UserRequest.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_defaultresponse.cs'),
        this.destinationPath(this.responseDirectory + 'DefaultResponse.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_userresponse.cs'),
        this.destinationPath(this.responseDirectory + 'UserResponse.cs'), { applicationName: this.appData.applicationName }
        );
    },
    properties: function () {
      this.fs.copyTpl(
        this.templatePath('api/Properties/_assemblyinfo.cs'),
        this.destinationPath(this.propertiesDirectory + 'AssemblyInfo.cs'),
        {
          applicationName: this.appData.applicationName,
          apiAssemblyGuid: this.appData.apiAssemblyGuid
        }
        );
    },
    rootFiles: function () {
      this.fs.copyTpl(
        this.templatePath('api/_packages.config'),
        this.destinationPath(this.appDirectory + 'Packages.config')
        );
      this.fs.copyTpl(
        this.templatePath('api/_startup.cs'),
        this.destinationPath(this.appDirectory + 'Startup.cs'), { applicationName: this.appData.applicationName }
        );
      this.fs.copyTpl(
        this.templatePath('api/_web.config'),
        this.destinationPath(this.appDirectory + 'Web.config'),
        {
          applicationName: this.appData.applicationName,
          dbServerName: this.appData.dbServerName
        }
        );
      this.fs.copyTpl(
        this.templatePath('api/_web.debug.config'),
        this.destinationPath(this.appDirectory + 'Web.Debug.config')
        );
      this.fs.copyTpl(
        this.templatePath('api/_web.release.config'),
        this.destinationPath(this.appDirectory + 'Web.Release.config')
        );
    },
    solution: function () {
      this.fs.copyTpl(
        this.templatePath('api/_app.sln'),
        this.destinationPath(this.appData.applicationName + '.sln'),
        {
          applicationName: this.appData.applicationName,
          apiProjectGuid: this.appData.apiProjectGuid
        }
        );
      this.fs.copyTpl(
        this.templatePath('packages/_repositories.config'),
        this.destinationPath(this.packagesDirectory + 'repositories.config'), { applicationName: this.appData.applicationName }
        );
    }
  }
});
