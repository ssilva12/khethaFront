'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.factories',
  'ngFileUpload'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/view1', {
      templateUrl: 'partials/unresolved',
      controller: 'MyCtrl1',
      activetab: 'view1'
    }).
    when('/solve', {
      templateUrl: 'partials/solve',
      controller: 'SolveCtrl',
      activetab: 'view2'
    }).
    when('/search', {
      templateUrl: 'partials/search',
      controller: 'SearchCtrl',
      activetab: 'search'
    }).
    when('/addGrams', {
      templateUrl: 'partials/addGrams',
      controller: 'AddCtrl',
      activetab: 'search'
    }).
    when('/setGrams', {
      templateUrl: 'partials/setGrams',
      controller: 'SetCtrl',
      activetab: 'search'
    }).
    when('/editGram', {
      templateUrl: 'partials/editGram',
      controller: 'EditCtrl',
      activetab: 'search'
    }).
    otherwise({
      redirectTo: '/view1'
    });

  $locationProvider.html5Mode(true);
});
