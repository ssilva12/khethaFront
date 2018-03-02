angular.module('myApp.loginCtrl', []).
controller('loginController', ['$scope', '$state', 'loginService', 'keepData', function ($scope, $state, loginService, keepData) {

    $scope.user = {}

    $scope.login = function () {
        loginService.login($scope.user, function (result) {
            if (!result.error) {
                if (result.data.user.id != null) {
                    keepData.setCookie("sesion", result.data);
                    $state.go('candidateslist');
                } else {
                    $scope.mensaje = "Usuario y/o contraseña invalidos"
                }
            } else {
                //Mensaje.Alerta("error", 'Error', result.message);
            }
        })

    }

}]);