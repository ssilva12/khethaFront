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
    .factory('vacancyService', ['request', 'URL', '$rootScope', function (request, URL, $rootScope) {

        var vacancyService = {};

        vacancyService.createVacancy = function (employerId, jobId, callback) {
            var config = {
                method: 'POST',
                data: {
                    employerId: employerId,
                    jobId: jobId,
                    portFolio: $rootScope.sesion.portFolio
                },
                url: URL.URL_REST_SERVICE + 'vacancy',
                contentType: "application/json"
            }
            request.send(config, callback);
        }

        vacancyService.updateInformation = function (vacancy, callback) {
            var config = {
                method: 'PUT',
                data: {
                    vacancy: vacancy
                },
                url: URL.URL_REST_SERVICE + 'vacancy',
                contentType: "application/json"
            }
            request.send(config, callback);
        };

        vacancyService.getById = function (id, callback) {
            var config = {
                method: 'GET',
                params: {
                    id: id
                },
                url: URL.URL_REST_SERVICE + 'vacancy'
            }
            request.send(config, callback);
        }

        vacancyService.addCandidate = function (candidateId, vacancyId, relationName, callback) {
            var config = {
                method: 'POST',
                params: {
                    vacancyId: vacancyId,
                    candidateId: candidateId,
                    relationName: relationName
                },
                url: URL.URL_REST_SERVICE + 'linkJobVancancyCandidate'
            }
            request.send(config, callback);
        }

        vacancyService.addMultipleCandidate = function (candidateIds, vacancyId, relationName, callback) {
            var config = {
                method: 'POST',
                data: {
                    vacancyId: vacancyId,
                    candidateId: candidateIds,
                    relationName: relationName
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'linkJobVancancyMultipleCandidate'
            }
            request.send(config, callback);
        }

        vacancyService.removeMultipleCandidate = function (candidateIds, vacancyId, relationName, callback) {
            var config = {
                method: 'POST',
                data: {
                    vacancyId: vacancyId,
                    candidateId: candidateIds,
                    relationName: relationName
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'unBindJobVancancyMultipleCandidate'
            }
            request.send(config, callback);
        }

        vacancyService.advSearch = function (name, employer, job, status, analist, country, fromDate, toDate, page, itemsPerPage, callback) {
            var config = {
                method: 'GET',
                params: {
                    name: name,
                    employer: employer,
                    job: job,
                    status: status,
                    analyst: analist,
                    country: country,
                    fromDate: fromDate,
                    toDate: toDate,
                    page: page,
                    itemsPerPage: itemsPerPage,
                    portFolio: $rootScope.sesion.portFolio
                },
                url: URL.URL_REST_SERVICE + 'paginatedVacanciesSearch'
            }
            request.send(config, callback);
        };

        vacancyService.getMethaFeatures = function (employer, job, jobVacancy, referenceYear, yearsBack, callback) {
            var config = {
                method: 'GET',
                params: {
                    employer: employer,
                    job: job,
                    jobVacancy: jobVacancy,
                    referenceYear: referenceYear,
                    yearsBack: yearsBack
                },
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/'
            }
            request.send(config, callback);
        }

        vacancyService.calculateFrequencyMatrix = function (employer, job, jobVacancy, referenceYear, yearsBack, callback) {
            var config = {
                method: 'GET',
                params: {
                    employer: employer,
                    job: job,
                    jobVacancy: jobVacancy,
                    referenceYear: referenceYear,
                    yearsBack: yearsBack
                },
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/calculate'
            }
            request.send(config, callback);
        }

        vacancyService.getMethaFeaturesJobLastVacancy = function (employer, job, minPercentage, callback) {
            var config = {
                method: 'GET',
                params: {
                    employer: employer,
                    job: job,
                    minPercentage: minPercentage
                },
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/job-lastvacancy'
            }
            request.send(config, callback);
        }

        vacancyService.getJobs = function (employerId, callback) {
            var config = {
                method: 'GET',
                params: {
                    employerId: employerId
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/job/all/'
            }
            request.send(config, callback);
        }

        vacancyService.getEmployers = function (callback) {
            var config = {
                method: 'GET',
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/employer/all/'
            }
            request.send(config, callback);
        }

        vacancyService.getVacancies = function (employerId, jobId, callback) {
            var config = {
                method: 'GET',
                params: {
                    employerId: employerId,
                    jobId: jobId,
                    portFolio: $rootScope.sesion.portFolio
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/vacancy/all/'
            }
            request.send(config, callback);
        }

        vacancyService.setFeatureWeight = function (entityId, methaFeatureId, methaRelationId, featureId, featureType, nameId, weight, callback) {
            var config = {
                method: 'GET',
                params: {
                    entityId: entityId,
                    methaFeatureId: methaFeatureId,
                    methaRelationId: methaRelationId,
                    featureId: featureId,
                    featureType: featureType,
                    nameId: nameId,
                    weight: weight
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-weight/'
            }
            request.send(config, callback);
        }

        vacancyService.setWeight = function (methaFeatureId, vacancyId, weight, callback) {
            var config = {
                method: 'POST',
                data: {
                    methaFeatureId: methaFeatureId,
                    vacancyId: vacancyId,
                    weight: weight
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/setWeight'
            }
            request.send(config, callback);
        }

        vacancyService.changeMandatory = function (nounId, vacancyId, option, callback) {
            var config = {
                method: 'POST',
                data: {
                    nounId: nounId,
                    vacancyId: vacancyId,
                    option: option
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/changeMandatory'
            }
            request.send(config, callback);
        }

        vacancyService.getFeatureNames = function (dictionary, callback) {
            var config = {
                method: 'GET',
                params: {
                    dictionary: dictionary
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-names/'
            }
            request.send(config, callback);
        }

        vacancyService.addFeature = function (entityId, methaFeatureId, methaRelationId, featureType, nameId, callback) {
            var config = {
                method: 'GET',
                params: {
                    entityId: entityId,
                    methaFeatureId: methaFeatureId,
                    methaRelationId: methaRelationId,
                    featureType: featureType,
                    nameId: nameId
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-add/'
            }
            request.send(config, callback);
        }

        vacancyService.setFeatureDiscarded = function (entityId, methaFeatureId, featureId, featureType, nameId, discarded, callback) {
            var config = {
                method: 'GET',
                params: {
                    entityId: entityId,
                    methaFeatureId: methaFeatureId,
                    featureId: featureId,
                    featureType: featureType,
                    nameId: nameId,
                    discarded: discarded
                },
                contentType: "application/json",
                url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-discarded/'
            }
            request.send(config, callback);
        }

        vacancyService.getCandidatesScore = function (jobVacancy, callback) {
            var config = {
                method: 'GET',
                params: {
                    jobVacancy: jobVacancy
                },
                url: URL.URL_REST_SERVICE + 'api/vacancy/all-candidates-match'
            }
            request.send(config, callback);
        }

        vacancyService.getSuggesteds = function (idVacancy, callback) {
            var config = {
                method: 'GET',
                params: {
                    jobVacancy: idVacancy
                },
                url: URL.URL_REST_SERVICE + 'api/vacancy/candidate-filter'
            }
            request.send(config, callback);
        }

        return vacancyService;
    }]);