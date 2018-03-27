angular.module('myApp.fuseCtrl', ['ui.bootstrap']).
controller('fuseController', ['$scope', '$state', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'userService', 'keepData', '$timeout', function ($scope, $state, Mensaje, $rootScope, Dictionary, $parse, userService, keepData, $timeout) {
    getMeta();
    function getMeta() {
        Dictionary.getMetaFeatures(function (error, data) {
            if (!error) {
                $scope.metaFeatures = data.metaFeatures;
            }
        });
    }
}]);