'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');
var guid = require('uuid');
var _s = require('underscore.string');

var Generator = module.exports = function Generator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
    this.pkg = require('../package.json');

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

  Generator.prototype.askForAppData = function () {
    var done = this.async();

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
        this.appData.solutionName = props.applicationName.replace(/\s+/g, '');
        this.appData.applicationName = props.applicationName.replace(/\s+/g, '') + '.API';
        this.appData.apiProjectGuid = guid.v4();
        this.appData.apiAssemblyGuid = guid.v4();
        done();
      }.bind(this));
  };

  Generator.prototype.appPaths = function () {
    this.packagesDirectory = path.join(this.destinationRoot(), 'packages');
    this.appDirectory = path.join(this.destinationRoot(), this.appData.applicationName);
    this.appStart = path.join(this.appDirectory, 'App_Start/');
    this.authenticationDirectory = path.join(this.appDirectory, 'Authentication');
    this.emailTemplatesDirectory = path.join(this.authenticationDirectory, 'EmailTemplates');
    this.autoMappingDirectory = path.join(this.appDirectory, 'AutoMapping');
    this.controllersDirectory = path.join(this.appDirectory, 'Controllers');
    this.exceptionsDirectory = path.join(this.appDirectory, 'Exceptions');
    this.extensionsDirectory = path.join(this.appDirectory, 'Extensions');
    this.filtersDirectory = path.join(this.appDirectory, 'Filters');
    this.migrationsDirectory = path.join(this.appDirectory, 'Migrations');
    this.modelsDirectory = path.join(this.appDirectory, 'Models');
    this.responseDirectory = path.join(this.modelsDirectory, 'Response');
    this.requestDirectory = path.join(this.modelsDirectory, 'Request');
    this.propertiesDirectory = path.join(this.appDirectory, 'Properties');
  };

  Generator.prototype.createDirectories = function () {
    mkdirp(this.packagesDirectory);
    mkdirp(this.appDirectory);
    mkdirp(this.appStart);
    mkdirp(this.authenticationDirectory);
    mkdirp(this.emailTemplatesDirectory);
    mkdirp(this.autoMappingDirectory);
    mkdirp(this.controllersDirectory);
    mkdirp(this.exceptionsDirectory);
    mkdirp(this.filtersDirectory);
    mkdirp(this.migrationsDirectory);
    mkdirp(this.modelsDirectory);
    mkdirp(this.responseDirectory);
    mkdirp(this.requestDirectory);
    mkdirp(this.propertiesDirectory);
  };

  Generator.prototype.createAppStartFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_webapiconfig.cs'),
      this.destinationPath(path.join(this.appStart, 'WebApiConfig.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createAuthenticationFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_applicationjwtformat.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'ApplicationJwtFormat.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_applicationuser.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'ApplicationUser.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationcontext.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'AuthenticationContext.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationemailservice.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'AuthenticationEmailService.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationusermanager.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'AuthenticationUserManager.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_oauthprovider.cs'),
      this.destinationPath(path.join(this.authenticationDirectory, 'OAuthProvider.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/EmailTemplates/_confirmemailaddressemail.html'),
      this.destinationPath(path.join(this.emailTemplatesDirectory, 'ConfirmEmailAddressEmail.html')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/EmailTemplates/_resetpasswordemail.html'),
      this.destinationPath(path.join(this.emailTemplatesDirectory, 'ResetPasswordEmail.html')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createAutoMappingFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_automappingextensions.cs'),
      this.destinationPath(path.join(this.autoMappingDirectory, 'AutoMappingExtensions.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_newuserprofile.cs'),
      this.destinationPath(path.join(this.autoMappingDirectory, 'NewUserProfile.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_userprofile.cs'),
      this.destinationPath(path.join(this.autoMappingDirectory, 'UserProfile.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createControllerFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Controllers/_basecontroller.cs'),
      this.destinationPath(path.join(this.controllersDirectory, 'BaseController.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Controllers/_userscontroller.cs'),
      this.destinationPath(path.join(this.controllersDirectory, 'UsersController.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createExceptionFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiexception.cs'),
      this.destinationPath(path.join(this.exceptionsDirectory, 'APIException.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiglobalexceptionhandler.cs'),
      this.destinationPath(path.join(this.exceptionsDirectory, 'APIGlobalExceptionHandler.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiresponseexception.cs'),
      this.destinationPath(path.join(this.exceptionsDirectory, 'APIResponseException.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createExtensionFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Extensions/_exceptionextensions.cs'),
      this.destinationPath(path.join(this.extensionsDirectory, 'ExceptionExtensions.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createFilterFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Filters/_apiexceptionfilterattribute.cs'),
      this.destinationPath(path.join(this.filtersDirectory, 'APIExceptionFilterAttribute.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Filters/_modelvalidationfilterattribute.cs'),
      this.destinationPath(path.join(this.filtersDirectory, 'ModelValidationFilterAttribute.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createMigrationFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Migrations/_configuration.cs'),
      this.destinationPath(path.join(this.migrationsDirectory, 'Configuration.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createModelFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Models/_newusermodel.cs'),
      this.destinationPath(path.join(this.modelsDirectory, 'NewUserModel.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/_usermodel.cs'),
      this.destinationPath(path.join(this.modelsDirectory, 'UserModel.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_confirmemailaddressrequest.cs'),
      this.destinationPath(path.join(this.requestDirectory, 'ConfirmEmailAddressRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_createuserrequest.cs'),
      this.destinationPath(path.join(this.requestDirectory, 'CreateUserRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_resetpasswordrequest.cs'),
      this.destinationPath(path.join(this.requestDirectory, 'ResetPasswordRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_sendpasswordresetrequest.cs'),
      this.destinationPath(path.join(this.requestDirectory, 'SendPasswordResetRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_userrequest.cs'),
      this.destinationPath(path.join(this.requestDirectory, 'UserRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Response/_defaultresponse.cs'),
      this.destinationPath(path.join(this.responseDirectory, 'DefaultResponse.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Response/_userresponse.cs'),
      this.destinationPath(path.join(this.responseDirectory, 'UserResponse.cs')), { applicationName: this.appData.applicationName }
      );
  };

  Generator.prototype.createPropertiesFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.propertiesDirectory, 'AssemblyInfo.cs')),
      {
        applicationName: this.appData.applicationName,
        apiAssemblyGuid: this.appData.apiAssemblyGuid
      }
      );
  };

  Generator.prototype.createRootFiles = function () {
    this.fs.copyTpl(
      this.templatePath('api/_packages.config'),
      this.destinationPath(path.join(this.appDirectory, 'Packages.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_startup.cs'),
      this.destinationPath(path.join(this.appDirectory, 'Startup.cs')), { applicationName: this.appData.applicationName }
      );
    this.loggingConfig = '<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    '<variable name="appTitle" value="', this.appData.applicationName, '" />',
    '<variable name="logFilePath" value="${basedir}/${appTitle}.log" />',
    '<targets async="true">',
    '<target name="file" xsi:type="File" fileName="${logFilePath}" layout="${longdate} ${level:upperCase=true}: ${message}${newline}(${stacktrace}) ${exception:format=ToString}" />',
    '</targets>',
    '<rules>',
    '<logger name="defaultLogger" minlevel="Warn" writeTo="file" />',
    '</rules>',
    '</nlog>';
    this.fs.copyTpl(
      this.templatePath('api/_web.config'),
      this.destinationPath(path.join(this.appDirectory, 'Web.config')),
      {
        applicationName: this.appData.applicationName,
        dbServerName: this.appData.dbServerName,
        loggingConfig: this.loggingConfig
      }
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.debug.config'),
      this.destinationPath(path.join(this.appDirectory, 'Web.Debug.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.release.config'),
      this.destinationPath(path.join(this.appDirectory, 'Web.Release.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_api.csproj'),
      this.destinationPath(path.join(this.appDirectory, this.appData.applicationName + '.csproj')),
      {
        applicationName: this.appData.applicationName,
        apiProjectGuid: this.appData.apiProjectGuid
      }
      );
  };

  Generator.prototype.createOutterFiles = function () {
    this.fs.copyTpl(
      this.templatePath('_app.sln'),
      this.destinationPath(path.join(this.destinationRoot(), '/', this.appData.solutionName + '.sln')),
      {
        applicationName: this.appData.applicationName,
        apiProjectGuid: this.appData.apiProjectGuid
      }
      );
    this.fs.copyTpl(
      this.templatePath('packages/_repositories.config'),
      this.destinationPath(path.join(this.packagesDirectory, 'repositories.config')), { applicationName: this.appData.applicationName }
      );
  };
};
