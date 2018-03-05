'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.loginCtrl',
    'myApp.loginService',
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
    'ngRoute',
    'ui.router'
]).
config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true)
    
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'partials/login',
            controller: 'loginController'
        })
        .state('principal', {
            url: '',
            templateUrl: 'partials/principal',
            abstract: true
        })
        .state('detail', {
            parent: 'principal',
            url: '/detail?id&vacancyId',
            params: {
                id: null,
                vacancyId: null,
            },
            templateUrl: 'partials/candidateDetail',
            controller: 'candidatesController',
            title: "Candidato",
            activetab: 'detail'
        })
        .state('candidateslist', {
            parent: 'principal',
            url: '/candidateslist',
            templateUrl: 'partials/candidateList',
            controller: 'candidatesListController',
            title: "Lista de candidatos",
            activetab: 'candidateslist'
        })
        .state('vacancyDetail', {
            parent: 'principal',
            url: '/vacancyDetail?id',
            params: {
                id: null
            },
            templateUrl: 'partials/vacancyDetail',
            controller: 'vacancyDetailController',
            title: "Ficha de Vacantes",
            activetab: 'vacancyDetail'
        })
        .state('vacancyList', {
            parent: 'principal',
            url: '/vacancyList',
            templateUrl: 'partials/vacancyList',
            controller: 'vacancyListController',
            title: "Lista de fichas de Vacantes",
            activetab: 'vacancyList'
        })
        .state('employerList', {
            parent: 'principal',
            url: '/employerList',
            templateUrl: 'partials/employerList',
            controller: 'employerListController',
            title: "Lista de empleadores",
            activetab: 'employerList'
        })
        .state('employerDetail', {
            parent: 'principal',
            url: '/employerDetail?id',
            params: {
                id: null
            },
            templateUrl: 'partials/employerDetail',
            controller: 'employerController',
            title: "Empleador",
            activetab: 'employerDetail'
        })
        .state('jobList', {
            parent: 'principal',
            url: '/jobList',
            templateUrl: 'partials/jobList',
            controller: 'jobListController',
            title: "Lista de jobs",
            activetab: 'jobList'
        })
        .state('jobDetail', {
            parent: 'principal',
            url: '/jobDetail?id',
            params: {
                id: null
            },
            templateUrl: 'partials/jobDetail',
            controller: 'jobController',
            title: "Job",
            activetab: 'jobDetail'
        })
        //datos anteriores
        .state('unresolved', {
            parent: 'principal',
            url: '/unresolved',
            templateUrl: 'partials/unresolved',
            controller: 'MyCtrl1',
            activetab: 'unresolved'
        })
        .state('solve', {
            parent: 'principal',
            url: '/solve',
            templateUrl: 'partials/solve',
            controller: 'SolveCtrl',
            activetab: 'view2'
        })
        .state('synonyms', {
            parent: 'principal',
            url: '/synonyms',
            templateUrl: 'partials/synonyms',
            controller: 'SynonymsCtrl',
            activetab: 'synonyms'
        })
        .state('addGrams', {
            parent: 'principal',
            url: '/addGrams',
            templateUrl: 'partials/addGrams',
            controller: 'AddCtrl',
            activetab: 'addGrams'
        })
        .state('setGrams', {
            parent: 'principal',
            url: '/addGrams',
            templateUrl: 'partials/setGrams',
            controller: 'SetCtrl',
            activetab: 'setGrams'
        })
        .state('editGram', {
            parent: 'principal',
            url: '/editGram',
            templateUrl: 'partials/editGram',
            controller: 'EditCtrl',
            activetab: 'editGram'
        })
        .state('search', {
            parent: 'principal',
            url: '/search',
            templateUrl: 'partials/search',
            controller: 'SearchCtrl',
            activetab: 'search'
        })
        .state('candidates', {
            parent: 'principal',
            url: '/candidates',
            templateUrl: 'partials/candidates',
            controller: 'CandidatesCtrl',
            activetab: 'candidates'
        })
        .state('candidate', {
            parent: 'principal',
            url: '/candidate',
            templateUrl: 'partials/candidate',
            controller: 'CandidatesCtrl',
            activetab: 'candidate'
        })
        .state('jobs', {
            parent: 'principal',
            url: '/jobs',
            templateUrl: 'partials/jobs',
            controller: 'JobsCtrl',
            activetab: 'jobs'
        })
        .state('job', {
            parent: 'principal',
            url: '/job',
            templateUrl: 'partials/job',
            controller: 'JobsCtrl',
            activetab: 'job'
        })
        .state('match', {
            parent: 'principal',
            url: '/match',
            templateUrl: 'partials/match',
            controller: 'JobsCtrl',
            activetab: 'match'
        })
        .state('metaFeatures', {
            parent: 'principal',
            url: '/metaFeatures',
            templateUrl: 'partials/metaFeatures',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaFeatures'
        })
        .state('metaFeature', {
            parent: 'principal',
            url: '/metaFeature',
            templateUrl: 'partials/showMetaFeature',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaFeature'
        })
        .state('newMetaRelation', {
            parent: 'principal',
            url: '/newMetaRelation',
            templateUrl: 'partials/newMetaRelation',
            controller: 'metaFeaturesCtrl',
            activetab: 'newMetaRelation'
        })
        .state('metaRelation', {
            parent: 'principal',
            url: '/metaRelation',
            templateUrl: 'partials/showMetaRelation',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaRelation'
        })
        .state('frequencyMatrix', {
            parent: 'principal',
            url: '/frequencyMatrix',
            templateUrl: 'partials/frequencyMatrix',
            controller: 'frequencyMatrixCtrl',
            activetab: 'frequencyMatrix'
        })
        .state('candidateMatching', {
            parent: 'principal',
            url: '/candidateMatching',
            templateUrl: 'partials/candidateMatching',
            controller: 'frequencyMatrixCtrl',
            activetab: 'candidateMatching'
        })
        .state('vacancy', {
            parent: 'principal',
            url: '/vacancy',
            templateUrl: 'partials/vacancy',
            controller: 'vacancyCtrl',
            activetab: 'vacancy'
        });
}).
run(['$location', '$rootScope', function ($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.activeTitle = current.$$route.title;
        $rootScope.activetab = current.$$route.activetab;
    });
}]);