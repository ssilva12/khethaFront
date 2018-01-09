angular.module('myApp.candidatesCtrl', [])
    .factory('candidatesServices', function ($http) {

        var candidatesServices = {};

        candidatesServices.uploadFile = function (file) {
            var data = {
                file: file
            };

            var Datos = $http({
                    url: 'http://polar-garden-35450.herokuapp.com/uploadCv',
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers": "X-Requested-With"
                    },
                    method: "POST",
                    data: {
                        'file': file
                    }
                })
                .then(function (res) {
                    return res.data.metaFeatures;
                }, function (error) {
                    return error;
                });
            return Datos;
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
                return res.data.metaFeatures;
            }, function (error) {
                return error;
            });
            return Datos;
        };

        return candidatesServices;
    });