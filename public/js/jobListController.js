angular.module('myApp.jobListCtrl', ['ui.select']).
    controller('jobListController', ['$scope', 'Mensaje', 'jobService', '$rootScope', '$location', 'keepData', function ($scope, Mensaje, jobService, $rootScope, $location, keepData) {
        $scope.lista = {};
        $scope.lista.jobs = [];
        $scope.lista.currentPage = 1;
        $scope.lista.totalItems = 0;
        $scope.lista.entryLimit = 12;
        $scope.lista.noOfPages = 0;
        $scope.Dato = {};

        $scope.advSearch = function (name, page, itemsPerPage) {
            Mensaje.Esperar();
            jobService.advSearch(String(name), String(page), String(itemsPerPage), function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.lista.jobs = result.data.jobs;
                    $scope.lista.cantidad = " (" + result.data.total + " job(s))";
                    $scope.lista.currentPage = page;
                    $scope.lista.totalItems = result.data.total;
                    $scope.lista.entryLimit = itemsPerPage;
                    $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);

                    $scope.Dato.namePaginado = name;
                    keepData.set('filtroJob', $scope.Dato);
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
            $location.path('/jobDetail/' + id);
        };

        $scope.crearNuevo = function () {
            $location.path('/jobDetail/');
        };

        //INIT
        var datosCookies = $rootScope.filtroJob;
        if (datosCookies != null && datosCookies != undefined) {
            var datos = datosCookies;
            $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";

            $scope.Dato.name = $scope.Dato.namePaginado;
            $scope.pagination();
        } else {
            $scope.advSearch("", 1, 12);
        }
    }]);