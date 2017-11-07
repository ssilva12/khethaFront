'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1')
  .service('Dictionary', function($http) {
    //var url = "http://localhost:9000/"
    var url = "http://guarded-atoll-31281.herokuapp.com/"
    this.getSynonyms = function (name,callback) {
      $http({
        method: 'GET',
        params: {er: name},
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
    this.createPrimary = function (name,callback) {
      $http({
        method: 'POST',
        params: {er: name},
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
    this.createSynonyms = function (synonymEr,primaryId,callback){
      $http({
        method: 'POST',
        params: {synonymEr:synonymEr, primaryId:primaryId},
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
    this.searchString = function (name,callback) {
      $http({
        method: 'GET',
        params: {er: name},
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
  });