angular.module('myApp.jobService', [])
    .factory('jobService', ['$http', 'URL', function ($http, URL) {
        var jobService = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        jobService.advSearch = function (name, page, itemsPerPage, callback) {
            $http({
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'paginatedJobSearch'
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'paginatedJobSearch).';
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

        jobService.getById = function (id, callback) {
            $http({
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'job'
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'job).';
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

        jobService.createJob = function (job, callback) {
            $http({
                method: 'POST',
                data: {
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'job',
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'job).';
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

        jobService.updateInformation = function (job, callback) {
            $http({
                method: 'PUT',
                data: {
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'job',
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'job).';
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

        return jobService;

    }]);