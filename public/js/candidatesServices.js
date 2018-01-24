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
            then(function onSuccess(response) {
                Result.error = false;
                Result.status = response.status;
                Result.message = "OK";
                Result.data = response.data;
                callback(Result);
            }, function onError(response) {
                Result.error = true;
                Result.status = reponse.status;
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
                Result.data = reponse.data;
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
            then(function onSuccess(response) {
                debugger;
                Result.error = false;
                Result.status = response.status;
                Result.message = "OK";
                Result.data = response.data;
                callback(Result);
            }, function onError(response) {
                Result.error = true;
                Result.status = reponse.status;
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
                Result.data = reponse.data;
                callback(Result);
            });
        };

        candidatesServices.updateInformation = function (usuario, callback) {
            $http({
                method: 'PUT',
                data: {
                    candidateInfo: usuario.candidateInfo
                },
                url: URL.URL_REST_SERVICE + 'candidate',
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
                Result.status = reponse.status;
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
                Result.data = reponse.data;
                callback(Result);
            });
        };

        candidatesServices.updateFeature = function (feature, callback) {
            $http({
                method: 'PUT',
                data: {
                    featureInfo: feature
                },
                url: URL.URL_REST_SERVICE + 'feature',
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
                Result.status = reponse.status;
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
                Result.data = reponse.data;
                callback(Result);
            });
        };

        candidatesServices.advSearch = function(country,status,skill,jobFunction,jobs,callback){
            $http({
                method: 'GET',
                params: {
                    country:country,status:status,skill:skill,jobFunction:jobFunction,jobs:jobs
                },
                url: URL.URL_REST_SERVICE + 'advSearch'
            }).
            then(function onSuccess(response) {
                Result.error = false;
                Result.status = response.status;
                Result.message = "OK";
                Result.data = response.data;
                callback(Result);
            }, function onError(response) {
                Result.error = true;
                Result.status = reponse.status;
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
                Result.data = reponse.data;
                callback(Result);
            });
        }

        return candidatesServices;
    }]);