angular.module('myApp.vacancyListCtrl', ['ui.bootstrap']).
controller('vacancyListController', ['$scope', '$state', 'filterFilter', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'vacancyService', 'keepData', '$timeout', 'userService', function ($scope, $state, filterFilter, Mensaje, $rootScope, Dictionary, $parse, vacancyService, keepData, $timeout, userService) {

    $scope.lista = {};
    $scope.lista.vacantes = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
    $scope.Dato = {};
    $scope.variablesGlobales = {};
    $scope.variablesGlobales.estados = [{
        value: "A",
        label: "ASSIGNED_A"
    }, {
        value: "P",
        label: "IN_PROCESS"
    }, {
        value: "C",
        label: "CLOSED"
    }, {
        value: "D",
        label: "CANCELED"
    }, {
        value: "S",
        label: "INFERRED"
    }];

    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos) {
        var model = $parse(datos);
        var data = Dictionary.getSynonyms(string, tipo, 'null', function (error, result) {
            if (!error) {
                console.log(result)
                if (result.suggested) {
                    model.assign($scope, result.suggested);
                } else {
                    model.assign($scope, [result.primary]);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                model.assign($scope, []);
            }
        });
    };

    //EVENTOS AUTOCOMPLETAR
    $scope.onFocus = function (variable, index) {
        $parse(variable + index).assign($scope, true);
    }

    $scope.onBlur = function (variable, index) {
        $timeout(function () {
            $parse(variable + index).assign($scope, false);
        }, 125);
    }

    $scope.crearNuevo = function () {
        $state.go('vacancyDetail', {
            "id": null
        });
    };

    $scope.buscarDetalle = function (id) {
        keepData.set('activeTabVacancy', "tab1");
        $state.go('vacancyDetail', {
            "id": id
        });
    };

    $scope.advSearch = function (name, employer, job, status, analist, country, fromDate, toDate, page, itemsPerPage) {
        Mensaje.Esperar();
        vacancyService.advSearch(String(name), String(employer), String(job), String(status), String(analist), String(country), String(fromDate), String(toDate), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.vacantes = result.data.vacancies;
                $scope.lista.cantidad = result.data.total;
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);


                $scope.Dato.namePaginado = name;
                $scope.Dato.employerPaginado = employer;
                $scope.Dato.jobPaginado = job;
                $scope.Dato.countryPaginado = country;
                $scope.Dato.statusPaginado = status;
                $scope.Dato.analistPaginado = analist;
                $scope.Dato.fromDatePaginado = fromDate;
                $scope.Dato.toDatePaginado = toDate;
                keepData.set('filtroVacantes', $scope.Dato);
            } else {
                $scope.lista.vacantes = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.Dato.employerPaginado, $scope.Dato.jobPaginado, $scope.Dato.statusPaginado, $scope.Dato.analistPaginado, $scope.Dato.countryPaginado, $scope.Dato.fromDatePaginado, $scope.Dato.toDatePaginado, $scope.lista.currentPage, 12);
    };

    Mensaje.Esperar();
    userService.getPortfolio("", function (result) {
        Mensaje.Desocupar();
        if (!result.error) {
            $rootScope.sesion.portFolios = result.data
            if ($rootScope.sesion.portFolio == "" && result.data.length > 0) {
                $rootScope.sesion.portFolio = result.data[0].id
            }
            var datosCookies = $rootScope.filtroVacante;
            if (datosCookies != null && datosCookies != undefined) {
                var datos = datosCookies;
                //$scope.busquedaAvanzada = true;
                $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";
                $scope.Dato.employerPaginado = datos.employerPaginado != undefined ? datos.employerPaginado : "";
                $scope.Dato.jobPaginado = datos.jobPaginado != undefined ? datos.jobPaginado : "";
                $scope.Dato.countryPaginado = datos.countryPaginado != undefined ? datos.countryPaginado : "";
                $scope.Dato.statusPaginado = datos.statusPaginado != undefined ? datos.statusPaginado : "";
                $scope.Dato.analistPaginado = datos.analistPaginado != undefined ? datos.analistPaginado : "";
                $scope.Dato.fromDatePaginado = datos.fromDatePaginado != undefined ? datos.fromDatePaginado : "";
                $scope.Dato.toDatePaginado = datos.toDatePaginado != undefined ? datos.toDatePaginado : "";

                $scope.Dato.name = $scope.Dato.namePaginado;
                $scope.Dato.employer = $scope.Dato.employerPaginado;
                $scope.Dato.job = $scope.Dato.jobPaginado;
                $scope.Dato.country = $scope.Dato.countryPaginado;
                $scope.Dato.status = $scope.Dato.statusPaginado;
                $scope.Dato.analist = $scope.Dato.analistPaginado;
                $scope.Dato.fromDate = $scope.Dato.fromDatePaginado;
                $scope.Dato.toDate = $scope.Dato.toDatePaginado;
                $scope.pagination();
            } else {
                var role = $rootScope.sesion.role;
                $scope.Dato.status = "P"
                if (role == "4") {
                    $scope.Dato.analist = $rootScope.sesion.name
                    $scope.advSearch("", "", "", "P", $rootScope.sesion.name, "", "", "", 1, 12);
                } else {
                    $scope.advSearch("", "", "", "P", "", "", "", "", 1, 12);
                }

            }
        } else {
            Mensaje.Alerta("error", 'Error', result.message);
        }
    });

    $scope.clearFilter = function () {
        $scope.Dato.name = "";
        $scope.Dato.employer = "";
        $scope.Dato.job = "";
        $scope.Dato.country = "";
        $scope.Dato.status = "";
        $scope.Dato.analist = "";
        $scope.Dato.fromDate = "";
        $scope.Dato.toDate = "";
        $scope.busquedaAvanzada = false;
        $scope.advSearch("", "", "", "", "", "", "", "", 1, 12);
    };
}]);