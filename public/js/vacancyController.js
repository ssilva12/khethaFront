angular.module('myApp.vacancyCtrl', []).
controller('vacancyCtrl', function ($scope,$route,Vacancy) {
    getvacancies();
    getCandidates();
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