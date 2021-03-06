angular.module('myApp.candidatesServices', [])
    .factory('candidatesServices', ['$http', 'URL', 'request', '$rootScope', '$cookieStore', function ($http, URL, request, $rootScope, $cookieStore) {

        var candidatesServices = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        candidatesServices.uploadFile = function (file, paisCV, jobCV, callback) {
            var fd = new FormData();
            fd.append('curriculum', file);
            fd.append('portFolio', $rootScope.sesion.portFolio);
            fd.append('countryCV', paisCV);
            fd.append('jobCV', jobCV);
            var uploadUrl = URL.URL_REST_SERVICE + 'api/candidate/uploadCV';
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined,
                    'Authorization': $cookieStore.get("sesion")
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

        candidatesServices.uploadFormat = function (file, callback) {
            var fd = new FormData();
            fd.append('format', file);
            var uploadUrl = URL.URL_REST_SERVICE + 'api/format/uploadFormat';
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
            var config = {
                method: 'GET',
                url: URL.URL_REST_SERVICE + 'getCandidates'
            }
            request.send(config, callback);
        };

        candidatesServices.getById = function (id, callback) {
            var config = {
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'candidate'

            }
            request.send(config, callback);
        };

        candidatesServices.updateInformation = function (usuario, callback) {
            var config = {
                method: 'PUT',
                data: {
                    candidateInfo: usuario.candidateInfo
                },
                url: URL.URL_REST_SERVICE + 'candidate',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.createCandidate = function (usuario, callback) {
            var config = {
                method: 'POST',
                data: {
                    candidateInfo: usuario.candidateInfo,
                    portFolio: $rootScope.sesion.portFolio
                },
                url: URL.URL_REST_SERVICE + 'candidate',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.assignCNDtoJOB = function (candidateId, job, callback) {
            var config = {
                method: 'POST',
                data: {
                    candidateId: candidateId,
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/cndRelatedJob',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.removeCNDtoJOB = function (candidateId, job, callback) {
            var config = {
                method: 'POST',
                data: {
                    candidateId: candidateId,
                    job: job
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/removeCndRelatedJob',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.updateFeature = function (feature, callback) {
            var config = {
                method: 'PUT',
                data: {
                    featureInfo: feature
                },
                url: URL.URL_REST_SERVICE + 'feature',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.createFeature = function (candidateId, feature, callback) {
            var config = {
                method: 'POST',
                data: {
                    featureInfo: feature,
                    candidateId: candidateId
                },
                url: URL.URL_REST_SERVICE + 'feature',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.advSearch = function (name, country, status, skill, jobFunction, jobs, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    country: country,
                    status: status,
                    skill: skill,
                    jobFunction: jobFunction,
                    jobs: jobs,
                    page: page,
                    itemsPerPage: itemsPerPage,
                    portFolio: $rootScope.sesion.portFolio
                },
                url: URL.URL_REST_SERVICE + 'paginatedSearch'
            }
            request.send(config, callback);
        };

        candidatesServices.advSearchDocuments = function (name, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    page: page,
                    itemsPerPage: itemsPerPage,
                    portFolio: $rootScope.sesion.portFolio
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/paginatedSearchDocuments'
            }
            request.send(config, callback);
        };

        candidatesServices.getDocument = function (id, callback) {
            var config = {
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/document'
            }
            request.send(config, callback);
        };

        candidatesServices.getVacancyInfo = function (vacancyId, candidateId, callback) {
            var config = {
                method: 'GET',
                params: {
                    jobVacancy: vacancyId,
                    candidate: candidateId
                },
                url: URL.URL_REST_SERVICE + 'api/vacancy/candidate-match',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.createByCV = function (idDoc, countryCV, jobCV, callback) {
            var config = {
                method: 'POST',
                data: {
                    idDoc: idDoc,
                    portFolio: $rootScope.sesion.portFolio,
                    countryCV: (countryCV == null || countryCV == undefined ? "" : countryCV),
                    jobCV: (jobCV == null || jobCV == undefined ? "" : jobCV)
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/createByCV',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        candidatesServices.updateByCV = function (candidateId, idDoc, countryCV, jobCV, callback) {
            var config = {
                method: 'POST',
                data: {
                    candidateId: candidateId,
                    idDoc: idDoc,
                    portFolio: $rootScope.sesion.portFolio,
                    countryCV: (countryCV == null || countryCV == undefined ? "" : countryCV),
                    jobCV: (jobCV == null || jobCV == undefined ? "" : jobCV)
                },
                url: URL.URL_REST_SERVICE + 'api/candidate/updateByCV',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        return candidatesServices;
    }]);