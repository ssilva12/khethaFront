angular.module('myApp.vacancyController', ['ui.select', 'ADM-dateTimePicker']).
controller('vacancyDetailController', ['$scope', '$rootScope', '$routeParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'vacancyService', '$location', 'keepData', function ($scope, $rootScope, $routeParams, Mensaje, Dictionary, $parse, $timeout, vacancyService, $location, keepData) {
    $scope.Dato = {};
    $scope.Data = {};
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
        value: "D",
        label: "Anulada"
    }, {
        value: "S",
        label: "Inferida"
    }];

    $scope.crearVacante = function () {
        var vacante = vacancyService.createVacancy($scope.Dato.employerSelected.id, $scope.Dato.jobSelected.id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                console.log(result);
                $scope.cargarVacante(result.data.id);
            } else {
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
                console.log(result.data)
                $scope.Data = result.data;
                $scope.Dato.tab = $rootScope.activeTabVacancy != null & $rootScope.activeTabVacancy != undefined ? $rootScope.activeTabVacancy : "tab1";
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    };

    $scope.buscarDetalle = function (id) {
        $location.path('/detail/' + id);
    };

    $scope.setActive = function (tab) {
        keepData.set('activeTabVacancy', tab);
    };

    $scope.agregarCandidato = function (candidateId, relation) {
        Mensaje.Esperar();
        vacancyService.addCandidate(candidateId, $scope.Data.vacancy.id, relation, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarVacante($scope.Data.vacancy.id);
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