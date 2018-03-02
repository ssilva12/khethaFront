angular.module('myApp.employerService', [])
    .factory('employerService', ['request', 'URL', function (request, URL) {
        var employerService = {};

        employerService.advSearch = function (name, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'paginatedEmployerSearch'
            }
            request.send(config, callback);
        };

        employerService.getById = function (id, callback) {
            var config = {
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'employer'
            }
            request.send(config, callback);
        };

        employerService.createEmployer = function (employer, callback) {
            var config = {
                method: 'POST',
                data: {
                    employer: employer
                },
                url: URL.URL_REST_SERVICE + 'employer',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        employerService.updateInformation = function (employer, callback) {
            var config = {
                method: 'PUT',
                data: {
                    employer: employer
                },
                url: URL.URL_REST_SERVICE + 'employer',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return employerService;

    }]);