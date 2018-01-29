angular.module('myApp.vacancyListCtrl', ['ui.bootstrap']).
controller('vacancyListController', ['$scope', '$location', 'filterFilter', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'Vacancy', function ($scope, $location, filterFilter, Mensaje, $rootScope, Dictionary, $parse, Vacancy) {

    $scope.lista = {};
    $scope.lista.filtro = "";
    $scope.lista.vacantes = [];

    var allData = Vacancy.getVacancies(function (result) {
        if (!result.error) {
            $scope.lista.vacantes = result.data.vacancies;

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
            $scope.totalItems = $scope.lista.vacantes.length;
            $scope.entryLimit = 20; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

            // $watch search to update pagination
            $scope.$watch('search', function (newVal, oldVal) {
                $scope.filtered = filterFilter($scope.lista.vacantes, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }, true);
        } else {
            Mensaje.Alerta("error", 'Error', result.message);
        }
    });

    $scope.crearNuevo = function () {
        $location.path('/vacancyDetail/');
    };

    $scope.buscarDetalle = function (id) {
        $location.path('/vacancyDetail/' + id);
    };

}]);