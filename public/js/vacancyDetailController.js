angular.module('myApp.vacancyController', ['ui.select', 'ADM-dateTimePicker']).
controller('vacancyDetailController', ['$scope', '$rootScope', '$routeParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'vacancyService', '$location', 'keepData', 'candidatesServices', function ($scope, $rootScope, $routeParams, Mensaje, Dictionary, $parse, $timeout, vacancyService, $location, keepData, candidatesServices) {
    $scope.Dato = {};
    $scope.Data = {};
    $scope.lista = {};
    $scope.lista.candidatos = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
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
    $scope.autocompletarInputCandidato = function (string, datos, selected) {
        var model = $parse(datos);
        var modelSelect = $parse(selected + "Selected");
        modelSelect.assign($scope, "");
        candidatesServices.advSearch(String(string), "null", "null", "null", "null", "null", "1", "1000", function (result) {
            if (!result.error) {
                model.assign($scope, result.data.candidates);
            } else {
                model.assign($scope, []);
                Mensaje.Alerta("error", 'Error', result.message);
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
    $scope.assignCandidato = function (variable, item) {
        var model = $parse(variable);
        var modelSelect = $parse(variable + "Selected");
        model.assign($scope, item.name);
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
        $location.path('/detail/' + id + '/' + $scope.Data.vacancy.id);
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

    $scope.advSearch = function (name, country, status, skill, jobFunction, jobs, page, itemsPerPage) {
        Mensaje.Esperar();
        candidatesServices.advSearch(String(name), String(country), String(status), String(skill), String(jobFunction), String(jobs), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.candidatos = result.data.candidates;
                $scope.lista.cantidad = " (" + result.data.total + " candidato(s))";
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);
                console.log(result.data.candidates)

                $scope.Dato.namePaginado = name;
                $scope.Dato.countryPaginado = country;
                $scope.Dato.statusPaginado = status;
                $scope.Dato.skillPaginado = skill;
                $scope.Dato.jobFunctionPaginado = jobFunction;
                $scope.Dato.jobsPaginado = jobs;
            } else {
                $scope.lista.candidatos = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.uploadFile = function (files) {
        Mensaje.Esperar("Subiendo curriculum");
        var fd = new FormData();
        fd.append("file", files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFile(files[0], function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.agregarCandidato(result.data.id,'CND_CONCUR');
                } else {
                    Mensaje.Alerta("Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
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