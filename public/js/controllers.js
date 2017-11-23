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
  getMeta();
  $scope.search = function(name){
    Dictionary.getSynonyms(name,function(error,data){
      if (!error){
        if(!data.primary){
          $scope.suggested = data.suggested
          $scope.notFound = true
        }else{
          termFactory.setSynonyms(data.synonyms);
          termFactory.setPrimary(data.primary);
          var coordenadasGps=data.primary.gps.split(";")
          data.primary.latitud = coordenadasGps[0];
          data.primary.longitud = coordenadasGps[1];
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
  $scope.uploadFiles = function(file,type) {
    if(type=="primary"){
      var route = "/upload"
      var meta = $scope.meta
    }else{
      var route = "/uploadMeta"
      var meta = null
    }
    file.upload = Upload.upload({
      url: url+route,
      data: {file: file, meta: meta},
    });
    
    file.upload.then(function (response) {
      alert("Archivo subido correctamente");
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
  
  function getMeta(){
    Dictionary.getMetaFeatures(function(error,data){
      if(!error){
        $scope.metaFeatures = data.metaFeatures;
      }
    });
  }
}).
controller('SetCtrl', function ($scope,$location,termFactory,Dictionary) {
  $scope.newSyn = "";
  $scope.primary = termFactory.getPrimary();
  $scope.synonyms = termFactory.getSynonyms();
  $scope.newSyn = termFactory.getCurrent();
  $scope.createSynonym = function(synonymEr,primary){
    Dictionary.createSynonyms(synonymEr,primary.id,primary.dictionary, function(error,res){
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
  }
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
            $location.path("/setGrams");
          }        
        }
      });
    }
}).
controller('SearchCtrl', function ($scope,termFactory,Dictionary) {
  termFactory.setCurrent(null);
  getMeta();
  $scope.current = termFactory.getCurrent();
  $scope.search = function(er,dictionary){
    Dictionary.searchString(er,dictionary,function(err,res){
      $scope.output=res.primary;
    })
  }
  function getMeta(){
    Dictionary.getMetaFeatures(function(error,data){
      if(!error){
        $scope.metaFeatures = data.metaFeatures;
      }
    });
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
}).
controller('metaFeaturesCtrl', function ($scope,$location,metaFeaturesFactory,Dictionary) {
  $scope.metaFeature = metaFeaturesFactory.getMetaFeature();
  $scope.metaRelations = metaFeaturesFactory.getMetaRelations();
  $scope.metaRelation = metaFeaturesFactory.getCurrentMetaRelation();
  if($scope.metaFeature){
    showMetaFeature($scope.metaFeature.id,function(){

    });
  }
  
  Dictionary.getMetaFeatures(function(error,data){
    if(!error){
      $scope.metaFeatures = data.metaFeatures;
    }
  });
  
  $scope.showMetaFeature = function (id){
    showMetaFeature(id,function(){
      $location.path("/metaFeature");
    });
    
  }

  $scope.newMetaRelation = function(){
    metaFeaturesFactory.setCurrentMetaRelation(null);
    $location.path("/newMetaRelation");
  }

  $scope.saveMetaRelation = function(metaFeature,metaRelation){
    Dictionary.saveMetaRelation(metaFeature,metaRelation,function(error,data){
      if(!error){
        console.log(data);
        $location.path("/metaFeature");
      }
    });
  }
  $scope.editMetaRelation = function(metaRelation){
    metaFeaturesFactory.setCurrentMetaRelation(metaRelation);
    $location.path("/metaRelation");
  }

  $scope.updateMetaFeature = function(metaFeature){
    Dictionary.updateMetaFeature(metaFeature,function(error,data){
      if(!error){
        metaFeaturesFactory.setMetaFeature(metaFeature);
        console.log(data);
      }
    });
  }

  $scope.updateMetaRelation = function(metaRelation){
    Dictionary.updateMetaRelation(metaRelation,function(error,data){
      if(!error){
        console.log(data);
        $location.path("/metaFeature");
      }
    });
  }

  function showMetaFeature(id,callback){
    Dictionary.getMetaFeature(id,function(error,data){
      if(!error){
        Object.keys(data.metaFeatures).forEach(function (key) { 
          var value = data.metaFeatures[key]
          if(data.metaFeatures[key]=="true"){
            data.metaFeatures[key] = true;
          }else if(data.metaFeatures[key]=="false"){
            data.metaFeatures[key] = false;
          }
        });
        if(data.metaRelations[0] != undefined && data.metaRelations[0].from != "null" ){
          data.metaRelations.sort(function(a, b) {
            return parseFloat(a.from) - parseFloat(b.from);
          });
          for(var i=0;i<data.metaRelations.length;i++){
            data.metaRelations[i].orderNumber = i;
            if(i!=(data.metaRelations.length -1) ){
              data.metaRelations[i].to = data.metaRelations[i+1].from
            } 
          }
        }else{
          data.metaRelations.sort(function(a, b) {
            return parseFloat(a.orderNumber) - parseFloat(b.orderNumber);
          });
        }
        
        metaFeaturesFactory.setMetaFeature(data.metaFeatures);
        metaFeaturesFactory.setMetaRelations(data.metaRelations);
        $scope.metaRelations = metaFeaturesFactory.getMetaRelations();
        callback();
      }
    });
  }
});
