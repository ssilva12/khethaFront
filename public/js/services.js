'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
value('version', '0.1')
.service('frequencyMatrixService', ['$http', 'URL', '$cookieStore', function ($http, URL, $cookieStore) {
  // var url = "http://localhost:9000/"
  // URL.URL_REST_SERVICE = "http://localhost:9000/";
  // var url = "http://guarded-atoll-31281.herokuapp.com/"
  
  var headers = {
    'Content-Type': "text/text",
    'Authorization': $cookieStore.get("sesion"),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  }
  var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    }
  if ($cookieStore.get("sesion") == null || $cookieStore.get("sesion") == "") {
    delete headers["Authorization"];
  }
  
  this.get = (parameters, callback) => {
    $http({
      method: 'GET',
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/',
      headers: headers,
      params: parameters
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  
  this.calculate = (parameters, callback) => {
    $http({
      method: 'GET',
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/calculate',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/job-lastvacancy',
      headers: headers,
      params: parameters
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  
  this.getForNewVacancy = (parameters, callback) => {
    $http({
      method: 'GET',
      url: URL.URL_REST_SERVICE + +'api/frequencymatrix/new-vacancy',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/employer/all/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/job/all/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/vacancy/all/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-names/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-weight/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/candidate/all/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-add/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/frequencymatrix/feature-discarded/',
      headers: headers,
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
      url: URL.URL_REST_SERVICE + 'api/vacancy/candidate-match',
      headers: headers,
      params: parameters
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  
}])
.service('Dictionary', ['$http', 'URL', '$cookieStore', function ($http, URL, $cookieStore) {
  var headers = {
    'Content-Type': "text/text",
    'Authorization': $cookieStore.get("sesion"),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  }
  var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
  }
  if ($cookieStore.get("sesion") == null || $cookieStore.get("sesion") == "") {
    delete headers["Authorization"];
  }
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'search'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'createPrimary'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'createSynonyms'
    }).
    then(function onSuccess(response) {
      if (response.data.synonym.error) {
        alert(response.data.synonym.error)
      }
      callback(null, response.data)
    }, function onError(response) {
      callback("Error");
    });
  }
  this.createImplicit = function(implicit, determinant, callback){
    $http({
      method: 'POST',
      params: {
        implicitId: implicit.id,
        determinantId: determinant.id
      },
      headers: headers,
      url: URL.URL_REST_SERVICE + 'createImplicit'
    }).
    then(function onSuccess(response) {
      if (response.data.response.error) {
        //alert(response.data.response.error)
      }
      callback(null, response.data)
    }, function onError(response) {
      callback("Error");
    });
  }
  this.deleteImplicit = function(implicit, determinant, callback){
    $http({
      method: 'POST',
      params: {
        implicitId: implicit.id,
        determinantId: determinant.id
      },
      headers: headers,
      url: URL.URL_REST_SERVICE + 'deleteImplicit'
    }).
    then(function onSuccess(response) {
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'grams'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'grams'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.fuse = function (firstNounId, secondNounId, callback) {
    $http({
      method: 'GET',
      params: {
        nouLeft: firstNounId.id,
        nouDer: secondNounId.id,
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'test_fusion'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  this.unfold = function (noun, nGram,callback) {
    $http({
      method: 'GET',
      params: {
        unfoldNoun: noun.id,
        unfoldNgram: nGram.id,
      },
      headers:  headersJson,
      url: URL.URL_REST_SERVICE + 'test_unfold'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  this.getUnresolved = function (callback) {
    $http({
      method: 'GET',
      headers: headers,
      url: URL.URL_REST_SERVICE + 'unresolved'
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
      url: URL.URL_REST_SERVICE + 'getMetaFeatures',
      headers: headers
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'getMetaFeature'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'search_string'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'candidates'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'candidate'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'metaFeature'
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
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'metaRelation'
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
      headers: headers,
      url: URL.URL_REST_SERVICE + 'createmetaRelation'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.editNoun = function (noun, callback) {
    var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    }
    $http({
      method: 'PUT',
      data: {
        noun: noun
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'noun'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.solveAsNoun = function (id, name, metaFeature, callback) {
    var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    }
    $http({
      method: 'POST',
      data: {
        id: id,
        name: name,
        metaFeature: metaFeature
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'solveAsNoun'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.solveAsSynonym = function (nounId, synonymEr, synonymDictionary, featureId, callback) {
    var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    }
    //debugger;
    $http({
      method: 'POST',
      data: {
        nounId: nounId,
        synonymEr: synonymEr,
        dictionary: synonymDictionary,
        featureId: featureId
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'solveAsSynonym'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.solveAsAsociation = function (nounId, synonymEr, synonymDictionary, featureId, callback) {
    var headersJson = {
      'Content-Type': "application/json",
      'Authorization': $cookieStore.get("sesion"),
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
    }
    $http({
      method: 'POST',
      data: {
        nounId: nounId,
        synonymEr: synonymEr,
        dictionary: synonymDictionary,
        featureId: featureId
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'solveAsAsociation'
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
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'deleteCandidateFeature'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      console.log(response.data);
      callback("Error");
    });
  }
  this.pieceWiseSearch = function (name, dictionaryName, id, callback) {
    if (dictionaryName == undefined) {
      dictionaryName = "null"
    }
    $http({
      method: 'GET',
      params: {
        er: name,
        dictionary: dictionaryName,
        id: id
      },
      headers: headers,
      url: URL.URL_REST_SERVICE + 'pieceWiseSearch'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
  this.pieceWiseSolve = function (name, dictionaryName, mrId, cndId, callback) {
    if (dictionaryName == undefined) {
      dictionaryName = "null"
    }
    $http({
      method: 'POST',
      data: {
        er: name,
        dictionary: dictionaryName,
        mrId: mrId,
        cndId: cndId
      },
      headers: headersJson,
      url: URL.URL_REST_SERVICE + 'pieceWiseSolve'
    }).
    then(function onSuccess(response) {
      callback(null, response.data);
    }, function onError(response) {
      callback("Error");
    });
  }
}]);