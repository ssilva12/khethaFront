angular.module('myApp.loginCtrl', []).
controller('loginController', ['$location', 'AuthenticationService', function ($location, AuthenticationService) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(username, password, callback) {
        callback(true);
        // $http.post('/api/authenticate', {
        //         username: username,
        //         password: password
        //     })
        //     .success(function (response) {
        //         if (response.token) {
        //             $localStorage.currentUser = {
        //                 username: username,
        //                 token: response.token
        //             };
        //             $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
        //             callback(true);
        //         } else {
        //             callback(false);
        //         }
        //     });
    }

    function Logout() {
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}]);