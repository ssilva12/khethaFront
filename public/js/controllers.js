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
  controller('MyCtrl2', function ($scope) {
    // write Ctrl here

  }).
  controller('SearchCtrl', function ($scope,$location,Dictionary,termFactory) {
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
  }).
  controller('AddCtrl', function ($scope) {
    $scope.add = function(){
      console.log("lo va a add")
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
      console.log(id)
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
