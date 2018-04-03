angular.module('myApp.loginService', [])
    .factory('loginService', ['request', 'URL', '$cookieStore', '$http', function (request, URL, $cookieStore, $http) {
        var loginService = {};
        
        loginService.login = function (user, callback) {
            var Result = {};
            Result.error = false;
            Result.status = null;
            Result.message = "";
            Result.data = null;

            var headers = {
                'Content-Type': "application/json",
                'Token': $cookieStore.get("token"),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            }
            $http({
                method: 'POST',
                data: {
                    user: user
                },
                url: URL.URL_REST_SERVICE + 'login',
                contentType: "application/json",
                headers: headers
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
                switch (response.status) {
                    case 403:
                        Result.message = "No posee acceso";
                        $state.go('login')
                        break;
                    case 404:
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'login' + ').';
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

        loginService.getToken = function (callback) {
            var config = {
                method: 'POST',
                url: URL.URL_REST_SERVICE + 'api/user/getToken',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return loginService;
    }]);