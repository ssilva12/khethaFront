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
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos, acronimo) {
        var model = $parse(datos);
        var data = Dictionary.getSynonyms(string, tipo, acronimo, function (error, result) {
            if (!error) {
                console.log(result)
                if (result.suggested) {
                    console.log("como primario")
                    //$scope.data = [result.primary];
                    model.assign($scope, result.suggested);
                } else {
                    //$scope.data = result.suggested;
                    model.assign($scope, [result.primary]);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                //$scope.data = [];
                model.assign($scope, []);
            }
        });
    };
    
    $scope.fuseNouns = function (firstNoun,secondNoun) {
        Dictionary.fuse(firstNoun,secondNoun,function (error, data) {
            if (!error) {
                $state.reload();
                Mensaje.Alerta("success", 'OK', "OK");
                
            }
        });
    }
    
    $scope.onFocus = function (variable, index) {
        $parse(variable + index).assign($scope, true);
    }
    
    $scope.assignValue = function (mod, val) {
        $parse(mod).assign($scope, val);  
    }
    
    $scope.print = function (variable) {
        console.log(variable)
    } 
    $scope.onBlur = function (variable, index) {
        $timeout(function () {
            console.log('blur')
            $parse(variable + index).assign($scope, false);
        }, 125);
    }
}]);