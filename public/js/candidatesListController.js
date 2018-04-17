angular.module('myApp.candidatesListCtrl', ['ui.bootstrap', 'ngCookies']).
controller('candidatesListController', ['$scope', 'candidatesServices', '$state', 'Mensaje', '$rootScope', 'Dictionary', '$parse', '$timeout', 'keepData', 'userService', function ($scope, candidatesServices, $state, Mensaje, $rootScope, Dictionary, $parse, $timeout, keepData, userService) {
    $scope.lista = {};
    $scope.lista.candidatos = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;


    $scope.Dato = {};

    $scope.variablesGlobales = {};
    $scope.variablesGlobales.estados = [{
        value: "A",
        label: "ASSIGNED"
    }, {
        value: "P",
        label: "SELECTION_PROCESS"
    }, {
        value: "F",
        label: "AVAILABLE"
    }, {
        value: "N",
        label: "UNAVAILABLE"
    }];



    $scope.buscarDetalle = function (id) {
        $state.go('detail', {
            "id": id
        });
    };

    $scope.crearNuevo = function () {
        $state.go('detail', {
            "id": null
        });
    };

    $scope.advSearch = function (name, country, status, skill, jobFunction, jobs, page, itemsPerPage) {
        Mensaje.Esperar();
        candidatesServices.advSearch(String(name), String(country), String(status), String(skill), String(jobFunction), String(jobs), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.candidatos = result.data.candidates;
                $scope.lista.cantidad = result.data.total;
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);


                $scope.Dato.namePaginado = name;
                $scope.Dato.countryPaginado = country;
                $scope.Dato.statusPaginado = status;
                $scope.Dato.skillPaginado = skill;
                $scope.Dato.jobFunctionPaginado = jobFunction;
                $scope.Dato.jobsPaginado = jobs;
                keepData.set('filtroCandidato', $scope.Dato);
            } else {
                $scope.lista.candidatos = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }


    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.Dato.countryPaginado, $scope.Dato.statusPaginado, $scope.Dato.skillPaginado, $scope.Dato.jobFunctionPaginado, $scope.Dato.jobsPaginado, $scope.lista.currentPage, 12);
    };

    Mensaje.Esperar();
    userService.getPortfolio("", function (result) {
        Mensaje.Desocupar();
        if (!result.error) {
            $rootScope.sesion.portFolios = result.data
            if ($rootScope.sesion.portFolio == "" && result.data.length > 0) {
                $rootScope.sesion.portFolio = result.data[0].id                
            }
            var datosCookies = $rootScope.filtroCandidato;
            if (datosCookies != null && datosCookies != undefined) {
                var datos = datosCookies;
                //$scope.busquedaAvanzada = true;
                $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";
                $scope.Dato.countryPaginado = datos.countryPaginado != undefined ? datos.countryPaginado : "";
                $scope.Dato.statusPaginado = datos.statusPaginado != undefined ? datos.statusPaginado : "";
                $scope.Dato.skillPaginado = datos.skillPaginado != undefined ? datos.skillPaginado : "";
                $scope.Dato.jobFunctionPaginado = datos.jobFunctionPaginado != undefined ? datos.jobFunctionPaginado : "";
                $scope.Dato.jobsPaginado = datos.jobsPaginado != undefined ? datos.jobsPaginado : "";

                $scope.Dato.name = $scope.Dato.namePaginado;
                $scope.Dato.country = $scope.Dato.countryPaginado;
                $scope.Dato.status = $scope.Dato.statusPaginado;
                $scope.Dato.skill = $scope.Dato.skillPaginado;
                $scope.Dato.jobFunction = $scope.Dato.jobFunctionPaginado;
                $scope.Dato.job = $scope.Dato.jobsPaginado;
                $scope.pagination();
            } else {
                $scope.advSearch("", "", "", "", "", "", 1, 12);
            }
        } else {
            Mensaje.Alerta("error", 'Error', result.message);
        }
    });


    $scope.clearFilter = function () {
        $scope.Dato.name = "";
        $scope.Dato.country = "";
        $scope.Dato.status = "";
        $scope.Dato.skill = "";
        $scope.Dato.jobFunction = "";
        $scope.Dato.job = "";
        $scope.busquedaAvanzada = false;
        $scope.advSearch("", "", "", "", "", "", 1, 12);
    };

    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos) {
        var model = $parse(datos);
        var data = Dictionary.getSynonyms(string, tipo, 'null', function (error, result) {
            if (!error) {
                console.log(result)
                if (result.suggested) {
                    //$scope.data = [result.primary];
                    model.assign($scope, result.suggested);
                } else {
                    //$scope.data = result.suggested;

                    model.assign($scope, [result.primary]);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                //$scope.data = [];
                model.assign($scope, []);
            }
        });
    };

    $scope.uploadFile = function (files) {
        Mensaje.Esperar("UPLOADING_CV");
        var fd = new FormData();
        fd.append("file", files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFile(files[0], function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.buscarDetalle(result.data.id);
                } else {
                    Mensaje.Alerta("Error", "Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
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
}]);