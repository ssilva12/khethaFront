angular.module('myApp.userService', [])
    .factory('userService', ['request', 'URL', function (request, URL) {
        var userService = {};

        userService.advSearch = function (name, portFolio, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    portFolio: portFolio,
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

        userService.createUser = function (user, createPortfolio, callback) {
            var config = {
                method: 'POST',
                data: {
                    user: user,
                    createPortfolio: createPortfolio
                },
                url: URL.URL_REST_SERVICE + 'api/user/createUser',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        userService.updateInformation = function (user, createPortfolio, callback) {
            var config = {
                method: 'PUT',
                data: {
                    user: user,
                    createPortfolio: createPortfolio
                },
                url: URL.URL_REST_SERVICE + 'api/user/updateUser',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        userService.getPortfolio = function (name, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name
                },
                url: URL.URL_REST_SERVICE + 'api/user/portfolio'
            }
            request.send(config, callback);
        };

        return userService;

    }]);