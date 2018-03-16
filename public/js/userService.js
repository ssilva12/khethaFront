angular.module('myApp.userService', [])
    .factory('userService', ['request', 'URL', function (request, URL) {
        var userService = {};

        userService.advSearch = function (name, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'api/user/paginatedUserSearch'
            }
            request.send(config, callback);
        };

        userService.getById = function (userId, callback) {
            var config = {
                method: 'GET',
                params: {
                    userId: userId
                },
                url: URL.URL_REST_SERVICE + 'api/user/user'
            }
            request.send(config, callback);
        };

        userService.createUser = function (user, callback) {
            var config = {
                method: 'POST',
                data: {
                    user: user
                },
                url: URL.URL_REST_SERVICE + 'api/user/createUser',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        userService.updateInformation = function (user, callback) {
            var config = {
                method: 'PUT',
                data: {
                    user: user
                },
                url: URL.URL_REST_SERVICE + 'api/user/user',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return userService;

    }]);