'use strict';
namespace App {
  angular.module('app', ['ngRoute', 'ngResource',"ui.bootstrap"])
  .config((
    $routeProvider: ng.route.IRouteProvider,
    $locationProvider: ng.ILocationProvider,
    $httpProvider: ng.IHttpProvider) => {

    $routeProvider
    .when('/', {
      templateUrl: '/templates/Home.html',
      controller: app.Controllers.HomeController,
      controllerAs: 'vm'
    })
    .when("/register", {
        templateUrl: "/templates/Register.html",
        controller: app.Controllers.UserController,
        controllerAs: "vm"
    })
    .when("/login", {
        templateUrl: "/templates/Login.html",
        controller: app.Controllers.UserController,
        controllerAs: "vm"
    })
    .when("/boardCreate", {
        templateUrl: "/templates/boardCreate.html",
        controller: app.Controllers.BoardCreateController,
        controllerAs: "vm"
    })
    .when("/boardDetails/:id", {
        templateUrl: "/templates/boardDetails.html",
        controller: app.Controllers.BoardDetailsController,
        controllerAs: "vm"
    })
    .when("/update/:id", {
        templateUrl: "/templates/boardUpdate.html",
        controller: app.Controllers.BoardUpdateController,
        controllerAs: "vm"
    })
    .when("/pinUpdate/:id", {
        templateUrl: "/templates/PinUpdate.html",
        controller: app.Controllers.PinUpdateController,
        controllerAs: "vm"
    })
    .when("/pinDetails/:id", {
        templateUrl: "/templates/PinDetails.html",
        controller: app.Controllers.PinDetailsController,
        controllerAs: "vm"
    })
    .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('HTTPFactory');
  });
}
