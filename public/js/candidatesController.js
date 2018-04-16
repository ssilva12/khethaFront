angular.module('myApp.candidatesCtrl', ['ui.select', 'ADM-dateTimePicker']).
controller('candidatesController', ['$scope', '$stateParams', 'candidatesServices', 'Mensaje', 'Dictionary', '$parse', '$timeout', function ($scope, $stateParams, candidatesServices, Mensaje, Dictionary, $parse, $timeout) {
    //Variables globales
    $scope.variablesGlobales = {};
    $scope.variablesGlobales.expandir = false;
    $scope.variablesGlobales.metafeatures = [{
        value: 1,
        name: "estudios",
        label: "Estudios del candidato"
    }, {
        value: 2,
        name: "centros",
        label: "Centros educativos"
    }, {
        value: 3,
        name: "certificaciones",
        label: "Certificaciones"
    }, {
        value: 4,
        name: "experiencias",
        label: "Experiencias"
    }, {
        value: 5,
        name: "empleadores",
        label: "Empleadores"
    }, {
        value: 6,
        name: "idiomas",
        label: "Idiomas"
    }, {
        value: 7,
        name: "skills",
        label: "Habilidades/Skills"
    }, {
        value: 8,
        name: "caracteristicas",
        label: "Características"
    }, {
        value: 9,
        name: "caracteristicaspsicologicas",
        label: "Características psicológicas"
    }, {
        value: 10,
        name: "cargos",
        label: "Cargos a los que se ha postulado"
    }];
    $scope.variablesGlobales.sexo = [{
        value: 0,
        label: "MALE"
    }, {
        value: 1,
        label: "FEMALE"
    }];
    $scope.variablesGlobales.estados = [{
        value: "A",
        label: "ASSIGNED"
    }, {
        value: "P",
        label: "SELECTION_PROCESS"
    }, {
        value: "F",
        label: "AVAILABLE"
    }, {
        value: "N",
        label: "UNAVAILABLE"
    }];
    //Fin variables globales

    $scope.usuario = {};
    $scope.Opt = {}

    $scope.cargarCandidato = function (id) {
        Mensaje.Esperar();
        var allData = candidatesServices.getById(id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                console.log(result.data);
                $scope.usuario = result.data;
                if ($scope.usuario.candidateInfo.gps != null) {
                    var coordenadas = [];
                    coordenadas = $scope.usuario.candidateInfo.gps.split(';');
                    if (coordenadas.length == 2) {
                        $scope.usuario.candidateInfo.long = coordenadas[0];
                        $scope.usuario.candidateInfo.lat = coordenadas[1];
                    }
                }
                if ($scope.usuario.candidateInfo.birthdate != "null" && $scope.usuario.candidateInfo.birthdate != null) {
                    var parts = $scope.usuario.candidateInfo.birthdate.split('-');
                    $scope.usuario.candidateInfo.birthdate = new Date(parts[0], parts[1] - 1, parts[2]);
                }
                //Datos faltantes
                $scope.usuario.estudiosCertificaciones = [];
                $scope.usuario.caracteristicas = [];
                $scope.usuario.caracteristicasPsicologicas = [];

                if ($stateParams.vacancyId != null) {
                    $scope.cargarVacancy($stateParams.vacancyId, $stateParams.id);
                }
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    };

    $scope.aplica = function (prop, val, val2) {
        return function (item) {
            return item[prop] < val && item[val2] == true;
        }
    }

    $scope.cargarVacancy = function (vacancyId, candidateId) {
        var allData = candidatesServices.getVacancyInfo(vacancyId, candidateId, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.vacancy = []
                $scope.vacancy.jobFunctions = []
                $scope.vacancy.schooling = []
                $scope.vacancy.jobs = []
                $scope.vacancy.languages = []
                $scope.vacancy.skills = []
                $scope.vacancy.studies = []
                for (var index2 = 0; index2 < result.data.length; index2++) {
                    var exist = false;
                    var addFeature = {}
                    result.data[index2].features.forEach(feature => {
                        if (!existe(result.data[index2].name, feature.nameId, feature) && feature.score < 1 && feature.mandatory) {
                            exist = true;
                            addFeature = feature;
                            addFeature.dictionaryName = result.data[index2].name;
                        }
                    });
                    if (exist) {
                        switch (addFeature.dictionaryName) {
                            case "Job Function":
                                $scope.vacancy.jobFunctions.push(addFeature);
                                break;
                            case "Educational center":
                                $scope.vacancy.schooling.push(addFeature);
                                break;
                            case "Employer":
                                $scope.vacancy.jobs.push(addFeature);
                                break;
                            case "Language":
                                $scope.vacancy.languages.push(addFeature);
                                break;
                            case "Skill":
                                $scope.vacancy.skills.push(addFeature);
                                break;
                            case "Studies":
                                $scope.vacancy.studies.push(addFeature);
                                break;
                        }
                    }
                }


                var resultado = result.data;

                // for (index2 = 0; index2 < result.data.length; index2++) {
                //     var a = 0;
                //     result.data[index2].features.forEach(feature => {
                //         if (existe(result.data[index2].name, feature.nameId)) {
                //             result.data[index2].features.splice(a, 1);
                //         }
                //         a++;
                //     });
                // }
                // resultado = result.data;
                // $scope.vacancy = resultado;
            } else {
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
    };

    var existe = function (name, id, feature) {
        var value = false;

        switch (name) {
            case "Job Function":
                for (var index = 0; index < $scope.usuario.jobFunctions.length; index++) {
                    if ($scope.usuario.jobFunctions[index].idNoun == id) {
                        $scope.usuario.jobFunctions[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
            case "Educational center":
                for (var index = 0; index < $scope.usuario.schooling.length; index++) {
                    if ($scope.usuario.schooling[index].idNoun == id) {
                        $scope.usuario.schooling[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
            case "Employer":
                for (var index = 0; index < $scope.usuario.jobs.length; index++) {
                    if ($scope.usuario.jobs[index].idNoun == id) {
                        $scope.usuario.jobs[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
            case "Language":
                for (var index = 0; index < $scope.usuario.languages.length; index++) {
                    if ($scope.usuario.languages[index].idNoun == id) {
                        $scope.usuario.languages[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
            case "Skill":
                for (var index = 0; index < $scope.usuario.skills.length; index++) {
                    if ($scope.usuario.skills[index].idNoun == id) {
                        $scope.usuario.skills[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
            case "Studies":
                for (var index = 0; index < $scope.usuario.studies.length; index++) {
                    if ($scope.usuario.studies[index].idNoun == id) {
                        $scope.usuario.studies[index].score = feature.score;
                        value = true;
                        break;
                    }
                }
                break;
        }

        return value;
    }

    $scope.getTotal = function (name) {
        var total = 0;
        if ($scope.usuario != null && $scope.usuario != undefined) {
            switch (name) {
                case "Job Function":
                    if ($scope.usuario.jobFunctions != null && $scope.usuario.jobFunctions != undefined) {
                        for (var index = 0; index < $scope.usuario.jobFunctions.length; index++) {
                            total = total + ($scope.usuario.jobFunctions[index].score == null ? 0 : $scope.usuario.jobFunctions[index].score)
                        }
                    }
                    break;
                case "Educational center":
                    if ($scope.usuario.schooling != null && $scope.usuario.schooling != undefined) {
                        for (var index = 0; index < $scope.usuario.schooling.length; index++) {
                            total = total + ($scope.usuario.schooling[index].score == null ? 0 : $scope.usuario.schooling[index].score)
                        }
                    }
                    break;
                case "Employer":
                    if ($scope.usuario.jobs != null && $scope.usuario.jobs != undefined) {
                        for (var index = 0; index < $scope.usuario.jobs.length; index++) {
                            total = total + ($scope.usuario.jobs[index].score == null ? 0 : $scope.usuario.jobs[index].score)
                        }
                    }
                    break;
                case "Language":
                    if ($scope.usuario.languages != null && $scope.usuario.languages != undefined) {
                        for (var index = 0; index < $scope.usuario.languages.length; index++) {
                            total = total + ($scope.usuario.languages[index].score == null ? 0 : $scope.usuario.languages[index].score)
                        }
                    }
                    break;
                case "Skill":
                    if ($scope.usuario.skills != null && $scope.usuario.skills != undefined) {
                        for (var index = 0; index < $scope.usuario.skills.length; index++) {
                            total = total + ($scope.usuario.skills[index].score == null ? 0 : $scope.usuario.skills[index].score)
                        }
                    }
                    break;
                case "Studies":
                    if ($scope.usuario.studies != null && $scope.usuario.studies != undefined) {
                        for (var index = 0; index < $scope.usuario.studies.length; index++) {
                            total = total + ($scope.usuario.studies[index].score == null ? 0 : $scope.usuario.studies[index].score)
                        }
                    }
                    break;
            }
            return total;
        }
    }
    var init = function () {
        if ($stateParams.id != null) {
            $scope.cargarCandidato($stateParams.id);
        } else {
            $scope.usuario.jobs = [];
            $scope.usuario.schooling = [];
            $scope.usuario.jobFunctions = [];
            $scope.usuario.studies = [];
            $scope.usuario.estudiosCertificaciones = [];
            $scope.usuario.languages = [];
            $scope.usuario.skills = [];
            $scope.usuario.caracteristicas = [];
            $scope.usuario.caracteristicasPsicologicas = [];
        }
    };
    init();

    $scope.eliminarEstudio = function (estudio) {
        var index = $scope.usuario.studies.indexOf(estudio);
        $scope.usuario.studies.splice(index, 1);
    };

    $scope.agregarEstudio = function () {
        var estudio = {
            name: "",
            mrName: "",
            levelOrOrder: "",
            lastDate: "",
            pais: "",
            edit: true
        };
        $scope.usuario.studies.push(estudio);
    };

    $scope.eliminarCentroEstudio = function (estudio) {
        var index = $scope.usuario.schooling.indexOf(estudio);
        $scope.usuario.schooling.splice(index, 1);
    };

    $scope.agregarCentroEstudio = function () {
        var estudio = {
            name: "",
            pais: "",
            edit: true
        };
        $scope.usuario.schooling.push(estudio);
    };

    $scope.eliminarCertificado = function (estudio) {
        var index = $scope.usuario.estudiosCertificaciones.indexOf(estudio);
        $scope.usuario.estudiosCertificaciones.splice(index, 1);
    };

    $scope.agregarCertificado = function () {
        var estudio = {
            name: "",
            pais: "",
            edit: true
        };
        $scope.usuario.estudiosCertificaciones.push(estudio);
    };

    $scope.agregarExperiencia = function () {
        var experiencia = {
            name: "",
            lastDate: "",
            value: "",
            edit: true
        };
        $scope.usuario.jobFunctions.push(experiencia);
    };

    $scope.eliminarExperiencia = function (experiencia) {
        var index = $scope.usuario.experiencia.indexOf(experiencia);
        $scope.usuario.experiencia.splice(index, 1);
    };

    $scope.agregarEmpleador = function () {
        var empleador = {
            job: "",
            value: "",
            methaRelation: "",
            edit: true
        };
        $scope.usuario.jobs.push(empleador);
    };

    $scope.eliminarEmpleador = function (empleador) {
        var index = $scope.usuario.jobs.indexOf(empleador);
        $scope.usuario.jobs.splice(index, 1);
    };

    $scope.eliminarIdioma = function (idioma) {
        var index = $scope.usuario.idiomas.indexOf(idioma);
        $scope.usuario.languages.splice(index, 1);
    };

    $scope.agregarIdioma = function () {
        var idioma = {
            lenguageName: "",
            methaRelation: "",
            edit: true
        };
        $scope.usuario.languages.push(idioma);
    };

    $scope.agregarSkill = function () {
        var skill = {
            name: "",
            value: "",
            lastDate: "",
            edit: true
        };
        $scope.usuario.skills.push(skill);
    };

    $scope.eliminarSkill = function (skill) {
        var index = $scope.usuario.skills.indexOf(skill);
        $scope.usuario.skills.splice(index, 1);
    };

    $scope.eliminarCaracteristica = function (caracteristica) {
        var index = $scope.usuario.caracteristicas.indexOf(caracteristica);
        $scope.usuario.caracteristicas.splice(index, 1);
    };

    $scope.agregarCaracteristica = function () {
        var caracteristica = {
            nombre: "",
            valor: "",
            edit: true
        };
        $scope.usuario.caracteristicas.push(caracteristica);
    };

    $scope.eliminarCaracteristicaPsicologica = function (caracteristica) {
        var index = $scope.usuario.caracteristicasPsicologicas.indexOf(caracteristica);
        $scope.usuario.caracteristicasPsicologicas.splice(index, 1);
    };

    $scope.agregarCaracteristicaPsicologica = function () {
        var caracteristica = {
            nombre: "",
            valor: "",
            edit: true
        };
        $scope.usuario.caracteristicasPsicologicas.push(caracteristica);
    };

    //INICIO ACTUALIZACIONES DE DATOS
    $scope.actualizarCandidato = function () {
        Mensaje.Esperar("SAVING_DATA");
        if ($scope.usuario.candidateInfo.id != null || $scope.usuario.candidateInfo.id != undefined) {
            var allData = candidatesServices.updateInformation($scope.usuario, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            var allData = candidatesServices.createCandidate($scope.usuario, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
        $scope.cargarCandidato($scope.usuario.candidateInfo.id);
    };

    $scope.actualizarFeature = function (data, dictionary) {
        Mensaje.Esperar("SAVING_DATA");
        if (data.id != null && data.id != undefined) {
            var allData = candidatesServices.updateFeature(data, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            data.dictionary = dictionary
            var allData = candidatesServices.createFeature($scope.usuario.candidateInfo.id, data, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
    }

    $scope.createFeature = function (data, dictionary) {
        Mensaje.Esperar("SAVING_DATA");
        data.dictionary = dictionary
        candidatesServices.createFeature($scope.usuario.candidateInfo.id, data, function (result) {
            //Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                Mensaje.Alerta("success", 'OK', result.message);
            } else {
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
    }

    $scope.actualizarEstudios = function (estudio) {
        $scope.actualizarFeature(estudio, "StudiesName");
    }

    $scope.actualizarCentroEducativo = function (centro) {
        $scope.actualizarFeature(centro, "EducationalCenterName");
    }

    $scope.actualizarCertificacion = function (certificacion) {
        $scope.actualizarFeature(certificacion, "CertificateName");
    }

    $scope.actualizarExperiencia = function (experiencia) {
        $scope.actualizarFeature(experiencia, "JobFunctionName");
    }

    $scope.actualizarEmpleador = function (empleador) {
        $scope.actualizarFeature(empleador, "EmployerName");
    }

    $scope.actualizarIdioma = function (idioma) {
        $scope.actualizarFeature(idioma, "LanguageName");
    }

    $scope.actualizarSkill = function (skill) {
        $scope.actualizarFeature(skill, "SkillName");
    }

    $scope.actualizarCaracteristica = function (caracteristica) {
        $scope.actualizarFeature(caracteristica, "");
    }

    $scope.actualizarCaracteristicaPsicologica = function (caracteristica) {
        $scope.actualizarFeature(caracteristica, "PsychologicalCharacteristicsName");
    }

    $scope.uploadFile = function (files) {
        Mensaje.Esperar("UPLOADING_CV");
        var fd = new FormData();
        fd.append("file", files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFile(files[0], function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.cargarCandidato(result.data.id);
                } else {
                    Mensaje.Alerta("Error", "Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    $scope.uploadFormat = function (files) {
        Mensaje.Esperar("UPLOADING_CV");
        var fd = new FormData();
        fd.append("file", files[0]);
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFormat(files[0], function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.cargarCandidato(result.data.id);
                } else {
                    Mensaje.Alerta("Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    //FIN ACTUALIZACION DE DATOS
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos, acronimo) {
        var model = $parse(datos);
        var data = Dictionary.getSynonyms(string, tipo, acronimo, function (error, result) {
            if (!error) {
                console.log(result)
                if (result.suggested) {
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

    $scope.getAcronym = function (item) {
        $scope.usuario.candidateInfo.country = item.er;
        $scope.usuario.candidateInfo.acronym = item.acronym;
        console.log(item);
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

    $scope.solveAsAsociation = function (idNoun, name, dictionary, id) {
        Dictionary.solveAsAsociation(idNoun, name, dictionary, id, function (error, result) {
            if (!error) {
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
            }
        })
    }


}]);