'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var yosay = require('yosay');
var guid = require('uuid');
var _s = require('underscore.string');

module.exports = yeoman.generators.Base.extend({


  init: function () {
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
  },


  askForAppData: function () {
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
  },

  appPaths: function () {
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
  },

  createDirectories: function () {
    mkdirp(this.packagesDirectory);
    mkdirp(this.appDirectory);
    mkdirp(this.appStart);
    mkdirp(this.authenticationDirectory);
    mkdirp(this.emailTemplatesDirectory);
    mkdirp(this.autoMappingDirectory);
    mkdirp(this.controllersDirectory);
    mkdirp(this.extensionsDirectory);
    mkdirp(this.exceptionsDirectory);
    mkdirp(this.filtersDirectory);
    mkdirp(this.migrationsDirectory);
    mkdirp(this.modelsDirectory);
    mkdirp(this.responseDirectory);
    mkdirp(this.requestDirectory);
    mkdirp(this.propertiesDirectory);
  },


  createAppStartFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/App_Start/_webapiconfig.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'App_Start/WebApiConfig.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createAuthenticationFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_applicationjwtformat.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/ApplicationJwtFormat.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_applicationuser.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/ApplicationUser.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationcontext.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/AuthenticationContext.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationemailservice.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/AuthenticationEmailService.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_authenticationusermanager.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/AuthenticationUserManager.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/_oauthprovider.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/OAuthProvider.cs')), { applicationName: this.appData.applicationName }
        );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/EmailTemplates/_confirmemailaddressemail.html'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/EmailTemplates/ConfirmEmailAddressEmail.html')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Authentication/EmailTemplates/_resetpasswordemail.html'),
      this.destinationPath(path.join(this.appData.applicationName, 'Authentication/EmailTemplates/ResetPasswordEmail.html')), { applicationName: this.appData.applicationName }
      );
  },

  createAutoMappingFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_automappingextensions.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'AutoMapping/AutoMappingExtensions.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_newuserprofile.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'AutoMapping/NewUserProfile.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/AutoMapping/_userprofile.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'AutoMapping/UserProfile.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createControllerFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Controllers/_basecontroller.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Controllers/BaseController.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Controllers/_userscontroller.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Controllers/UsersController.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createExceptionFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiexception.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Exceptions/APIException.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiglobalexceptionhandler.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Exceptions/APIGlobalExceptionHandler.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Exceptions/_apiresponseexception.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Exceptions/APIResponseException.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createExtensionFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Extensions/_exceptionextensions.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Extensions/ExceptionExtensions.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createFilterFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Filters/_apiexceptionfilterattribute.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Filters/APIExceptionFilterAttribute.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Filters/_modelvalidationfilterattribute.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Filters/ModelValidationFilterAttribute.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createMigrationFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Migrations/_configuration.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Migrations/Configuration.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createModelFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Models/_newusermodel.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/NewUserModel.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/_usermodel.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/UserModel.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_confirmemailaddressrequest.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Request/ConfirmEmailAddressRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_createuserrequest.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Request/CreateUserRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_resetpasswordrequest.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Request/ResetPasswordRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_sendpasswordresetrequest.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Request/SendPasswordResetRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Request/_userrequest.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Request/UserRequest.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Response/_defaultresponse.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Response/DefaultResponse.cs')), { applicationName: this.appData.applicationName }
      );
    this.fs.copyTpl(
      this.templatePath('api/Models/Response/_userresponse.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Models/Response/UserResponse.cs')), { applicationName: this.appData.applicationName }
      );
  },

  createPropertiesFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/Properties/_assemblyinfo.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Properties/AssemblyInfo.cs')),
      {
        applicationName: this.appData.applicationName,
        apiAssemblyGuid: this.appData.apiAssemblyGuid
      }
      );
  },

  createRootFiles: function () {
    this.fs.copyTpl(
      this.templatePath('api/_packages.config'),
      this.destinationPath(path.join(this.appData.applicationName, 'Packages.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_startup.cs'),
      this.destinationPath(path.join(this.appData.applicationName, 'Startup.cs')), { applicationName: this.appData.applicationName }
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
      this.destinationPath(path.join(this.appData.applicationName, 'Web.config')),
      {
        applicationName: this.appData.applicationName,
        dbServerName: this.appData.dbServerName,
        loggingConfig: this.loggingConfig
      }
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.debug.config'),
      this.destinationPath(path.join(this.appData.applicationName, 'Web.Debug.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_web.release.config'),
      this.destinationPath(path.join(this.appData.applicationName, 'Web.Release.config'))
      );
    this.fs.copyTpl(
      this.templatePath('api/_api.csproj'),
      this.destinationPath(path.join(this.appData.applicationName, this.appData.applicationName + '.csproj')),
      {
        applicationName: this.appData.applicationName,
        apiProjectGuid: this.appData.apiProjectGuid
      }
      );
  },

  createOutterFiles: function () {
    this.fs.copyTpl(
      this.templatePath('_app.sln'),
      this.destinationPath(path.join(this.destinationRoot(), this.appData.solutionName + '.sln')),
      {
        applicationName: this.appData.applicationName,
        apiProjectGuid: this.appData.apiProjectGuid
      }
      );
    this.fs.copyTpl(
      this.templatePath('packages/_repositories.config'),
      this.destinationPath(path.join(this.destinationRoot(), 'packages/repositories.config')), { applicationName: this.appData.applicationName }
      );
  }
});
