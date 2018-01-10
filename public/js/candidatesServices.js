angular.module('myApp.candidatesServices', [])
    .factory('candidatesServices', function ($http) {

        var candidatesServices = {};
        //var url = "http://localhost:9000/"
        var url = "http://guarded-atoll-31281.herokuapp.com/"
        candidatesServices.uploadFile = function (file) {
            var fd = new FormData();
            fd.append('curriculum', file);
            var uploadUrl = url+'uploadCv';
            //debugger;
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
            .success(function(){
            })
            .error(function(){
            });
        };

        candidatesServices.getAll = function () {
            var Datos = $http.get('http://guarded-atoll-31281.herokuapp.com/getCandidates', {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "X-Requested-With"
                }
            }).then(function (res) {
                return res.data;
            }, function (error) {
                return error;
            });
            return Datos;
        };

        candidatesServices.getById = function (Id) {
            var Datos = $http.get('http://guarded-atoll-31281.herokuapp.com/candidate?id=' + Id, {
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET",
                    "Access-Control-Allow-Headers": "X-Requested-With"
                }
            }).then(function (res) {
                return res.data;
            }, function (error) {
                return error;
            });
            return Datos;
        };

        return candidatesServices;
    });