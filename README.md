# ContactmanagerFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
"# Contact Manager Website - Angular Application" 

#################################################

## Contact Manager Front-End Website technologies

    Angular 6
    HttpClient
    Bootstrap
    HTML 5
    CSS 3
    TypeScript
    Javascript

## Deployment

#  Use below command to compile websote

		ng build --prod --build-optimizer --base-href=/

		Compress all content to a file (for example: Client.zip)
		Create a website for front-end Angular application (for example: http://localhost:7000).
		Unzip file Client.zip to the website root (depends on the settings while building the app).
		Browse index.html. If there is routing error, follow below links to install URL Rewrite Module

## Install IIS URL Rewrite Module for Angular Routing

		https://blogs.msdn.microsoft.com/premier_developer/2017/06/14/tips-for-running-an-angular-app-in-iis/
		https://www.iis.net/downloads/microsoft/url-rewrite

## Add web.config file to src folder

		<configuration>
		<system.webServer>
			<rewrite>
				<rules>
					<rule name="Angular Routes" stopProcessing="true">
						<match url=".*" />
				<conditions logicalGrouping="MatchAll">
					<add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
					<add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
				</conditions>
				<action type="Rewrite" url="/MyApp/" />
				<!--<action type="Rewrite" url="/" />-->
					</rule>
				</rules>
			</rewrite>
		</system.webServer>
		</configuration>

## Add web.config to asserts section
  # .angular-cli.json (for Angular version 2 through 5) 
  "apps": [
        {
	   "root": “src”,
	   "ourDir": “dist”,
	   "assets": [
	      “assets”,
	      “favicon.ico”,
	      “web.config”
          ],
  # angular.json (for Angular version 6+) 
        “build”: {
	   "options”: {
	     . . . 
	     "assets": [
	        “src/assets”,
	        “src/favicon.ico”,
	        “src/web.config”

## Grant IIS folder permission to everyone

    This will resolve 500.19 error 

##	Settings

		RESTful Web Api url is located in config.json under assets folder. The content is below:

		{
				"url": "http://localhost:5000/api/contacts"
		}


##	Components, module and service:

		List component          : List contacts with a pagination nav
		Create component        :	Create contact page
		Edit component          :	Upate contact page
		Delete component        :	Delete contact page
		Page not found component:	404 page
		Routing modele          :	Defined router
		Contact service	        : Using Angular HttpClient and rxjs to make asyc call to Web Api services

##	Validation: 

		JavaScript validations have been implemented acceding to the task requirements. Take advantage of Angular and HTML5’s built-in validators to ensure input data is clean and safe.

##	Responsive

		The Angular website has included various libraries like jQuery, Bootstrap. The website is a responsive one and user friendly.

