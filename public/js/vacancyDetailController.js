angular.module('myApp.vacancyController', ['ui.select', 'ADM-dateTimePicker']).
controller('vacancyDetailController', ['$scope', '$routeParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'vacancyService', function ($scope, $routeParams, Mensaje, Dictionary, $parse, $timeout, vacancyService) {
    $scope.Dato = {};
    $scope.vacancy = {};
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

    $scope.crearVacante = function () {
        var vacante = vacancyService.createVacancy(Dato.employerSelected.id, Dato.jobSelected.id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {} else {
                Mensaje.Alerta("error", result.message);
            }
        });
    };

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

    $scope.cargarVacante = function (id) {
        Mensaje.Esperar();
        var allData = vacancyService.getById(id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                console.log(result.data);
                $scope.vacancy = result.data.vacancy;
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    };

    //INIT
    var init = function () {
        if ($routeParams.id != null) {
            $scope.cargarVacante($routeParams.id);
        } else {

        }
    };
    init();
}]);