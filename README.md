

![build image](https://travis-ci.org/bizcasfri/generator-webapi-owin-jwt-aspnet-identity.svg?branch=master)
[![NPM version](http://img.shields.io/npm/v/generator-webapi-owin-jwt-aspnet-identity.svg?style=flat)](http://npmjs.org/generator-webapi-owin-jwt-aspnet-identity)
[![NPM downloads](http://img.shields.io/npm/dm/generator-webapi-owin-jwt-aspnet-identity.svg?style=flat)](http://npmjs.org/generator-webapi-owin-jwt-aspnet-identity)
[![Dependency Status](http://img.shields.io/david/bizcasfri/generator-webapi-owin-jwt-aspnet-identity.svg?style=flat)](https://david-dm.org/bizcasfri/generator-webapi-owin-jwt-aspnet-identity)

# Generate an ASP.NET Web API with OAuth JSON Web Tokens Authentication and ASP.NET Identity #

This generator will provide you with a fully functional Web API application that has implemented OAuth JSON Web Token and ASP.NET Identity.  This is a [Yeoman](http://yeoman.io/ "Yeoman") generator.  You will need NPM installed on your machine to generate the API. You can get npm by installing [nodeJS](https://nodejs.org/download/ "nodeJS")

Once you have npm installed you will need to install Yeoman. Open a command prompt and enter the following command:



    npm install -g yo
 

You now have Yeoman installed globally on your computer.  Next you need to install this generator, again, open a command prompt and type this command:

    npm install -g generator-webapi-owin-jwt-aspnet-identity

You now have the generator installed on your computer.  Using the command prompt, navigate to your development working directory for this project.  Once you are there, type this command:


    yo webapi-owin-jwt-aspnet-identity


This will kick off the installation.  During the installation, you will be asked two questions

1. What is the name of your application
2. What is the name of the SQL Server instance on your computer


After answering the questions, the entire API solution and project will be created.  There are a few more things you will need to do before you are finished.


1. Open the solution
2. Right click on references in the project, and select Manage NuGet Packages
3. In the NuGet package window you will see a yellow bar at the top.  Click on the restore button on the right side of the yellow bar.  This will restore all of the project dependencies.

![NuGet restore](https://raw.githubusercontent.com/bizcasfri/generator-webapi-owin-jwt-aspnet-identity/master/readmeimages/nugetrestore.png)

Once the restore is finished the window should look something like this:

![NuGet restore finished](https://raw.githubusercontent.com/bizcasfri/generator-webapi-owin-jwt-aspnet-identity/master/readmeimages/nugetrestorefinished.png)

Now you can build the solution!  Next we need to do some database work.  In the Visual Studio menu to to View>Other Windows>Package Manager Console.  In the console, type the following command:



    add-migration "database creation"

This will create a migration file so you can now update/create your database by running this command:


    update-database

Once this command is finished, you can open SQL Server Management Studio and see that the database was created.

**If you have any issues during these steps it is most likely related to having the wrong database server instance name (which you entered during the installation).  Check the connection string in the Web.config to make sure the instance name is correct**


Now there are a few application settings that will need to be changed for enabling email notifications.  In the appSettings section of the Web.config, you will need to change the following settings as needed.



    <add key="emailHost" value="localhost" />
    <add key="supportEmailAddress" value="support@yourapp.com" />
    <add key="supportEmailName" value="Customer Support" />
    <add key="emailUser" value="user@yourapp.com" />
    <add key="emailPassword" value="yourpassword" />


If you don't have an SMTP server, you can use [SMTP4Dev](https://smtp4dev.codeplex.com/ "SMTP4Dev").  While it is running it will attach to port 25 and intercept emails coming from your development projects.  It has a user interface and you can open the emails.


You are ready to start testing your API.  I typically use Postman.  I have created a [JSON Postman file](https://github.com/bizcasfri/generator-webapi-owin-jwt-aspnet-identity/blob/master/postmanapitests.json "JSON Postman file") that you can import into Postman to get your started.  It is based on the functionality of the API you just installed.



