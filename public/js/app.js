'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.factories',
  'ngFileUpload',
  'angularSpinner'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/unresolved', {
      templateUrl: 'partials/unresolved',
      controller: 'MyCtrl1',
      activetab: 'unresolved'
    }).
    when('/solve', {
      templateUrl: 'partials/solve',
      controller: 'SolveCtrl',
      activetab: 'view2'
    }).
    when('/synonyms', {
      templateUrl: 'partials/synonyms',
      controller: 'SynonymsCtrl',
      activetab: 'synonyms'
    }).
    when('/addGrams', {
      templateUrl: 'partials/addGrams',
      controller: 'AddCtrl',
      activetab: 'synonyms'
    }).
    when('/setGrams', {
      templateUrl: 'partials/setGrams',
      controller: 'SetCtrl',
      activetab: 'synonyms'
    }).
    when('/editGram', {
      templateUrl: 'partials/editGram',
      controller: 'EditCtrl',
      activetab: 'synonyms'
    }).
    when('/search', {
      templateUrl: 'partials/search',
      controller: 'SearchCtrl',
      activetab: 'search'
    }).
    when('/candidates', {
      templateUrl: 'partials/candidates',
      controller: 'CandidatesCtrl',
      activetab: 'candidates'
    }).
    when('/candidate', {
      templateUrl: 'partials/candidate',
      controller: 'CandidatesCtrl',
      activetab: 'candidate'
    }).
    when('/jobs', {
      templateUrl: 'partials/jobs',
      controller: 'JobsCtrl',
      activetab: 'jobs'
    }).
    when('/job', {
      templateUrl: 'partials/newJob',
      controller: 'JobsCtrl',
      activetab: 'jobs'
    }).
    when('/match', {
      templateUrl: 'partials/match',
      controller: 'JobsCtrl',
      activetab: 'jobs'
    }).
    when('/metaFeatures', {
      templateUrl: 'partials/metaFeatures',
      controller: 'metaFeaturesCtrl',
      activetab: 'metaFeatures'
    }).
    when('/metaFeature', {
      templateUrl: 'partials/showMetaFeature',
      controller: 'metaFeaturesCtrl',
      activetab: 'metaFeatures'
    }).
    when('/metaRelation', {
      templateUrl: 'partials/showMetaRelation',
      controller: 'metaFeaturesCtrl',
      activetab: 'metaFeatures'
    }).
    otherwise({
      redirectTo: '/synonyms'
    });

  $locationProvider.html5Mode(true);
});
