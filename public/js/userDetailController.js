angular.module('myApp.userController', ['ui.select', 'ADM-dateTimePicker', 'ui.bootstrap']).
controller('userDetailController', ['$scope', '$rootScope', '$stateParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'userService', '$state', 'keepData', function ($scope, $rootScope, $stateParams, Mensaje, Dictionary, $parse, $timeout, userService, $state, keepData) {

    $scope.cargarUser = function (id) {
        Mensaje.Esperar();
        userService.getById(id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.user = result.data[0];
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    };

    $scope.actualizarUser = function () {
        Mensaje.Esperar("Guardando información");
        if ($scope.user.id != null || $scope.user.id != undefined) {
            userService.updateInformation($scope.user, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarUser($scope.user.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            userService.createUser($scope.user, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarUser($scope.user.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
    };

    //INIT
    var init = function () {
        if ($stateParams.id != null) {
            $scope.cargarUser($stateParams.id);
        } else {

        }
    };
    init();

}]);