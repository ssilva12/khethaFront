angular.module('myApp.vacancyCtrl', []).
controller('vacancyCtrl', function ($scope,$route,Vacancy) {
    getvacancies();
    getCandidates();

    $scope.createVancancyCandidateRelation = function(vacancyId,candidateId,relationName){
        Vacancy.createVancancyCandidateRelation(vacancyId,candidateId,relationName,function(error,data){
            if(!error){
                $scope.vacancies = data.vacancies;
                getRelations($scope.vacancy.id, $scope.candidate.id)
            }
        });
    }

    $scope.getRelations = function(){
        if($scope.vacancy && $scope.candidate){
            getRelations($scope.vacancy.id, $scope.candidate.id)
        }
    }

    $scope.validateRelations = function(relation){
        debugger;
    }

    $scope.createOrDelete = function(relationClass){
        if ($scope.relations.indexOf(relationClass) !=-1){
            return 'btn-danger'
        }else{
            return 'btn-info'
        }
    }

    function getvacancies(){
        Vacancy.getVacancies(function(error,data){
            if(!error){
                $scope.vacancies = data.vacancies;
            }
        });
    }

    function getCandidates(){
        Vacancy.getCandidates(function(error,data){
            if(!error){
                $scope.candidates = data.candidates;
            }
        });
    }

    function getRelations(vacancyId,candidateId){
        Vacancy.getRelations(vacancyId,candidateId,function(error,data){
            if(!error){
                $scope.relations = data.relations;
            }
        });
    }

    searchCandidates = function(name){
        var dictionaryName = "JobFunctionName"
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
})