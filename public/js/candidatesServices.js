angular.module('myApp.candidatesServices', [])
    .factory('candidatesServices', ['$http', 'URL', function ($http, URL) {

        var candidatesServices = {};
        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        candidatesServices.uploadFile = function (file) {
            var fd = new FormData();
            fd.append('curriculum', file);
            var uploadUrl = URL.URL_REST_SERVICE + 'uploadCv';
            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .success(function () {})
                .error(function () {});
        };

        candidatesServices.getAll = function (callback) {
            $http({
                method: 'GET',
                url: URL.URL_REST_SERVICE + 'getCandidates'
            }).
            success(function (data, status, headers, config) {
                Result.error = false;
                Result.status = status;
                Result.message = "OK";
                Result.data = data;
                callback(Result);
            }).
            error(function (data, status, headers, config) {
                Result.error = true;
                Result.status = status;
                switch (status) {
                    case 404:
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'getCandidates).';
                        break;
                    case 500:
                        Result.message = "Error en el servicio.";
                        break;
                    default:
                        Result.message = "Error.";
                        break;
                }
                Result.data = data;
                callback(Result);
            });
        };

        candidatesServices.getById = function (id, callback) {
            $http({
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'candidate'
            }).
            success(function (data, status, headers, config) {
                Result.error = false;
                Result.status = status;
                Result.message = "OK";
                Result.data = data;
                callback(Result);
            }).
            error(function (data, status, headers, config) {
                Result.error = true;
                Result.status = status;
                switch (status) {
                    case 404:
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'candidate).';
                        break;
                    case 500:
                        Result.message = "Error en el servicio.";
                        break;
                    default:
                        Result.message = "Error.";
                        break;
                }
                Result.data = data;
                callback(Result);
            });
        }

        candidatesServices.updateInformation = function (candidateInfo, callback) {
            $http({
                method: 'GET',
                params: {
                    id: candidateInfo
                },
                url: URL.URL_REST_SERVICE + 'candidate'
            }).
            success(function (data, status, headers, config) {
                Result.error = false;
                Result.status = status;
                Result.message = "OK";
                Result.data = data;
                callback(Result);
            }).
            error(function (data, status, headers, config) {
                Result.error = true;
                Result.status = status;
                switch (status) {
                    case 404:
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'candidate).';
                        break;
                    case 500:
                        Result.message = "Error en el servicio.";
                        break;
                    default:
                        Result.message = "Error.";
                        break;
                }
                Result.data = data;
                callback(Result);
            });
        }

        return candidatesServices;
    }]);