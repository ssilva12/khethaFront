angular.module('myApp.loginCtrl', []).
controller('loginController', ['$scope', '$state', 'loginService', function ($scope, $state, loginService) {

    $scope.user = {}

    $scope.login = function () {
        loginService.login($scope.user, function (result) {
            if (!result.error) {
                $state.go('candidateslist');
            } else {
                //Mensaje.Alerta("error", 'Error', result.message);
            }
        })
        
    }

}]);