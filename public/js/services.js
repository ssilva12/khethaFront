'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .service('frequencyMatrixService', function($http) {
    // var url = "http://localhost:9000/"
    var url = "http://guarded-atoll-31281.herokuapp.com/"

    this.get = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url+'api/frequencymatrix/',
        params: parameters
      }).
      success((data, status, headers, config) => {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }

    this.getEmployers = (parameters, callback) => {
      $http({
        method: 'GET',
        url: url+'api/employer/all/',
      }).
      success((data, status, headers, config) => {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }

    this.getJobs = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url+'api/job/all/',
        params: parameters // {user_id: user.id}
      }).
      success((data, status, headers, config) => {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }

    this.getVacancies = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url+'api/vacancy/all/',
        params: parameters
      }).
      success((data, status, headers, config) => {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }

    this.setFeatureWeight = (parameters, callback) => {
      console.log(parameters);
      $http({
        method: 'GET',
        url: url+'api/frequencymatrix/feature-weight/',
        params: parameters
      }).
      success((data, status, headers, config) => {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }

  })
  .service('Dictionary', function($http) {
    // var url = "http://localhost:9000/"
    var url = "http://guarded-atoll-31281.herokuapp.com/"
    this.getSynonyms = function (name,dictionaryName,acronym,callback) {
      if(dictionaryName == undefined){
        dictionaryName = "null"
      }
      if(acronym == undefined){
        acronym = "null"
      }
      $http({
        method: 'GET',
        params: {er: name,dictionaryName:dictionaryName,acronym:acronym},
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
        },
        url: url+'search'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.createPrimary = function (name,metaFeature,acronym,callback) {
      if(acronym == undefined || acronym == "" || acronym == " "){
        acronym = "null"
      }
      $http({
        method: 'POST',
        params: {er:name,dic:metaFeature.dictionary,
                countryAcronyms:acronym,gps:"null",
                metaFeatureId:metaFeature.id,metaDictionary:metaFeature.dictionary},
        headers: {
          'Access-Control-Allow-Origin':'true'
        },
        url: url+'createPrimary'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.createSynonyms = function (synonymEr,primaryId,primaryDictionary,callback){
      $http({
        method: 'POST',
        params: {synonymEr:synonymEr, primaryId:primaryId,dictionaryName:primaryDictionary},
        headers: {
          'Access-Control-Allow-Origin':'true'
        },
        url: url+'createSynonyms'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.updateGram = function(er,id,callback){
      $http({
        method: 'PUT',
        params: {er:er, id:id},
        headers: {
          'Access-Control-Allow-Origin':'true'
        },
        url: url+'grams'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.deleteGram = function(id,type,callback){
      $http({
        method: 'DELETE',
        params: {id:id,gramType:type},
        headers: {
          'Access-Control-Allow-Origin':'true'
        },
        url: url+'grams'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.getUnresolved = function(callback){
      $http({
        method: 'GET',
        url: url+'unresolved'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.getMetaFeatures = function(callback){
      $http({
        method: 'GET',
        url: url+'getMetaFeatures'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.getMetaFeature = function(id,callback){
      $http({
        params: {id: id},
        method: 'GET',
        url: url+'getMetaFeature'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.searchString = function (name,dictionary,callback) {
      $http({
        method: 'GET',
        params: {er: name,dictionary:dictionary},
        url: url+'search_string'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.getCandidates = function (callback) {
      $http({
        method: 'GET',
        url: url+'candidates'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.getCandidate = function (id,callback) {
      $http({
        method: 'GET',
        params: {id: id},
        url: url+'candidate'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.updateMetaFeature = function (metaFeature,callback) {
      $http({
        method: 'PUT',
        data: {metaFeature:metaFeature},
        url: url+'metaFeature'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.updateMetaRelation = function (metaRelation,callback) {
      $http({
        method: 'PUT',
        data: {metaRelation:metaRelation},
        url: url+'metaRelation'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.saveMetaRelation = function (metaFeature,metaRelation,callback) {
      if(metaRelation.from == undefined){
        metaRelation.from = "null"
      }
      $http({
        method: 'POST',
        params: {name:metaRelation.name,orderNumber:metaRelation.orderNumber,from:metaRelation.from,id:metaFeature.id,
        position:metaRelation.orderNumber},
        url: url+'createmetaRelation'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.editNoun = function (noun,callback){
      $http({
        method: 'PUT',
        data: {noun:noun},
        url: url+'noun'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.solveAsNoun = function(id,name,metaFeature,callback){
      $http({
        method: 'POST',
        data: {id:id,name:name,metaFeature:metaFeature},
        url: url+'solveAsNoun'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.solveAsSynonym = function(nounId,synonymEr,synonymDictionary,featureId,callback){
      $http({
        method: 'POST',
        data: {nounId:nounId,synonymEr:synonymEr,dictionary:synonymDictionary,featureId:featureId},
        url: url+'solveAsSynonym'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
    this.deleteCandidateFeature = function(feature,callback){
      $http({
        method: 'POST',
        data: {featureId:feature.id},
        url: url+'deleteCandidateFeature'
      }).
      success(function (data, status, headers, config) {
        callback(null,data)
      }).
      error(function (data, status, headers, config) {
        callback("Error")
      });
    }
  });