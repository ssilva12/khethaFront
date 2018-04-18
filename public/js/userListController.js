angular.module('myApp.userListCtrl', ['ui.bootstrap']).
controller('userListController', ['$scope', '$state', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'userService', 'keepData', '$timeout', function ($scope, $state, Mensaje, $rootScope, Dictionary, $parse, userService, keepData, $timeout) {
    $scope.lista = {};
    $scope.lista.users = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
    $scope.Dato = {};

    $scope.advSearch = function (name, portFolio, page, itemsPerPage) {
        Mensaje.Esperar();
        userService.advSearch(String(name), String(portFolio), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.users = result.data.users;
                $scope.lista.cantidad = result.data.total;
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);

                $scope.Dato.namePaginado = name;
                $scope.Dato.portFolioPaginado = portFolio;
                keepData.set('filtroUser', $scope.Dato);
            } else {
                $scope.lista.jobs = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.Dato.portFolioPaginado, $scope.lista.currentPage, 12);
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
        $scope.advSearch("", "", 1, 12);
    };

    $scope.onFocus = function (variable, index) {
        $parse(variable + index).assign($scope, true);
    }
    $scope.onBlur = function (variable, index) {
        $timeout(function () {
            $parse(variable + index).assign($scope, false);
        }, 125);
    }
    $scope.assign = function (variable, item) {
        var model = $parse(variable);
        var modelSelect = $parse(variable + "Selected");
        model.assign($scope, item.name);
        modelSelect.assign($scope, item);
    }
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos, acronimo, selected) {
        var model = $parse(datos);
        var modelSelect = $parse(selected + "Selected");
        modelSelect.assign($scope, "");
        var data = userService.getPortfolio(string, function (result) {
            if (!result.error) {
                if (result.data) {
                    model.assign($scope, result.data);
                } else {
                    model.assign($scope, []);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                model.assign($scope, []);
            }
        });
    };
    
    //INIT
    var init = function () {
        var datosCookies = $rootScope.filtroUser;
        if (datosCookies != null && datosCookies != undefined) {
            var datos = datosCookies;
            $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";
            $scope.Dato.portFolioPaginado = datos.portFolioPaginado != undefined ? datos.portFolioPaginado : "";

            $scope.Dato.name = $scope.Dato.namePaginado;
            $scope.Dato.portFolio = $scope.Dato.portFolioPaginado;
            $scope.pagination();
        } else {
            $scope.advSearch("", "", 1, 12);
        }
    }
    init();
}]);