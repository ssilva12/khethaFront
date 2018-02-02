'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.vacancyCtrl',
    'myApp.vacancyController',
    'myApp.vacancyListCtrl',
    'myApp.candidatesServices',
    'myApp.candidatesCtrl',
    'myApp.candidatesListCtrl',
    'myApp.filters',
    'myApp.services',
    'myApp.vacancyService',
    'myApp.directives',
    'myApp.factories',
    'myApp.constant',
    'ngFileUpload',
    'angularSpinner',
    'ngSanitize',
    'ngRoute'
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
    when('/newMetaRelation', {
        templateUrl: 'partials/newMetaRelation',
        controller: 'metaFeaturesCtrl',
        activetab: 'metaFeatures'
    }).
    when('/metaRelation', {
        templateUrl: 'partials/showMetaRelation',
        controller: 'metaFeaturesCtrl',
        activetab: 'metaFeatures'
    }).
    when('/frequencyMatrix', {
        templateUrl: 'partials/frequencyMatrix',
        controller: 'frequencyMatrixCtrl',
        activetab: 'frequencyMatrix'
    }).
    when('/candidateMatching', {
        templateUrl: 'partials/candidateMatching',
        controller: 'frequencyMatrixCtrl',
        activetab: 'candidateMatching'
    }).
    when('/vacancyList', {
        templateUrl: 'partials/vacancyList',
        controller: 'vacancyListController',
        title: "Lista de vacantes"
    }).
    when('/vacancy', {
        templateUrl: 'partials/vacancy',
        controller: 'vacancyCtrl',
        title: "Vacante"
    }).
    when('/vacancyDetail', {
        templateUrl: 'partials/vacancyDetail',
        controller: 'vacancyDetailController',
        title: "Vacante"
    }).
    when('/vacancyDetail/:id', {
        templateUrl: 'partials/vacancyDetail',
        controller: 'vacancyDetailController',
        title: "Vacante"
    }).
    when('/detail', {
        title: "Candidato",
        templateUrl: 'partials/candidateDetail',
        controller: 'candidatesController'
    }).
    when('/detail/:id', {
        title: "Candidato",
        templateUrl: 'partials/candidateDetail',
        controller: 'candidatesController'
    }).
    when('/candidateslist', {
        title: "Lista de candidatos",
        templateUrl: 'partials/candidateList',
        controller: 'candidatesListController'
    }).
    otherwise({
        redirectTo: '/candidateslist'
    });

    $locationProvider.html5Mode(true);
}).run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);