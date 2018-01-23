angular.module('myApp.candidatesListCtrl', ['ui.bootstrap']).
    controller('candidatesListController', ['$scope', 'candidatesServices', '$location', 'filterFilter', 'Mensaje', '$rootScope', 'Dictionary', function ($scope, candidatesServices, $location, filterFilter, Mensaje, $rootScope, Dictionary) {
    $rootScope.activeId == 'candidateList';
    $scope.lista = {};
    $scope.lista.filtro = "";
    $scope.lista.candidatos = [];

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

    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo) {
        var data = Dictionary.getSynonyms(string, tipo, 'null', function (error, result) {
            if (!error) {
                $scope.data = result.suggested;
            } else {
                Mensaje.Alerta("error", 'Error', '');
                $scope.data = [];
            }
        });

    };
}]);