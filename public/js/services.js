'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .service('frequencyMatrixService', function($http) {
    var url = "http://localhost:9000/"
    // var url = "http://guarded-atoll-31281.herokuapp.com/"

    this.get = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url + 'api/frequencymatrix/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.getForJobAndLastVacancy = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url + 'api/frequencymatrix/job-lastvacancy',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.getEmployers = (parameters, callback) => {
      console.log('test get employers...');
      $http({
        method: 'GET',
        url: url + 'api/employer/all/',
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log('error');
        console.log(response.status);
        console.log(response.data);
        console.log(response.headers);
        console.log(response.config);
        callback("Error")
      });
    }

    this.getJobs = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url + 'api/job/all/',
        headers: {
          'Access-Control-Allow-Origin': '*', // 'true', // '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        },
        params: parameters // {user_id: user.id}
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.getVacancies = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url + 'api/vacancy/all/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.getFeatureNames = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url+'api/frequencymatrix/feature-names/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.setFeatureWeight = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url + 'api/frequencymatrix/feature-weight/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.getCandidates = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url + 'api/candidate/all/',
        params: parameters,
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log('error');
        console.log(response.status);
        console.log(response.data);
        console.log(response.headers);
        console.log(response.config);
        callback("Error")
      });
    }

    this.addFeature = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url+'api/frequencymatrix/feature-add/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    this.setFeatureDiscarded = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url + 'api/frequencymatrix/feature-discarded/',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

    // Candidate Match
    this.getCandidateMethaFeatures = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url + 'api/frequencymatrix/candidate-match',
        params: parameters
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }

  })
  .service('Dictionary', function ($http) {
    //var url = "http://localhost:9000/"
    var url = "http://guarded-atoll-31281.herokuapp.com/"

    this.getSynonyms = function (name, dictionaryName, acronym, callback) {
      if (dictionaryName == undefined) {
        dictionaryName = "null"
      }
      if (acronym == undefined) {
        acronym = "null"
      }
      $http({
        method: 'GET',
        params: {
          er: name,
          dictionaryName: dictionaryName,
          acronym: acronym
        },
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        },
        url: url + 'search'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        callback("Error");
      });
    }
    this.createPrimary = function (name, metaFeature, acronym, callback) {
      if (acronym == undefined || acronym == "" || acronym == " ") {
        acronym = "null"
      }
      $http({
        method: 'POST',
        params: {
          er: name,
          dic: metaFeature.dictionary,
          countryAcronyms: acronym,
          gps: "null",
          metaFeatureId: metaFeature.id,
          metaDictionary: metaFeature.dictionary
        },
        headers: {
          'Access-Control-Allow-Origin': 'true'
        },
        url: url + 'createPrimary'
      }).
      then(function onSuccess(response) {
        console.log(response.data);
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.createSynonyms = function (synonymEr, primaryId, primaryDictionary, callback) {
      $http({
        method: 'POST',
        params: {
          synonymEr: synonymEr,
          primaryId: primaryId,
          dictionaryName: primaryDictionary
        },
        headers: {
          'Access-Control-Allow-Origin': 'true'
        },
        url: url + 'createSynonyms'
      }).
      then(function onSuccess(response) {
        console.log(responsedata)
        if (response.data.synonym.error) {
          alert(response.data.synonym.error)
        }
        callback(null, response.data)
      }, function onError(response) {
        callback("Error");
      });
    }
    this.updateGram = function (er, id, callback) {
      $http({
        method: 'PUT',
        params: {
          er: er,
          id: id
        },
        headers: {
          'Access-Control-Allow-Origin': 'true'
        },
        url: url + 'grams'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.deleteGram = function (id, type, callback) {
      $http({
        method: 'DELETE',
        params: {
          id: id,
          gramType: type
        },
        headers: {
          'Access-Control-Allow-Origin': 'true'
        },
        url: url + 'grams'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.getUnresolved = function (callback) {
      $http({
        method: 'GET',
        url: url + 'unresolved'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.getMetaFeatures = function (callback) {
      $http({
        method: 'GET',
        url: url + 'getMetaFeatures'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.getMetaFeature = function (id, callback) {
      $http({
        params: {
          id: id
        },
        method: 'GET',
        url: url + 'getMetaFeature'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.searchString = function (name, dictionary, callback) {
      $http({
        method: 'GET',
        params: {
          er: name,
          dictionary: dictionary
        },
        url: url + 'search_string'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.getCandidates = function (callback) {
      $http({
        method: 'GET',
        url: url + 'candidates'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.getCandidate = function (id, callback) {
      $http({
        method: 'GET',
        params: {
          id: id
        },
        url: url + 'candidate'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.updateMetaFeature = function (metaFeature, callback) {
      $http({
        method: 'PUT',
        data: {
          metaFeature: metaFeature
        },
        url: url + 'metaFeature'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.updateMetaRelation = function (metaRelation, callback) {
      $http({
        method: 'PUT',
        data: {
          metaRelation: metaRelation
        },
        url: url + 'metaRelation'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.saveMetaRelation = function (metaFeature, metaRelation, callback) {
      if (metaRelation.from == undefined) {
        metaRelation.from = "null"
      }
      $http({
        method: 'POST',
        params: {
          name: metaRelation.name,
          orderNumber: metaRelation.orderNumber,
          from: metaRelation.from,
          id: metaFeature.id,
          position: metaRelation.orderNumber
        },
        url: url + 'createmetaRelation'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.editNoun = function (noun, callback) {
      $http({
        method: 'PUT',
        data: {
          noun: noun
        },
        url: url + 'noun'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.solveAsNoun = function (id, name, metaFeature, callback) {
      $http({
        method: 'POST',
        data: {
          id: id,
          name: name,
          metaFeature: metaFeature
        },
        url: url + 'solveAsNoun'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.solveAsSynonym = function (nounId, synonymEr, synonymDictionary, featureId, callback) {
      $http({
        method: 'POST',
        data: {
          nounId: nounId,
          synonymEr: synonymEr,
          dictionary: synonymDictionary,
          featureId: featureId
        },
        url: url + 'solveAsSynonym'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
    this.deleteCandidateFeature = function (feature, callback) {
      $http({
        method: 'POST',
        data: {
          featureId: feature.id
        },
        url: url + 'deleteCandidateFeature'
      }).
      then(function onSuccess(response) {
        callback(null, response.data);
      }, function onError(response) {
        console.log(response.data);
        callback("Error");
      });
    }
  });