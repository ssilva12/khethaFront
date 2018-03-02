angular.module('myApp.jobService', [])
    .factory('jobService', ['request', 'URL', function (request, URL) {
        var jobService = {};

        jobService.advSearch = function (name, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'paginatedJobSearch'
            }
            request.send(config, callback);
        };

        jobService.getById = function (id, callback) {
            var config = {
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'job'
            }
            request.send(config, callback);
        };

        jobService.createJob = function (job, callback) {
            var config = {
                method: 'POST',
                data: {
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'job',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        jobService.updateInformation = function (job, callback) {
            var config = {
                method: 'PUT',
                data: {
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'job',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return jobService;

    }]);