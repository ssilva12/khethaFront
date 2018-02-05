angular.module('myApp.candidatesListCtrl', ['ui.bootstrap']).
controller('candidatesListController', ['$scope', 'candidatesServices', '$location', 'filterFilter', 'Mensaje', '$rootScope', 'Dictionary', '$parse', '$timeout', function ($scope, candidatesServices, $location, filterFilter, Mensaje, $rootScope, Dictionary, $parse, $timeout) {

    $rootScope.activeId == 'candidateList';
    $scope.lista = {};
    $scope.lista.filtro = "";
    $scope.lista.candidatos = [];
    $scope.Dato = {};

    var allData = candidatesServices.getAll(function (result) {
        if (!result.error) {
            $scope.lista.candidatos = result.data.candidates;
            $scope.lista.cantidad = " (" + result.data.candidates.length + " candidatos)";

            $scope.search = {
                name: $scope.lista.filtro
            };

            $scope.resetFilters = function () {
                $scope.lista.filtro = "";
                $scope.search = {
                    name: $scope.lista.filtro
                };
            };

            // pagination controls
            $scope.currentPage = 1;
            $scope.totalItems = $scope.lista.candidatos.length;
            $scope.entryLimit = 12; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.lista.candidatos, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);
        } else {
            Mensaje.Alerta("error", 'Error', result.message);
        }
    });

    $scope.buscarDetalle = function (id) {
        $location.path('/detail/' + id);
    };

    $scope.crearNuevo = function () {
        $location.path('/detail/');
    };

    $scope.people = [];
    $scope.localSearch = function (str) {
        var matches = [];
        var data = Dictionary.getSynonyms(str, 'null', 'null', function (error, result) {
            if (!error) {
                if (result.prymary) {
                    $scope.people = [result.primary];
                    console.log($scope.people)
                } else {
                    $scope.people = result.suggested;
                    console.log($scope.people)
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                $scope.people = [];
                console.log("aqui")
            }
        });
    };

    $scope.advSearch = function (country, status, skill, jobFunction, jobs) {
        candidatesServices.advSearch(String(country), String(status), String(skill), String(jobFunction), String(jobs), function (result) {
            if (!result.error) {
                $scope.lista.candidatos = result.data.candidates;
                $scope.lista.cantidad = " (" + result.data.candidates.length + " candidatos)";

                $scope.search = {
                    name: $scope.lista.filtro
                };

                $scope.resetFilters = function () {
                    $scope.lista.filtro = "";
                    $scope.search = {
                        name: $scope.lista.filtro
                    };
                };

                // pagination controls
                $scope.currentPage = 1;
                $scope.totalItems = $scope.lista.candidatos.length;
                $scope.entryLimit = 12; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.lista.candidatos = result.data.candidates;
            } else {
                $scope.lista.candidatos = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos) {
        var model = $parse(datos);
        var data = Dictionary.getSynonyms(string, tipo, 'null', function (error, result) {
            if (!error) {
                console.log(result)
                if (result.suggested) {
                    console.log("como primario")
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
        var fd = new FormData();
        fd.append("file", files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFile(files[0]);

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