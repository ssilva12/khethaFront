angular.module('myApp.unfoldCtrl', ['ui.bootstrap']).
controller('unfoldController', ['$scope', '$state', 'Mensaje', '$rootScope', 'Dictionary', '$parse', 'userService', 'keepData', '$timeout', function ($scope, $state, Mensaje, $rootScope, Dictionary, $parse, userService, keepData, $timeout) {
    console.log("unfold controller")
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
    
    $scope.search = function (name) {
        if ($scope.metaRelationSearch == undefined) {
            $scope.metaRelationSearch = {};
            $scope.metaRelationSearch.dictionary = null;
        }
        Dictionary.getSynonyms(name, $scope.metaRelationSearch.dictionary, $scope.acronym, function (error, data) {
            if (!error) {
                if (!data.primary) {
                   console.log("not found")
                } else {
                    console.log(data.synonyms);
                    $scope.synonyms = data.synonyms
                }
            }
        });
    }

    $scope.unfold = function (noun,nGram) {
        Dictionary.unfold(noun,nGram,function (error, data) {
            if (!error) {
                debugger;
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