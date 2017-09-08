'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http,$route) {
    $scope.$route = $route;
  }).
  controller('MyCtrl1', function ($scope,$http) {

    //trae los tickets sin resolver
    getUnresolved();

    function getUnresolved(){
        $http({
        method: 'GET',
        url: '/api/unresolved'
      }).
      success(function (data, status, headers, config) {
        console.log(data);
        $scope.unresolved = data.docs;
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });
    }
    

    //resuelve un ticket
    $scope.resolve = function(id){
        $http({
        method: 'POST',
        url: '/api/solve',
        data: {id:id}
      }).
      success(function (data, status, headers, config) {
        console.log(data);
        getUnresolved();
      }).
      error(function (data, status, headers, config) {
        $scope.name = 'Error!';
      });
    }

  }).
  controller('SearchCtrl', function ($scope,$location,Dictionary,termFactory,Upload,$timeout) {
    $scope.search = function(name){
      Dictionary.getSynonyms(name,function(error,data){
        if (!error){
          if(!data.primary){
            $scope.notFound = true
          }else{
            termFactory.setSynonyms(data.synonyms);
            termFactory.setPrimary(data.primary);
            $location.path("/setGrams");
          }        
        }
      });
    }

    $scope.createPrimary = function(name){
      Dictionary.createPrimary(name,function(err,data){
        if (!err){
          termFactory.setSynonyms(data.synonyms);
            termFactory.setPrimary(data.primary);
            $location.path("/setGrams");
        }
      })
    };
    var url = 'http://polar-garden-35450.herokuapp.com'
    $scope.uploadPic = function(file) {
    file.upload = Upload.upload({
      url: url+'/upload',
      data: {file: file},
    });

    file.upload.then(function (response) {
      $timeout(function () {
        file.result = response.data;
      });
    }, function (response) {
      if (response.status > 0)
        $scope.errorMsg = response.status + ': ' + response.data;
    }, function (evt) {
      // Math.min is to fix IE which reports 200% sometimes
      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
    });
    }
  }).
  controller('SetCtrl', function ($scope,$location,termFactory,Dictionary) {
    $scope.newSyn = "";
    $scope.primary = termFactory.getPrimary();
    $scope.synonyms = termFactory.getSynonyms();
    $scope.createSynonym = function(synonymEr,primaryId){
      Dictionary.createSynonyms(synonymEr,primaryId, function(error,res){
        if (!error){
          $scope.synonyms.push(res.synonym);
        }
      })
    }
    $scope.editGram = function(gram){
      termFactory.setCurrent(gram)
        console.log("le dio a editar")
        $location.path("/editGram");
    }
    $scope.deleteGram = function(id,type){
      Dictionary.deleteGram(id,type,function(err,res){
        console.log(res)
      });
    }
  }).
  controller('EditCtrl', function ($scope,termFactory,Dictionary) {
    $scope.current = termFactory.getCurrent();
    $scope.update = function(er,id){
      Dictionary.updateGram(er,id,function(err,res){
        console.log(res)
      })
    }
  });
