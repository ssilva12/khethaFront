angular.module('myApp.employerService', [])
    .factory('employerService', ['$http', 'URL', function ($http, URL) {
        var employerService = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        employerService.advSearch = function (name, page, itemsPerPage, callback) {
            $http({
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'paginatedEmployerSearch'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'paginatedEmployerSearch).';
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

        employerService.getById = function (id, callback) {
            $http({
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'employer'
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'employer).';
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

        employerService.createEmployer = function (employer, callback) {
            $http({
                method: 'POST',
                data: {
                    employer: employer
                },
                url: URL.URL_REST_SERVICE + 'employer',
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'employer).';
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

        employerService.updateInformation = function (employer, callback) {
            $http({
                method: 'PUT',
                data: {
                    employer: employer
                },
                url: URL.URL_REST_SERVICE + 'employer',
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'employer).';
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

        return employerService;

    }]);