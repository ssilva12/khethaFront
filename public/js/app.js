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
    'myApp.employerService',
    'myApp.employerListCtrl',
    'myApp.employerCtrl',
    'myApp.jobService',
    'myApp.jobListCtrl',
    'myApp.jobCtrl',
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
    when('/detail', {
        title: "Candidato",
        templateUrl: 'partials/candidateDetail',
        controller: 'candidatesController',
        activetab: 'detail'
    }).
    when('/detail/:id', {
        title: "Candidato",
        templateUrl: 'partials/candidateDetail',
        controller: 'candidatesController',
        activetab: 'detail'
    }).
    when('/detail/:id/:vacancyId', {
        title: "Candidato",
        templateUrl: 'partials/candidateDetail',
        controller: 'candidatesController',
        activetab: 'detail'
    }).
    when('/candidateslist', {
        title: "Lista de candidatos",
        templateUrl: 'partials/candidateList',
        controller: 'candidatesListController',
        activetab: 'candidateslist'
    }).
    when('/vacancyDetail', {
        templateUrl: 'partials/vacancyDetail',
        controller: 'vacancyDetailController',
        title: "Ficha de Vacantes",
        activetab: 'vacancyDetail'
    }).
    when('/vacancyDetail/:id', {
        templateUrl: 'partials/vacancyDetail',
        controller: 'vacancyDetailController',
        title: "Ficha de Vacantes",
        activetab: 'vacancyDetail'
    }).
    when('/vacancyList', {
        templateUrl: 'partials/vacancyList',
        controller: 'vacancyListController',
        title: "Lista de fichas de Vacantes",
        activetab: 'vacancyList'
    }).
    when('/employerList', {
        templateUrl: 'partials/employerList',
        controller: 'employerListController',
        title: "Gestión de empleadores",
        activetab: 'employerList'
    }).
    when('/employerDetail', {
        title: "Empleador",
        templateUrl: 'partials/employerDetail',
        controller: 'employerController',
        activetab: 'employerDetail'
    }).
    when('/employerDetail/:id', {
        title: "Empleador",
        templateUrl: 'partials/employerDetail',
        controller: 'employerController',
        activetab: 'employerDetail'
    }).
    when('/jobList', {
        templateUrl: 'partials/jobList',
        controller: 'jobListController',
        title: "Gestión de jobs",
        activetab: 'jobList'
    }).
    when('/jobDetail', {
        title: "Job",
        templateUrl: 'partials/jobDetail',
        controller: 'jobController',
        activetab: 'jobDetail'
    }).
    when('/jobDetail/:id', {
        title: "Job",
        templateUrl: 'partials/jobDetail',
        controller: 'jobController',
        activetab: 'jobDetail'
    }).



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

    when('/vacancy', {
        templateUrl: 'partials/vacancy',
        controller: 'vacancyCtrl',
        title: "Vacante"
    }).
    otherwise({
        redirectTo: '/candidateslist'
    });

    $locationProvider.html5Mode(true);
}).run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.activeTitle = current.$$route.title;
        $rootScope.activetab = current.$$route.activetab;
    });
}]);