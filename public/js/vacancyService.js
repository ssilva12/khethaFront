angular.module('myApp.vacancyService', []).
value('version', '0.2')
    .service('Vacancy', ['$http', 'URL', function ($http, URL) {

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        this.getVacancies = function (callback) {
            $http({
                method: 'GET',
                url: URL.URL_REST_SERVICE + 'getVacancies'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'getVacancies).';
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
        this.getCandidates = function (callback) {
            $http({
                method: 'GET',
                url: URL.URL_REST_SERVICE + 'getCandidates'
            }).
            then(function onSuccess(response) {
                callback(null, response.data);
            }, function onError(response) {
                callback("Error");
            });
        }
        this.createVancancyCandidateRelation = function (vacancyId, candidateId, relationName, callback) {
            $http({
                method: 'POST',
                url: URL.URL_REST_SERVICE + 'linkJobVancancyCandidate',
                params: {
                    vacancyId: vacancyId,
                    candidateId: candidateId,
                    relationName: relationName
                },
            }).
            then(function onSuccess(response) {
                callback(null, response.data);
            }, function onError(response) {
                callback("Error");
            });
        }
        this.getRelations = function (vacancyId, candidateId, callback) {
            $http({
                method: 'GET',
                url: URL.URL_REST_SERVICE + 'getRelations',
                params: {
                    vacancyId: vacancyId,
                    candidateId: candidateId
                },
            }).
            then(function onSuccess(response) {
                callback(null, response.data);
            }, function onError(response) {
                callback("Error");
            });
        }
    }])
    .factory('vacancyService', ['$http', 'URL', function ($http, URL) {

        var vacancyService = {};

        var Result = {};
        Result.error = false;
        Result.status = null;
        Result.message = "";
        Result.data = null;

        vacancyService.createVacancy = function (employerId, jobId, callback) {
            $http({
                method: 'POST',
                data: {
                    employerId: employerId,
                    jobId: jobId
                },
                url: URL.URL_REST_SERVICE + 'vacancy'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'vacancy).';
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

        vacancyService.updateInformation = function (vacancy, callback) {
            $http({
                method: 'PUT',
                data: {
                    vacancy: vacancy
                },
                url: URL.URL_REST_SERVICE + 'vacancy',
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
                            Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'vacancy).';
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

        vacancyService.getById = function (id, callback) {
            $http({
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'vacancy'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'vacancy).';
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

        vacancyService.addCandidate = function (candidateId, vacancyId, relationName, callback) {
            $http({
                method: 'POST',
                params: {
                    vacancyId: vacancyId,
                    candidateId: candidateId,
                    relationName: relationName
                },
                url: URL.URL_REST_SERVICE + 'linkJobVancancyCandidate'
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
                        Result.message = "Servicio no encontrado(" + URL.URL_REST_SERVICE + 'linkJobVancancyCandidate).';
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

        return vacancyService;
    }]);