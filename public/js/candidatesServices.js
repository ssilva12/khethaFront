angular.module('myApp.candidatesServices', [])
    .factory('candidatesServices', ['$http', 'URL', function ($http, URL) {

        var candidatesServices = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        candidatesServices.uploadFile = function (file, callback) {
            var fd = new FormData();
            fd.append('curriculum', file);
            var uploadUrl = URL.URL_REST_SERVICE + 'uploadCv';
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'getCandidates).';
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
                Result.status = response.status;
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
                Result.data = response.data;
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
                Result.status = response.status;
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
                Result.data = response.data;
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
                Result.status = response.status;
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
                Result.data = response.data;
                callback(Result);
            });
        };

        candidatesServices.createCandidate = function (usuario, callback) {
            $http({
                method: 'POST',
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
                Result.status = response.status;
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
                Result.data = response.data;
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
                Result.status = response.status;
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
                Result.data = response.data;
                callback(Result);
            });
        };

        candidatesServices.createFeature = function (candidateId, feature, callback) {
            $http({
                method: 'POST',
                data: {
                    featureInfo: feature,
                    candidateId: candidateId
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
                Result.status = response.status;
                switch (status) {
                    case 404:
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'feature).';
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

        candidatesServices.advSearch = function (name, country, status, skill, jobFunction, jobs, page, itemsPerPage, callback) {
            $http({
                method: 'GET',
                params: {
                    name: name,
                    country: country,
                    status: status,
                    skill: skill,
                    jobFunction: jobFunction,
                    jobs: jobs,
                    page: page,
                    itemsPerPage: itemsPerPage
                },
                url: URL.URL_REST_SERVICE + 'paginatedSearch'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'getCandidates).';
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

        return candidatesServices;
    }]);