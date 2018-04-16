angular.module('myApp.userListCtrl', ['ui.bootstrap']).
controller('userListController', ['$scope', '$state', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'userService', 'keepData', '$timeout', function ($scope, $state, Mensaje, $rootScope, Dictionary, $parse, userService, keepData, $timeout) {
    $scope.lista = {};
    $scope.lista.users = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
    $scope.Dato = {};

    $scope.advSearch = function (name, page, itemsPerPage) {
        Mensaje.Esperar();
        userService.advSearch(String(name), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.users = result.data.users;
                $scope.lista.cantidad = result.data.total;
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);

                $scope.Dato.namePaginado = name;
                keepData.set('filtroUser', $scope.Dato);
            } else {
                $scope.lista.jobs = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.lista.currentPage, 12);
    };

    $scope.buscarDetalle = function (id) {
        $state.go('userDetail', {
            "id": id
        });
    };

    $scope.crearNuevo = function () {
        $state.go('userDetail', {
            "id": null
        });
    };

    $scope.clearFilter = function () {
        $scope.Dato.name = "";
        $scope.advSearch("", 1, 12);
    };

    //INIT
    var init = function () {
        var datosCookies = $rootScope.filtroUser;
        if (datosCookies != null && datosCookies != undefined) {
            var datos = datosCookies;
            $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";

            $scope.Dato.name = $scope.Dato.namePaginado;
            $scope.pagination();
        } else {
            $scope.advSearch("", 1, 12);
        }
    }
    init();
}]);