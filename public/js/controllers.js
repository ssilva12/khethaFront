'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http,$route) {
    $scope.$route = $route;
  }).
  controller('MyCtrl1', function ($scope,$http,Dictionary,$location,termFactory) {
    termFactory.setCurrent(null);
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
  controller('SynonymsCtrl', function ($scope,$location,Dictionary,termFactory,Upload,$timeout) {
    termFactory.setCurrent(null);
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
    //var url = 'http://polar-garden-35450.herokuapp.com'
    var url = 'http://localhost:3000'
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
        debugger;
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
  }).
  controller('SearchCtrl', function ($scope,termFactory,Dictionary) {
    termFactory.setCurrent(null);
    $scope.current = termFactory.getCurrent();
    $scope.search = function(er){
      Dictionary.searchString(er,function(err,res){
        $scope.output=res.primary;
      })
    }
  }).
  controller('CandidatesCtrl', function ($scope,$location,candidateFactory,Dictionary) {
    $scope.jobs=candidateFactory.getJobs();
    $scope.features=candidateFactory.getFeatures();
    $scope.schooling=candidateFactory.getSchooling();
    Dictionary.getCandidates(function(err,res){
        if (!err){
          $scope.candidates=res.candidates
        }else{
          debugger;
          console.log(err)
        }
      });
      $scope.showCandidate = function(candidate){
        candidateFactory.setCandidate(candidate)
        Dictionary.getCandidate(candidate.id,function(err,res){
          if (!err){
            candidateFactory.setJobs(res.jobs);
            candidateFactory.setFeatures(res.features);
            candidateFactory.setSchooling(res.schooling);
            $scope.jobs=candidateFactory.getJobs();
            $scope.features=candidateFactory.getFeatures();
            $scope.schooling=candidateFactory.getSchooling();
            $location.path("/candidate");
          }            
        });
      }
  }).
  controller('JobsCtrl', function ($scope,$timeout,$location,candidateFactory,Dictionary,usSpinnerService) {
    console.log("jobsCtrl");
    Dictionary.getCandidates(function(err,res){
      if (!err){
        $scope.candidates=res.candidates
      }else{
        console.log(err)
      }
    });
    $timeout(function() {
      usSpinnerService.stop();
      $scope.match = true;
    }, 3000); 
    $scope.matchJob = function(){
      $location.path("/match");
      console.log("cambio")
    }
    $scope.new = function(){
      $location.path("/job");
    }
  });
