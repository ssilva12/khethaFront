angular.module('myApp.vacancyController', ['ui.select', 'ADM-dateTimePicker']).
controller('vacancyDetailController', ['$scope', '$routeParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'vacancyService', function ($scope, $routeParams, Mensaje, Dictionary, $parse, $timeout, vacancyService) {
    $scope.Dato = {};
    $scope.variablesGlobales = {};
    $scope.variablesGlobales.estados = [{
        value: "A",
        label: "Asignada"
    }, {
        value: "P",
        label: "En proceso"
    }, {
        value: "C",
        label: "Cerrada"
    }, {
        value: "N",
        label: "Anulada"
    }, {
        value: "I",
        label: "Inferida"
    }];

    $scope.guardarDatos = function () {

    };

    $scope.getAcronym = function (item) {
        $scope.pais = item.er;
        $scope.acronym = item.acronym;
    };

    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos, acronimo, selected) {
        var model = $parse(datos);
        var modelSelect = $parse(selected + "Selected");
        modelSelect.assign($scope, "");
        var data = Dictionary.getSynonyms(string, tipo, acronimo, function (error, result) {
            if (!error) {
                if (result.suggested) {
                    model.assign($scope, result.suggested);
                } else {
                    model.assign($scope, [result.primary]);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                model.assign($scope, []);
            }
        });
    };

    //EVENTOS AUTOCOMPLETAR
    $scope.onFocus = function (variable, index) {
        $parse(variable + index).assign($scope, true);
    }
    $scope.onBlur = function (variable, index) {
        $timeout(function () {
            $parse(variable + index).assign($scope, false);
        }, 125);
    }
    $scope.assign = function (variable, item) {
        var model = $parse(variable);
        var modelSelect = $parse(variable + "Selected");
        model.assign($scope, item.er);
        modelSelect.assign($scope, item);
    }
}]);