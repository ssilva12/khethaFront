angular.module('myApp.loginService', [])
    .factory('loginService', ['$http', 'URL', function ($http, URL) {
        var loginService = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        loginService.login = function (user, callback) {
            $http({
                method: 'POST',
                data: {
                    user: user
                },
                url: URL.URL_REST_SERVICE + 'login',
                headers: {
                    'Content-Type': "application/json"
                }
            }).
                then(function onSuccess(response) {
                    Result.error = false;
                    Result.status = response.status;
                    Result.message = "OK";
                    Result.data = response.data;
                    callback(Result);
                }, function onError(response) {
                    Result.error = true;
                    Result.status = response.status;
                    switch (status) {
                        case 404:
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'login).';
                            break;
                        case 500:
                            Result.message = "Error en el servicio.";
                            break;
                        default:
                            Result.message = "Error.";
                            break;
                    }
                    Result.data = response.data;
                    callback(Result);
                });
        };

        return loginService;
    }]);