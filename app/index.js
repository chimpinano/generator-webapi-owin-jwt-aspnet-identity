'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var guid = require('uuid');
var mkdirp = require('mkdirp');
var path = require('path');

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
      default: true,
      required: true
    }], function (props) {
        this.props = props;
        this.props.apiProjectGuid = guid.v4();
        this.props.apiAssemblyGuid = guid.v4();
        this.appNameForTemplate = { applicationName: this.props.applicationName };
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
    mkdirp('packages');
    mkdirp(this.props.applicationName + '/App_Start');
    mkdirp(this.props.applicationName + '/Authentication/EmailTemplates');
    mkdirp(this.props.applicationName + '/AutoMapping');
    mkdirp(this.props.applicationName + '/Controllers');
    mkdirp(this.props.applicationName + '/Exceptions');
    mkdirp(this.props.applicationName + '/Filters');
    mkdirp(this.props.applicationName + '/Migrations');
    mkdirp(this.props.applicationName + '/Models/Response');
    mkdirp(this.props.applicationName + '/Models/Request');
    mkdirp(this.props.applicationName + '/Properties');
  },

  writing: {
    appStart: function () {
      
      this.fs.copyTpl(
        this.templatePath('api/AppStart/_webapiconfig.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'WebApiConfig.cs'), this.appNameForTemplate)
        );
    },
    authentication: function () {
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationjwtformat.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/ApplicationJwtFormat.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_applicationuser.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/ApplicationUser.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationcontext.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/AuthenticationContext.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationemailservice.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/AuthenticationEmailService.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_authenticationusermanager.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/AuthenticationUserManager.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/_oauthprovider.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/OAuthProvider.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_confirmemailaddressemail.html'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/EmailTemplates/ConfirmEmailAddressEmail.html'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Authentication/EmailTemplates/_resetpasswordemail.html'),
        this.destinationPath(path.join(this.props.applicationName, 'Authentication/EmailTemplates/ResetPasswordEmail.html'), this.appNameForTemplate)
        );
    },
    autoMapping: function () {
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_automappingextensions.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'AutoMapping/AutoMappingExtensions.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_newuserprofile.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'AutoMapping/NewUserProfile.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/AutoMapping/_userprofile.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'AutoMapping/UserProfile.cs'). this.appNameForTemplate)
        );
    },
    controllers: function () {
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_basecontroller.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Controllers/BaseController.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Controllers/_userscontroller.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Controllers/UsersController.cs'), this.appNameForTemplate)
        );
    },
    exceptions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiexception.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Exceptions/APIException.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiglobalexceptionhandler.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Exceptions/APIGlobalExceptionHandler.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Exceptions/_apiresponseexception.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Exceptions/APIResponseException.cs'), this.appNameForTemplate)
        );
    },
    extensions: function () {
      this.fs.copyTpl(
        this.templatePath('api/Extensions/_exceptionExtensions.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Extensions/ExceptionExtensions.cs'), this.appNameForTemplate)
        );
    },
    filters: function () {
      this.fs.copyTpl(
        this.templatePath('api/Filters/_apiexceptionfilterattribute.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Filters/APIExceptionFilterAttribute.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Filters/_modelvalidationfilterattribute.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Filters/ModelValidationFilterAttribute.cs'), this.appNameForTemplate)
        );
    },
    migrations: function () {
      this.fs.copyTpl(
        this.templatePath('api/Migrations/_configuration.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Migrations/Configuration.cs'), this.appNameForTemplate)
        );
    },
    models: function () {
      this.fs.copyTpl(
        this.templatePath('api/Models/_newusermodel.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/NewUserModel.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/_usermodel.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/UserModel.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_confirmemailaddressrequest.cs', this.appNameForTemplate),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Request/ConfirmEmailAddressRequest.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_createuserrequest.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Request/CreateUserRequest.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_resetpasswordrequest.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Request/ResetPasswordRequest.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_sendpasswordresetrequest.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Request/SendPasswordResetRequest.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Request/_userrequest.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Request/UserRequest.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_defaultresponse.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Response/DefaultResponse.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/Models/Response/_userresponse.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Models/Response/UserResponse.cs'), this.appNameForTemplate)
        );
    },
    properties: function () {
      this.fs.copyTpl(
        this.templatePath('api/Properties/_assemblyinfo.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Properties/AssemblyInfo.cs'),
          {
            applicationName: this.props.applicationName,
            apiProjectGuid: this.props.apiAssemblyGuid
          })
        );
    },
    rootFiles: function () {
      this.fs.copy(
        this.templatePath('api/_packages.config'),
        this.destinationPath(path.join(this.props.applicationName, 'Packages.config'))
        );
      this.fs.copyTpl(
        this.templatePath('api/_startup.cs'),
        this.destinationPath(path.join(this.props.applicationName, 'Startup.cs'), this.appNameForTemplate)
        );
      this.fs.copyTpl(
        this.templatePath('api/_web.config'),
        this.destinationPath(path.join(this.props.applicationName,'Web.config'), this.appNameForTemplate)
        );
      this.fs.copy(
        this.templatePath('api/_web.debug.config'),
        this.destinationPath(path.join(this.props.applicationName,'Web.Debug.config'))
        );
      this.fs.copy(
        this.templatePath('api/_web.release.config'),
        this.destinationPath(path.join(this.props.applicationName,'Web.Release.config'))
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
        this.destinationPath('packages/repositories.config', this.appNameForTemplate)
        );
    }
  }
});
