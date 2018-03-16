angular.module('myApp.vacancyController', ['ui.select', 'ADM-dateTimePicker', 'ui.bootstrap']).
controller('vacancyDetailController', ['$scope', '$rootScope', '$stateParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'vacancyService', '$state', 'keepData', 'candidatesServices', '$compile', function ($scope, $rootScope, $stateParams, Mensaje, Dictionary, $parse, $timeout, vacancyService, $state, keepData, candidatesServices, $compile) {
    $scope.Dato = {};
    $scope.titulo = "";
    $scope.Data = {};
    $scope.lista = {};
    $scope.lista.candidatos = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
    $scope.featuresModified = [];
    $scope.methaFeatures = [];
    $scope.variablesGlobales = {};
    $scope.sortType = '-score';
    $scope.sortReverse = false;

    $scope.variablesGlobales.estados = [{
        value: "A",
        label: "Asignado"
    }, {
        value: "P",
        label: "En proceso de selección"
    }, {
        value: "F",
        label: "Disponible"
    }, {
        value: "N",
        label: "No disponible"
    }];

    $scope.crearVacante = function () {
        Mensaje.Esperar("Creando vacante");
        var vacante = vacancyService.createVacancy($scope.Dato.employerSelected.id, $scope.Dato.jobSelected.id, function (result) {
            if (!result.error) {
                console.log(result);
                $scope.cargarVacante(result.data.id);
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    };

    $scope.guardarDatos = function () {
        Mensaje.Esperar("Guardando información");
        var allData = vacancyService.updateInformation($scope.Data.vacancy, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarVacante($scope.Data.vacancy.id);
                Mensaje.Alerta("success", 'OK', result.message);
            } else {
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
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
                if (result.data.vacancy.conditionalProbability == "TRUE") {
                    result.data.vacancy.conditionalProbability = true
                }
                $scope.Data = result.data;
                $scope.Data.cantidadpreselected = $scope.Data.preselected.length + "/" + $scope.Data.concur.length
                $scope.Data.cantidadselected = $scope.Data.selected.length + "/" + $scope.Data.concur.length
                $scope.Dato.tab = $rootScope.activeTabVacancy != null && $rootScope.activeTabVacancy != undefined ? $rootScope.activeTabVacancy : "tab1";
                $scope.Dato.searched = $rootScope.searchedCandidate != null && $rootScope.searchedCandidate != undefined ? $rootScope.searchedCandidate : "";
                Mensaje.Esperar();
                vacancyService.getCandidatesScore(id, function (result) {
                    Mensaje.Desocupar();
                    if (!result.error) {
                        for (var index = 0; index < $scope.Data.concur.length; index++) {
                            var candidate = buscarScore($scope.Data.concur[index].id, result.data);
                            if (candidate != null) {
                                $scope.Data.concur[index].score = candidate.score;
                                $scope.Data.concur[index].scorePercentage = candidate.scorePercentage;
                            } else {
                                $scope.Data.concur[index].score = 0;
                                $scope.Data.concur[index].scorePercentage = 0;
                            }
                        }
                        for (var index = 0; index < $scope.Data.preselected.length; index++) {
                            var candidate = buscarScore($scope.Data.preselected[index].id, result.data);
                            if (candidate != null) {
                                $scope.Data.preselected[index].score = candidate.score;
                                $scope.Data.preselected[index].scorePercentage = candidate.scorePercentage;
                            } else {
                                $scope.Data.preselected[index].score = 0;
                                $scope.Data.preselected[index].scorePercentage = 0;
                            }
                        }
                        for (var index = 0; index < $scope.Data.selected.length; index++) {
                            var candidate = buscarScore($scope.Data.selected[index].id, result.data);
                            if (candidate != null) {
                                $scope.Data.selected[index].score = candidate.score;
                                $scope.Data.selected[index].scorePercentage = candidate.scorePercentage;
                            } else {
                                $scope.Data.selected[index].score = 0;
                                $scope.Data.selected[index].scorePercentage = 0;
                            }
                        }
                    }
                });

                Mensaje.Esperar();
                $scope.disableCandidates();
                vacancyService.getMethaFeatures($scope.Data.vacancy.idEmployer, $scope.Data.vacancy.idJob, $scope.Data.vacancy.id, "", "", function (result) {
                    Mensaje.Desocupar();
                    if (!result.error) {
                        $scope.methaFeatures = result.data;
                        $scope.showValue = "w";
                    }
                })
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    };

    var buscarScore = function (idCandidate, arrayScore) {
        var valor = null;
        for (var index = 0; index < arrayScore.length; index++) {
            if (arrayScore[index].candidateId == idCandidate) {
                valor = arrayScore[index];
                break;
            }
        }
        return valor;
    };

    $scope.disableCandidates = function () {
        for (index = 0; index < $scope.Data.selected.length; index++) {
            for (index2 = 0; index2 < $scope.Data.preselected.length; index2++) {
                if ($scope.Data.selected[index].id == $scope.Data.preselected[index2].id) {
                    $scope.Data.preselected[index2].disabled = true;
                }
            }
            for (index2 = 0; index2 < $scope.Data.concur.length; index2++) {
                if ($scope.Data.selected[index].id == $scope.Data.concur[index2].id) {
                    $scope.Data.concur[index2].disabled = true;
                }
            }
        }
        for (index = 0; index < $scope.Data.preselected.length; index++) {
            for (index2 = 0; index2 < $scope.Data.concur.length; index2++) {
                if ($scope.Data.preselected[index].id == $scope.Data.concur[index2].id) {
                    $scope.Data.concur[index2].disabled = true;
                }
            }
        }
    }


    $scope.greaterThan = function (prop, val) {
        return function (item) {
            return item[prop] > val;
        }
    }

    $scope.greaterThanMultiple = function (prop, prop2, prop3, val) {
        return function (item) {
            var value = 0;
            for (index = 0; index < item[prop].length; index++) {
                var value2 = item[prop][index] ? item[prop2][index] : item[prop3][index];
                value = value + value2;
            }
            return value > val;
        }
    }

    $scope.buscarDetalle = function (id) {
        keepData.set('searchedCandidate', id);
        $state.go('detail', {
            "id": id,
            "vacancyId": $scope.Data.vacancy.id,
        });
    };

    $scope.setActive = function (tab) {
        switch (tab) {
            case "tab1":
                $scope.titulo = " - Información";
                break;
            case "tab2":
                $scope.titulo = " - Metha características";
                break;
            case "tab3":
                $scope.titulo = " - Matriz de caracterización";
                break;
            case "tab4":
                $scope.titulo = " - Candidatos que concurren";
                break;
            case "tab5":
                $scope.titulo = " - Candidatos pre-seleccionados";
                break;
            case "tab6":
                $scope.titulo = " - Candidatos seleccionados";
                break;
        }
        keepData.set('activeTabVacancy', tab);
    };

    $scope.agregarCandidato = function (candidateId, relation) {
        Mensaje.Esperar();
        vacancyService.addCandidate(candidateId, $scope.Data.vacancy.id, relation, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarVacante($scope.Data.vacancy.id);
            } else {
                Mensaje.Alerta("error", "Error", result.message);
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
                    $scope.agregarCandidato(result.data.id, 'CND_CONCUR');
                } else {
                    Mensaje.Alerta("Error", "Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    //INIT
    var init = function () {
        if ($stateParams.id != null) {
            $scope.cargarVacante($stateParams.id);
        } else {

        }
    };
    init();
}]);