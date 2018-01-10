angular.module('myApp.candidatesListCtrl', ['ui.bootstrap', ]).
filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
}).
controller('candidatesListController', ['$scope', 'candidatesServices', '$location', 'filterFilter', 'Mensaje', function ($scope, candidatesServices, $location, filterFilter, Mensaje) {
    $scope.lista = {};
    $scope.lista.filtro = "";
    $scope.lista.candidatos = [];

    var allData = candidatesServices.getAll();
    allData.then(function (result) {
        $scope.lista.candidatos = result.candidates;
        $scope.lista.cantidad = " (" + result.candidates.length + " candidatos)";
        
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
    });

    $scope.buscarDetalle = function (id) {
        $location.path('/detail/' + id);
    };

    $scope.crearNuevo = function () {
        $location.path('/detail/');
    };

}]);