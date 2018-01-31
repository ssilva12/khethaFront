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
  $scope.getSuggested = function(name){
    Dictionary.getSynonyms(name,"null",function(error,data){
      console.log(data);
      if (!error){
        console.log(data.suggested);
        if(data.suggested){
          $scope.suggested = data.suggested;
          $scope.items = data.suggested;
        }
      }
    });
  }
  
  $scope.solve = function(name){
    termFactory.setCurrent(name);
    console.log(termFactory.getCurrent());
    $location.path("/solve");
  }

  $scope.discard = function(entry){
    Dictionary.deleteCandidateFeature(entry,function(error,data){
      if(!error){
        console.log("deleted!")
        getUnresolved();
      }
    });
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
    if ($scope.metaRelationSearch == undefined){
      $scope.metaRelationSearch = {};
      $scope.metaRelationSearch.dictionary = null;
    }
    Dictionary.getSynonyms(name,$scope.metaRelationSearch.dictionary,$scope.acronym,function(error,data){
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
    Dictionary.createPrimary(name,$scope.meta,$scope.acronym,function(err,data){
      if (!err){
        termFactory.setSynonyms(data.synonyms);
        termFactory.setPrimary(data.primary);
        $location.path("/setGrams");
      }
    })
  };

  $scope.selectNoun = function(er){
    $scope.name = er
  }
  //var url = 'http://polar-garden-35450.herokuapp.com'
  var url = 'http://localhost:3000'
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
    termFactory.setCurrent(gram);
    console.log("le dio a editar")
    Dictionary.editNoun(gram, function(error,res){
       if (!error){
         console.log(res);
       }
    });
    //$location.path("/editGram");
  }
  $scope.deleteGram = function(synonym,id,type){
    
    var index = $scope.synonyms.indexOf(synonym);
    if (index > -1) {
      $scope.synonyms.splice(index, 1);
    }
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
  $scope.synonymsSearch = termFactory.getCurrent().name;
  Dictionary.getMetaFeatures(function(error,data){
    if(!error){
      $scope.metaFeatures = data.metaFeatures;
    }
  });
  getSuggested($scope.synonymsSearch,"null");
  $scope.getSuggested = function(name,dictionary){
    getSuggested(name,dictionary)
  }
  $scope.selectPrimary = function(name){
    $scope.primary = name;
    console.log($scope.primary)
  }
  $scope.editOriginal = function(name){
    document.getElementById("myId").disabled = false;
  }

  $scope.createPrimary = function(noun){
    Dictionary.solveAsNoun(noun.id,noun.name,noun.dictionary,function(err,data){
      if (!err){
        debugger;
        termFactory.setSynonyms(data.synonyms);
        termFactory.setPrimary(data.primary);
        termFactory.setCurrent(null);
        $location.path("/setGrams");
      }
    })
  };
  
  function getSuggested(name){
    Dictionary.getSynonyms(name,$scope.current.dictionary,"null",function(error,data){
      console.log(name)
      if (!error){
        console.log(data)
        if(data.suggested){
          $scope.suggested = data.suggested;
          $scope.items = data.suggested;
        }
        if(data.primary){
          $scope.suggested = [data.primary];
          $scope.items = [data.primary];
        }
      }
    });
  }
  $scope.solveAsSynonym = function(id){
      Dictionary.solveAsSynonym(id,$scope.current.name,$scope.current.dictionary,$scope.current.id,function(error,data){
        if (!error){
          if(!data.primary){
            //$scope.suggested = data.suggested
            //$scope.notFound = true
            $location.path("/unresolved");
          }else{
            //termFactory.setSynonyms(data.synonyms);
            //termFactory.setCurrent($scope.current.name);
            //termFactory.setPrimary(data.primary);
            $location.path("/unresolved");
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
            data.metaRelations[i].Number = i;
            if(i!=(data.metaRelations.length -1) ){
              data.metaRelations[i].to = data.metaRelations[i+1].from
            } 
          }
        }else{
          data.metaRelations.sort(function(a, b) {
            return parseFloat(a.Number) - parseFloat(b.Number);
          });
        }
        
        metaFeaturesFactory.setMetaFeature(data.metaFeatures);
        metaFeaturesFactory.setMetaRelations(data.metaRelations);
        $scope.metaRelations = metaFeaturesFactory.getMetaRelations();
        callback();
      }
    });
  }
}).
controller('frequencyMatrixCtrl', function ($scope, $timeout, $location, $compile, frequencyMatrixFactory, frequencyMatrixService, usSpinnerService) {
  console.log("frequencyMatrixCtrl");

  $scope.employer  = '';
  $scope.job = '';
  $scope.vacancy = '';
  $scope.years = 1;
  $scope.candidateType = 'C';
  $scope.minPercentage = 0;
  $scope.showValue = "w"; // f: frequency, w:weight, p: probability
  $scope.methaFeatures = [];
  $scope.featuresModified = [];
  $scope.currentMethaFeatureId = '';
  $scope.currentMethaFeatureName = '';
  $scope.currentMethaFeatureFirstMethaRelationId = '';
  $scope.currentFeatureNames = [];
  $scope.currentDiscarded = false;

  $scope.featureEdit = undefined;
  $scope.weightIndexEdit = undefined;
  $scope.weightPopupEdit = '';
  $scope.methaRelationEdit = '';

  let employers = frequencyMatrixService.getEmployers( {}, function(error, data) {
    console.log(data);
    if (!error) {
      $scope.employers = data;
    }
  })

  $scope.getJobs = function() {
    console.log('controller getJobs');
    // employerId: $scope.employer }
    frequencyMatrixService.getJobs( { 
      employerId: $scope.employer 
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        $scope.jobs = data;
        $scope.job = '';
        $scope.getVacancies();
      }
    });
  }

  $scope.getVacancies = function() {
    // employerId: $scope.employer }
    frequencyMatrixService.getVacancies( { 
      employerId: $scope.employer,
      jobId: $scope.job 
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        $scope.vacancies = data;
        $scope.vacancy = '';
      }
    });
  }

  $scope.getMethaFeatures = function() {
    console.log('Consultar click... ' + $scope.employer + ', ' + $scope.job +
    ', ' + $scope.years + ', ' + $scope.candidateType + ', ' + $scope.minPercentage);

    $scope.methaFeatures = [];

    frequencyMatrixService.get( { 
      employer: $scope.employer,
      job: $scope.job,
      jobVacancy: $scope.vacancy,
      years: $scope.years,
      candidateType: $scope.candidateType,
      minPercentage: $scope.minPercentage
    }, function(error, data) {
      console.log(data);
      if (!error) {
        $scope.methaFeatures = data;
        $scope.refreshMatrix();
      }
    });
  }

  $scope.refreshMatrix = function() {
    $scope.featuresModified = [];
    $scope.methaFeatures.forEach(mf => {
      // console.log(mf);
      mf.features.forEach(f => {
        let featureModified = {
          methaFeatureId: mf.id,
          methaFeatureOrder: mf.order,
          methaFeature: mf.name,
          methaRelationIds: mf.methaRelationIds,
          levelNames: mf.levelNames,
          totalCount: mf.totalCount,
          visible: f.count > mf.totalCount * $scope.minPercentage / 100,
          tdClass: [],
          tdTitle: [],
          tdContent: [],
          tdEditWeight: [],
          ...f,
        };

        for(var i = 0; i < featureModified.levelNames.length; i++) {
          featureModified.tdClass[i] = !featureModified.isWeightInferred[i] && featureModified.levelNames[i] ? 'weightSetted' : '';
          featureModified.tdTitle[i] = 'MR: ' + featureModified.levelNames[i] + '\r\nFrecuencia: ' + featureModified.frequency[i] + 
            '\r\nFrecuencia Corregida: ' + featureModified.frequencyCorrected[i].toFixed(2) + '\r\nPeso establecido: ' + featureModified.weightSetted[i] +
            '\r\nPeso Inferido: ' + featureModified.weightInferred[i] + '\r\nProbabilidad: ' + featureModified.probability[i].toFixed(2);
          featureModified.tdContent[i] = '';
          featureModified.tdEditWeight[i] = false;
        }

        if ($scope.showValue === 'f') {
          for(var i = 0; i < featureModified.frequency.length; i++) {
            featureModified.tdContent[i] = featureModified.frequency[i] > 0 ? featureModified.frequency[i] : '';
          }
        } else if ($scope.showValue === 'w') {
          for(var i = 0; i < featureModified.levelNames.length; i++) {
            if (featureModified.levelNames[i]) {
              featureModified.tdContent[i] = featureModified.isWeightInferred[i] ? featureModified.weightInferred[i] : featureModified.weightSetted[i];
              // featureModified.tdEditWeight[i] = true;
                // '<span class="editWeight" data-toggle="modal" data-target="#modalWeight" ng-click="editWeight(' + featureModified.id + ', 0)">' +
                // ' <i class="glyphicon glyphicon-edit"></i>' +
                // '</span>';
            }
          }
        } else if ($scope.showValue === 'ws') {
          for(var i = 0; i < featureModified.weightSetted.length; i++) {
            if (featureModified.levelNames[i]) {
              featureModified.tdContent[i] = featureModified.weightSetted[i] > 0 ? featureModified.weightSetted[i] : '';

              /*
              featureModified.tdContent[i] = $compile((featureModified.weightSetted[i] > 0 ? featureModified.weightSetted[i] : '') +
                '<span class="editWeight", data-toggle="modal", data-target="#modalWeight", ng-click="editWeight(' +
                  featureModified.id + ', ' + i + ')">' + 
                  '<i class="glyphicon glyphicon-edit"></i>' +
                '</span>');
              // $(rows[rows.length - 1]).after(addButton);
              // */

              featureModified.tdEditWeight[i] = true;
            }
          }
        } else if ($scope.showValue === 'p') {
          for(var i = 0; i < featureModified.probability.length; i++) {
            featureModified.tdContent[i] = featureModified.levelNames[i] && featureModified.probability[i] > 0 ? 
              featureModified.probability[i].toFixed(2) : '';
          }
        }
          
        $scope.featuresModified.push(featureModified);
      });
      //console.log('features refreshed');
      //$scope.featuresModified
    });
    
    $scope.updateVisible();
    // $timeout($scope.handleRows(), 0);        
  }

  $scope.updateVisible = function() {
    console.log("perc: " + $scope.minPercentage);
    // $(rows).find('td.mf_name').attr('rowspan', 1);
    $scope.featuresModified.forEach(f => {
      // console.log('f.count: ' + f.count);
      // console.log("f.totalCount * $scope.minPercentage: " + f.totalCount * $scope.minPercentage / 100);
      f.visible = f.count >= (f.totalCount * $scope.minPercentage / 100)
    })

    var handleRows = function() {
      var flagColor = 0;
      var backColors = ['#f1f1f1', '#d1d1d1'];
      $('tr.addFeatureButton').remove();
      $scope.methaFeatures.sort(function(obj1, obj2) {
        return parseInt(obj1.id) - parseInt(obj2.id)
      }).forEach(mf => {
        let rows = $('.mf_tr_' + mf.id);
        rows.attr('bgcolor', backColors[flagColor]);
        flagColor = (flagColor === 0 ? 1 : 0);
        
        let tdsAll = $(rows).find('td.mf_name');
        tdsAll.attr('rowspan', 1);
        tdsAll.show();
        let tds = $(rows).find('td.mf_name:visible');
        // console.log('tds length: ' + tds.length);
        $(tds[0]).attr('rowspan', tds.length + 1); // mf.features.length);
        for(var i = 1; i < tds.length; i++) {
          $(tds[i]).hide();//.remove();
        }

        // var el = $compile( "<test text='n'></test>" )( $scope );
        let addButton = $compile('<tr class="addFeatureButton" bgcolor="' + $(rows[0]).attr('bgcolor') +'"><td colspan="16">' +
          '<input type="button" value="+" ng-click="showAddFeature(' + mf.id + ')" data-toggle="modal", data-target="#modalAddFeature",> ' +
          '</td></tr>')($scope);
        $(rows[rows.length - 1]).after(addButton);

      });
    };

    $timeout(handleRows, 0);  
    // $scope.handleRows();
  }

  $scope.getJobs();
  $scope.getMethaFeatures();
  $scope.getVacancies();

  $scope.setShowValue = function(val) {
    console.log('setShowValue: ' + val);
    $scope.showValue = val;
    $scope.refreshMatrix();
    // $scope.getMethaFeatures();
  }

  $scope.editWeight = function(featureId, weightIndex) {
    $scope.featureEdit = $scope.featuresModified.filter(f => f.id === featureId)[0];
    console.log('feature edit');
    console.log($scope.featureEdit);
    $scope.weightIndexEdit = weightIndex;
    $scope.weightPopupEdit = $scope.featureEdit.isWeightInferred[weightIndex] ? 
      $scope.featureEdit.weightInferred[weightIndex] : $scope.featureEdit.weightSetted[weightIndex]; // .toFixed(0);
    $scope.methaRelationEdit = $scope.featureEdit.levelNames[$scope.weightIndexEdit];
    console.log($scope.featureEdit);
  };

  $scope.saveWeight = function () {
    let featureId = $scope.featureEdit.featureIds[$scope.weightIndexEdit];
    console.log('feauter Id real');
    console.log(featureId);
    frequencyMatrixService.setFeatureWeight( {
      entityId: $scope.featureEdit.entityId,
      methaFeatureId: $scope.featureEdit.methaFeatureId,
      methaRelationId: $scope.featureEdit.methaRelationIds[$scope.weightIndexEdit],
      featureId: featureId, // $scope.featureEdit.featureIds[$scope.weightIndexEdit],
      featureType: $scope.featureEdit.type,
      nameId: $scope.featureEdit.nameId,
      weight: $scope.weightPopupEdit,
    }, function(error, data) {
      console.log(data);
      if (!error) {
        $scope.getMethaFeatures();
      }
    });
    // return false;
  };

  $scope.showAddFeature = function(methaFeatureId) {
    $scope.addFeatureError = '';
    $scope.featureToAdd = '';
    let mf = $scope.methaFeatures.filter(mf => mf.id === methaFeatureId.toString())[0];
    console.log('add mf: ' + methaFeatureId);
    console.log(mf.dictionary)
    console.log(mf);
    $scope.currentMethaFeatureId = methaFeatureId;
    $scope.currentMethaFeatureName = mf.name;
    $scope.currentMethaFeatureFirstMethaRelationId = mf.methaRelationIds[0];
    // console.log($scope.methaFeatures);
    //*
    frequencyMatrixService.getFeatureNames( { 
      dictionary: mf.dictionary,
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        // let names = mf.featuresMap.map(f => f.name);
        let names = [];
        for (var fm in mf.featuresMap) {
          console.log(fm);
          console.log(fm.name);
          names.push(fm);
        }
        console.log(names);
        $scope.currentFeatureNames = data.filter(f => $.inArray(f.name, names) < 0);
        console.log('$scope.currentFeatureNames');
        console.log($scope.currentFeatureNames);
      }
    });
  }

  $scope.addFeature = function() {
    $scope.addFeatureError = '';
    if (!$scope.featureToAdd) {
      $scope.addFeatureError = 'Seleccione una característica.';
      return;
    }

    let entityId = '';
    let featureType = '';
    if ($scope.vacancy !== '') {
      entityId = $scope.vacancy;
      featureType = 'vf';
    } else if ($scope.job !== '') {
      entityId = $scope.job;
      featureType = 'jf';
    } else if ($scope.employer !== '') {
      entityId = $scope.employer;
      featureType = 'ef';
    } else {
      $scope.addFeatureError = 'Seleccione un empleador, un oficio o una vacante.'
      return;
    }

    frequencyMatrixService.addFeature( {
      entityId,
      methaFeatureId: $scope.currentMethaFeatureId,
      methaRelationId: $scope.currentMethaFeatureFirstMethaRelationId,
      featureType,
      nameId: $scope.featureToAdd,
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        $('#modalAddFeature').modal('toggle'); // .modal("hide");
        $scope.getMethaFeatures();
        // console.log('$scope.currentFeatureNames');
      }
    });
  }

  // *
  // $scope.currentDiscarded
  $scope.showDiscarded = function(featureId, discarded) {
    $scope.featureEdit = $scope.featuresModified.filter(f => f.id === featureId)[0];
    console.log('feature discarded');
    console.log(discarded);
  }

  $scope.saveDiscarded = function() {
    frequencyMatrixService.setFeatureDiscarded ( { 
      entityId: $scope.featureEdit.entityId,
      methaFeatureId: $scope.featureEdit.methaFeatureId,
      featureId: $scope.featureEdit.id,
      featureType: $scope.featureEdit.type,
      nameId: $scope.featureEdit.nameId,
      discarded: !$scope.discarded,
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        $('#modalDiscarded').modal('toggle');
        $scope.getMethaFeatures();
      }
    });
  }

  $scope.addFeature = function() {
    $scope.addFeatureError = '';
    if (!$scope.featureToAdd) {
      $scope.addFeatureError = 'Seleccione una característica.';
      return;
    }

    let entityId = '';
    let featureType = '';
    if ($scope.vacancy !== '') {
      entityId = $scope.vacancy;
      featureType = 'vf';
    } else if ($scope.job !== '') {
      entityId = $scope.job;
      featureType = 'jf';
    } else if ($scope.employer !== '') {
      entityId = $scope.employer;
      featureType = 'ef';
    } else {
      $scope.addFeatureError = 'Seleccione un empleador, un oficio o una vacante.'
      return;
    }

    frequencyMatrixService.addFeature( {
      entityId,
      methaFeatureId: $scope.currentMethaFeatureId,
      methaRelationId: $scope.currentMethaFeatureFirstMethaRelationId,
      featureType,
      nameId: $scope.featureToAdd,
    },
    function(error, data) {
      console.log(data);
      if (!error) {
        $('#modalAddFeature').modal('toggle'); // .modal("hide");
        $scope.getMethaFeatures();
        // console.log('$scope.currentFeatureNames');
      }
    });
  }
  // */
  
  $timeout(function() {
    usSpinnerService.stop();
    $scope.match = true;
  }, 3000); 
  // $location.path("/frequencyMatrix");
})
;
