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
    'permission',
    'pascalprecht.translate',
    'ngCookies'
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
            title: "CANDIDATE",
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
            title: "CANDIDATE_LIST",
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
        });
        
}).
run(function ($rootScope, $state, $transitions, $cookieStore, $translate) {
    var userLang = navigator.languages && navigator.languages[0] ||
        navigator.language ||
        navigator.userLanguage;
    var localeArray = userLang.split(/[\-_]/);
    var lang_code = localeArray[0]

    if ($cookieStore.get("language") != null && $cookieStore.get("language") != "") {
        $rootScope.Language = $cookieStore.get("language")
    } else {
        $rootScope.Language = {}
        $rootScope.Language.lang = lang_code

    }
    $translate.use($rootScope.Language.lang);

    $transitions.onEnter({}, function (transition, state) {
        if (state != undefined && state != null) {
            $rootScope.activeTitle = state.title
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
}).
config(['$translateProvider', function ($translateProvider) {

    $translateProvider
        .translations('es', {
            'VACANCYS': 'Vacantes',
            'VACANCY': 'Vacante',
            'CANDIDATES': 'Candidatos',
            'CANDIDATES2': 'Candidato(s)',
            'CANDIDATE': 'Candidato',
            'EMPLOYERS': 'Empleadores',
            'FEATURE_ENGINEERING': 'Ingeniería de características',
            'DICTIONARIES': 'Diccionarios',
            'METHAFEATURES': 'Metha características',
            'UNRESOLVED': 'Sin resolver',
            'FREQUENCY_MATRICES': 'Matrices de frecuencia',
            'VACANCY_CHARACTERIZATION': 'Caracterización vacantes',
            'JOBS': 'Cargos',
            'CONFIGURATION_MAINTENANCE': 'Ajustes y mantenimiento',
            'USERS': 'Usuarios',
            'SYSTEM_PARAMETERS': 'Parametros del sistema',
            'SEARCH': 'Buscar',
            'LOG_OFF': 'Cerrar sesión',
            'HOME': 'Inicio',
            'CANDIDATE_LIST': 'Lista de candidatos',
            'CLOSE': 'Cerrar',
            'USE_SEARCH': 'Usa la búsqueda para encontrar candidatos. Puede buscar por: nombre, dirección, teléfono o usa la búsqueda avanzada.',
            'WHO_SEARCH': '¿A quién estás buscando?',
            'FILTER': 'Filtrar',
            'CLEAR_FILTER': 'Limpiar filtro',
            'NEW_CANDIDATE': 'Crear candidato',
            'COUNTRY': 'País',
            'STATUS': 'Estatus',
            'SELECT': 'Seleccione',
            'SKILL': 'Habilidad',
            'JOB_FUNCTION': 'Puesto/Función',
            'JOB': 'Cargo',
            'FILTERS': 'Filtros',
            'NAME': 'Nombre',
            'ASSIGNED': 'Asignado',
            'SELECTION_PROCESS': 'En proceso de selección',
            'AVAILABLE': 'Disponible',
            'UNAVAILABLE': 'No disponible',
            'IDENTIFICATION_NUMBER': 'Nº Identificación',
            'TELEPHONE': 'Teléfono',
            'EMAIL': 'E-mail',
            'NEXT': 'Siguiente',
            'PREVIOUS': 'Anterior',
            'CANDIDATE_FILE': 'Ficha del candidato',
            'IMPORT_CV': 'Importar currículum',
            'FULL_NAME': 'Nombre Completo',
            'GENDER': 'Genero',
            'MALE': 'Hombre',
            'FEMALE': 'Mujer',
            'ADDRESS': 'Dirección',
            'CITY': 'Población',
            'POSTAL_CODE': 'Código postal',
            'BIRTHDATE': 'Fecha de nacimiento',
            'SAVE': 'Guardar',
            'ADDITIONAL_INFO': 'Información Adicional',
            'NO_EDIT_INFO': 'Esta información no se puede editar',
            'GPS_COORDINATES': 'Coordenadas GPS',
            'LONG': 'Long',
            'LAT': 'Lat',
            'SINCE': 'Desde',
            'LAST_UPDATE': 'Última Actualización',
            'AGE': 'Edad',
            'GRADE': 'Grado',
            'Job Function': 'Funciones del cargo',
            'Educational center': 'Centro educativo',
            'Employer': 'Empleadores',
            'Language': 'Idiomas',
            'Skill': 'Habilidades',
            'Studies': 'Estudios',
            'Certificate': 'Certificados',
            'Psychological Characteristics': 'Características psicológicas',
            'POSTULATED_JOBS': 'Cargos a los que se ha postulado',
            'SCORE': 'Puntaje',
            'ADD': 'Agregar',
            'EDUCATION': 'Estudio',
            'BASIC': 'Básico',
            'BACHELOR': 'Bachillerato',
            'JOB_TRAINING': 'Form. Profesional',
            'DEGREE': 'Licenciatura',
        })
        .translations('en', {
            'VACANCYS': 'Vacancies',
            'VACANCY': 'Vacancy',
            'CANDIDATES': 'Candidates',
            'CANDIDATES2': 'Candidate(s)',
            'CANDIDATE': 'Candidate',
            'EMPLOYERS': 'Employers',
            'FEATURE_ENGINEERING': 'Feature engineering',
            'DICTIONARIES': 'Dictionaries',
            'METHAFEATURES': 'Metha features',
            'UNRESOLVED': 'Un resolved',
            'FREQUENCY_MATRICES': 'Frequency matrices',
            'VACANCY_CHARACTERIZATION': 'Vacancy characterization',
            'JOBS': 'Jobs',
            'CONFIGURATION_MAINTENANCE': 'Configuration and maintenance',
            'USERS': 'Users',
            'SYSTEM_PARAMETERS': 'System parameters',
            'SEARCH': 'Search',
            'LOG_OFF': 'Log out',
            'HOME': 'Home',
            'CANDIDATE_LIST': 'Candidates list',
            'CLOSE': 'Close',
            'USE_SEARCH': 'Use the search to find candidates. You can search by: name, address, phone or use the advanced search.',
            'WHO_SEARCH': 'Who are you looking for?',
            'FILTER': 'Filter',
            'CLEAR_FILTER': 'Clear filter',
            'NEW_CANDIDATE': 'New candidate',
            'COUNTRY': 'Country',
            'STATUS': 'Status',
            'SELECT': 'Select',
            'SKILL': 'Skill',
            'JOB_FUNCTION': 'Job/Function',
            'JOB': 'Job',
            'FILTERS': 'Filters',
            'NAME': 'Name',
            'ASSIGNED': 'Assigned',
            'SELECTION_PROCESS': 'In selection process',
            'AVAILABLE': 'Available',
            'UNAVAILABLE': 'Unavailable',
            'IDENTIFICATION_NUMBER': 'Identification',
            'TELEPHONE': 'Telephone',
            'EMAIL': 'E-mail',
            'NEXT': 'Next',
            'PREVIOUS': 'Previous',
            'CANDIDATE_FILE': 'Candidate\'s file',
            'IMPORT_CV': 'Import curriculum',
            'FULL_NAME': 'Full name',
            'GENDER': 'Gender',
            'MALE': 'Male',
            'FEMALE': 'Female',
            'ADDRESS': 'Address',
            'CITY': 'City',
            'POSTAL_CODE': 'Postal code',
            'BIRTHDATE': 'Birthdate',
            'SAVE': 'Save',
            'ADDITIONAL_INFO': 'Additional info',
            'NO_EDIT_INFO': 'This information can not be edited',
            'GPS_COORDINATES': 'GPS coordinates',
            'LONG': 'Long',
            'LAT': 'Lat',
            'SINCE': 'Since',
            'LAST_UPDATE': 'Last update',
            'AGE': 'Age',
            'GRADE': 'Grade',
            'Job Function': 'Job Function',
            'Educational center': 'Educational center',
            'Employer': 'Employer',
            'Language': 'Language',
            'Skill': 'Skill',
            'Studies': 'Studies',
            'Certificate': 'Certificate',
            'Psychological Characteristics': 'Psychological Characteristics',
            'POSTULATED_JOBS': 'Postulated jobs',
            'SCORE': 'Score',
            'ADD': 'Add',
            'EDUCATION': 'Education',
            'BASIC': 'Basic',
            'BACHELOR': 'Bachelor\'s degree',
            'JOB_TRAINING': 'Job training',
            'DEGREE': 'Degree',
        })
        .preferredLanguage('es')
}]);