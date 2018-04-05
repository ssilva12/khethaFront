'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
    'myApp.controllers',
    'myApp.loginCtrl',
    'myApp.loginService',
    'myApp.vacancyCtrl',
    'myApp.vacancyController',
    'myApp.vacancyListCtrl',
    'myApp.vacancyFrequencyController',
    'myApp.candidatesServices',
    'myApp.candidatesCtrl',
    'myApp.candidatesListCtrl',
    'myApp.employerService',
    'myApp.employerListCtrl',
    'myApp.employerCtrl',
    'myApp.jobService',
    'myApp.jobListCtrl',
    'myApp.jobCtrl',
    'myApp.userService',
    'myApp.userListCtrl',
    'myApp.userController',
    'myApp.fuseCtrl',
    'myApp.unfoldCtrl',
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
    'ui.router',
    'permission'
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
            activetab: 'detail',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
        })
        .state('candidateslist', {
            parent: 'principal',
            url: '/candidateslist',
            templateUrl: 'partials/candidateList',
            controller: 'candidatesListController',
            title: "Lista de candidatos",
            activetab: 'candidateslist',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
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
            activetab: 'vacancyDetail',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
        })
        .state('vacancyList', {
            parent: 'principal',
            url: '/vacancyList',
            templateUrl: 'partials/vacancyList',
            controller: 'vacancyListController',
            title: "Lista de fichas de Vacantes",
            activetab: 'vacancyList',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
        })
        .state('employerList', {
            parent: 'principal',
            url: '/employerList',
            templateUrl: 'partials/employerList',
            controller: 'employerListController',
            title: "Lista de empleadores",
            activetab: 'employerList',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
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
            activetab: 'employerDetail',
            data: {
                permissions: {
                    only: ['0', '1', '2', '3', '4', '5'],
                    redirectTo: 'login'
                }
            }
        })
        .state('jobList', {
            parent: 'principal',
            url: '/jobList',
            templateUrl: 'partials/jobList',
            controller: 'jobListController',
            title: "Lista de jobs",
            activetab: 'jobList',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
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
            activetab: 'jobDetail',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('vacancyFrequency', {
            parent: 'principal',
            url: '/vacancyFrequency',
            templateUrl: 'partials/vacancyFrequency',
            controller: 'vacancyFrequencyController',
            title: "Matrices de frequencia",
            activetab: 'vacancyFrequency',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('userList', {
            parent: 'principal',
            url: '/userList',
            templateUrl: 'partials/userList',
            controller: 'userListController',
            title: "Lista de usuarios",
            activetab: 'userList',
            data: {
                permissions: {
                    only: ['5'],
                    redirectTo: 'login'
                }
            }
        })
        .state('userDetail', {
            parent: 'principal',
            url: '/userDetail?id',
            params: {
                id: null
            },
            templateUrl: 'partials/userDetail',
            controller: 'userDetailController',
            title: "Usuario",
            activetab: 'userDetail',
            data: {
                permissions: {
                    only: ['5'],
                    redirectTo: 'login'
                }
            }
        })
        //datos anteriores
        .state('unresolved', {
            parent: 'principal',
            url: '/unresolved',
            templateUrl: 'partials/unresolved',
            controller: 'MyCtrl1',
            activetab: 'unresolved',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('solve', {
            parent: 'principal',
            url: '/solve',
            templateUrl: 'partials/solve',
            controller: 'SolveCtrl',
            activetab: 'view2',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('pieceWiseSearch', {
            parent: 'principal',
            url: '/pieceWiseSearch',
            templateUrl: 'partials/pieceWiseSearch',
            controller: 'pieceWiseSearchCtrl',
            activetab: 'view2',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('synonyms', {
            parent: 'principal',
            url: '/synonyms',
            templateUrl: 'partials/synonyms',
            controller: 'SynonymsCtrl',
            activetab: 'synonyms',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('addGrams', {
            parent: 'principal',
            url: '/addGrams',
            templateUrl: 'partials/addGrams',
            controller: 'AddCtrl',
            activetab: 'addGrams',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('setGrams', {
            parent: 'principal',
            url: '/addGrams',
            templateUrl: 'partials/setGrams',
            controller: 'SetCtrl',
            activetab: 'setGrams',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('editGram', {
            parent: 'principal',
            url: '/editGram',
            templateUrl: 'partials/editGram',
            controller: 'EditCtrl',
            activetab: 'editGram',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('search', {
            parent: 'principal',
            url: '/search',
            templateUrl: 'partials/search',
            controller: 'SearchCtrl',
            activetab: 'search',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('candidates', {
            parent: 'principal',
            url: '/candidates',
            templateUrl: 'partials/candidates',
            controller: 'CandidatesCtrl',
            activetab: 'candidates',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('candidate', {
            parent: 'principal',
            url: '/candidate',
            templateUrl: 'partials/candidate',
            controller: 'CandidatesCtrl',
            activetab: 'candidate',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('jobs', {
            parent: 'principal',
            url: '/jobs',
            templateUrl: 'partials/jobs',
            controller: 'JobsCtrl',
            activetab: 'jobs',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('job', {
            parent: 'principal',
            url: '/job',
            templateUrl: 'partials/job',
            controller: 'JobsCtrl',
            activetab: 'job',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('match', {
            parent: 'principal',
            url: '/match',
            templateUrl: 'partials/match',
            controller: 'JobsCtrl',
            activetab: 'match',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('metaFeatures', {
            parent: 'principal',
            url: '/metaFeatures',
            templateUrl: 'partials/metaFeatures',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaFeatures',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('metaFeature', {
            parent: 'principal',
            url: '/metaFeature',
            templateUrl: 'partials/showMetaFeature',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaFeature',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('newMetaRelation', {
            parent: 'principal',
            url: '/newMetaRelation',
            templateUrl: 'partials/newMetaRelation',
            controller: 'metaFeaturesCtrl',
            activetab: 'newMetaRelation',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('metaRelation', {
            parent: 'principal',
            url: '/metaRelation',
            templateUrl: 'partials/showMetaRelation',
            controller: 'metaFeaturesCtrl',
            activetab: 'metaRelation',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('frequencyMatrix', {
            parent: 'principal',
            url: '/frequencyMatrix',
            templateUrl: 'partials/frequencyMatrix',
            controller: 'frequencyMatrixCtrl',
            activetab: 'frequencyMatrix',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('candidateMatching', {
            parent: 'principal',
            url: '/candidateMatching',
            templateUrl: 'partials/candidateMatching',
            controller: 'frequencyMatrixCtrl',
            activetab: 'candidateMatching',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('vacancy', {
            parent: 'principal',
            url: '/vacancy',
            templateUrl: 'partials/vacancy',
            controller: 'vacancyCtrl',
            activetab: 'vacancy',
            activetab: 'vacancy',
            data: {
                permissions: {
                    only: ['5', '4', '3'],
                    redirectTo: 'login'
                }
            }
        })
        .state('fuse', {
            parent: 'principal',
            url: '/fuse',
            templateUrl: 'partials/fuse',
            controller: 'fuseController',
            activetab: 'vacancy'
        })
        .state('unfold', {
            parent: 'principal',
            url: '/unfold',
            templateUrl: 'partials/unfold',
            controller: 'unfoldController',
            activetab: 'vacancy'
        });
        
}).
run(function ($rootScope, $state, $transitions) {
    $transitions.onEnter({}, function (transition, state) {
        if (state != undefined && state != null) {
            $rootScope.activeTitle = state.title;
            $rootScope.activetab = state.activetab;
        }
    })

    $transitions.onSuccess({}, function (transition) {
        if ($state.current.data) {
            var permission = false;
            for (var index = 0; index < $state.current.data.permissions.only.length; index++) {
                if ($state.current.data.permissions.only[index] == $rootScope.sesion.role) {
                    permission = true;
                }
            }
            if (!permission) {
                $state.go("login");
            }
        }
    })
});