'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http,$route) {
    $scope.$route = $route;
  }).
  controller('MyCtrl1', function ($scope,$http,Dictionary,$location,termFactory) {

    //trae los tickets sin resolver
    getUnresolved();
    $scope.items=["1","4","7"];
    $scope.getSuggested = function(name){
      Dictionary.getSynonyms(name,function(error,data){
        if (!error){
          if(data.suggested){
            $scope.suggested = data.suggested
            $scope.items = data.suggested
            console.log(data)
          }
        }
      });
    }

    $scope.solve = function(name){
      termFactory.setCurrent(name);
      console.log(termFactory.getCurrent());
      $location.path("/solve");
    }
    function getUnresolved(){
        Dictionary.getUnresolved(function(error,data){
          console.log(data.unresolved)
          if(!error){
            $scope.unresolved = data.unresolved;
          }
        });
    }

  }).
  controller('SearchCtrl', function ($scope,$location,Dictionary,termFactory,Upload,$timeout) {
    $scope.search = function(name){
      Dictionary.getSynonyms(name,function(error,data){
        if (!error){
          
          if(!data.primary){
            $scope.suggested = data.suggested
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
    //var url = 'http://localhost:3000'
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
    $scope.newSyn = termFactory.getCurrent();
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
  })
  .controller('SolveCtrl',function($scope,Dictionary,termFactory,$location){
    $scope.current = termFactory.getCurrent();
    $scope.synonymsSearch = termFactory.getCurrent();
    getSuggested($scope.synonymsSearch);
    $scope.getSuggested = function(name){
      getSuggested(name)
    }
    $scope.selectPrimary = function(name){
      $scope.primary = name;
      console.log($scope.primary)
    }
    $scope.editOriginal = function(name){
      document.getElementById("myId").disabled = false;
    }
    
    function getSuggested(name){
      Dictionary.getSynonyms(name,function(error,data){
        if (!error){
          if(data.suggested){
            $scope.suggested = data.suggested;
            $scope.items = data.suggested;
          }
        }
      });
      $scope.search = function(name){
        Dictionary.getSynonyms(name,function(error,data){
          if (!error){
            if(!data.primary){
              $scope.suggested = data.suggested
              $scope.notFound = true
            }else{
              termFactory.setSynonyms(data.synonyms);
              termFactory.setCurrent($scope.current);
              termFactory.setPrimary(data.primary);
              //debugger;
              $location.path("/setGrams");
            }        
          }
        });
      }
    }
  });
