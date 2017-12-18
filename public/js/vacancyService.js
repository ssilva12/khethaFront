angular.module('myApp.vacancyService', []).
value('version', '0.1')
.service('Vacancy', function($http) {
    var url = "http://localhost:9000/"
    //var url = "http://guarded-atoll-31281.herokuapp.com/"
    this.getVacancies = function(callback){
        $http({
            method: 'GET',
            url: url+'getVacancies'
        }).
        success(function (data, status, headers, config) {
            callback(null,data)
        }).
        error(function (data, status, headers, config) {
            callback("Error")
        }
        );    
    }
    this.getCandidates = function(callback){
        $http({
            method: 'GET',
            url: url+'getCandidates'
        }).
        success(function (data, status, headers, config) {
            callback(null,data)
        }).
        error(function (data, status, headers, config) {
            callback("Error")
        });
    } 
})