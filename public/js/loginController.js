angular.module('myApp.loginCtrl', ['angular-jwt']).
controller('loginController', ['$scope', '$state', 'loginService', 'keepData', 'jwtHelper', '$cookieStore', function ($scope, $state, loginService, keepData, jwtHelper, $cookieStore) {

    $scope.user = {}

    keepData.setCookie("sesion", null);
    loginService.getToken(function (result) {
        if (!result.error) {
            keepData.setCookie("token", result.data);
        } else {
            keepData.setCookie("token", null);
        }
    })

    $scope.login = function () {
        if ($cookieStore.get("token") != null && $cookieStore.get("token") != "") {
            var SHA512 = new Hashes.SHA512
            var token = $cookieStore.get("token");
            var key = SHA512.hex($scope.user.userName + $scope.user.password) + "||" + token

            $scope.user.key = key;
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
        } else {
            $state.go("login");
        }
    }
}]);