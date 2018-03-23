angular.module('myApp.loginCtrl', ['angular-jwt']).
controller('loginController', ['$scope', '$state', 'loginService', 'keepData', 'jwtHelper', function ($scope, $state, loginService, keepData, jwtHelper) {

    $scope.user = {}

    keepData.setCookie("sesion", null);

    $scope.login = function () {
        var SHA512 = new Hashes.SHA512
        $scope.user.key = SHA512.hex($scope.user.userName + $scope.user.password);
        $scope.user.password = $scope.user.key;

        loginService.login($scope.user, function (result) {
            if (!result.error) {
                var tokenPayload = jwtHelper.decodeToken(result.data);
                if (tokenPayload.userName != null) {
                    keepData.setCookie("sesion", result.data);
                    $state.go('candidateslist');
                } else {
                    $scope.mensaje = "Usuario y/o contraseña invalidos"
                }
            } else {
                $scope.mensaje = result.message;
            }
        })

    }

}]);