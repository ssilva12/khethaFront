angular.module('myApp.loginService', [])
    .factory('loginService', ['request', 'URL', function (request, URL) {
        var loginService = {};        
        
        loginService.login = function (user, callback) {
            var config = {
                method: 'POST',
                data: {
                    user: user
                },
                url: URL.URL_REST_SERVICE + 'login',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return loginService;
    }]);