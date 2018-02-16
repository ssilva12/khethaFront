angular.module('myApp.employerListCtrl', ['ui.select', 'ADM-dateTimePicker']).
controller('employerListController', ['$scope', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'employerServices', '$rootScope', function ($scope, Mensaje, Dictionary, $parse, $timeout, employerServices, $rootScope) {
    $scope.lista = {};
    $scope.lista.empleadores = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;

    $scope.advSearch = function (name, page, itemsPerPage) {
        Mensaje.Esperar();
        employerServices.advSearch(String(name), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.empleadores = result.data.employers;
                $scope.lista.cantidad = " (" + result.data.total + " empleador(es))";
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);


                $scope.Dato.namePaginado = name;
                keepData.set('filtroEmpleador', $scope.Dato);
            } else {
                $scope.lista.empleadores = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.lista.currentPage, 12);
    };

    var datosCookies = $rootScope.filtroEmpleador;
    if (datosCookies != null && datosCookies != undefined) {
        var datos = datosCookies;
        $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";

        $scope.Dato.name = $scope.Dato.namePaginado;
        $scope.pagination();
    } else {
        $scope.advSearch("", 1, 12);
    }
}]);