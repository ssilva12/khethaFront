'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

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

  });
