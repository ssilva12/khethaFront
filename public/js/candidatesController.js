angular.module('myApp.candidatesCtrl', ['ui.select', 'ADM-dateTimePicker']).
controller('candidatesController', ['$scope', '$stateParams', 'candidatesServices', 'Mensaje', 'Dictionary', '$parse', '$timeout', '$filter', function ($scope, $stateParams, candidatesServices, Mensaje, Dictionary, $parse, $timeout, $filter) {
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
    }, {
        value: "H",
        label: "Contratado"
    }];
    //Fin variables globales

    $scope.usuario = {};
    $scope.Opt = {}

    $scope.cargarCandidato = function (id) {
        Mensaje.Esperar();
        var allData = candidatesServices.getById(id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
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
            console.log(JSON.stringify(result.data))
            if (!result.error) {
                $scope.vacancy = []
                for (var index2 = 0; index2 < result.data.length; index2++) {
                    var exist = false;
                    var addFeature = {}
                    result.data[index2].features.forEach(feature => {
                        if (!existe(feature.nameId, feature) && feature.score <= 0 && feature.mandatory) {
                            exist = true;
                            addFeature = feature;
                            addFeature.dictionary = result.data[index2].dictionary;
                        }
                        if (exist) {
                            $scope.vacancy.push(addFeature);
                        }
                        exist = false;
                    });
                }
                var resultado = result.data;
            } else {
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
    };

    var existe = function (id, feature) {
        var value = false;
        for (var index = 0; index < $scope.usuario.features.length; index++) {
            if ($scope.usuario.features[index].idNoun == id) {
                $scope.usuario.features[index].score = feature.score;
                if (feature.mandatory && feature.score <= 0) {
                    $scope.usuario.features[index].noCumple = true;
                }
                value = true;
                break;
            }
        }
        return value;
    }

    $scope.getTotal = function (name) {
        var total = 0;
        if ($scope.usuario != null && $scope.usuario != undefined) {
            for (var index2 = 0; index2 < $scope.usuario.features.length; index2++) {
                if (name == $scope.usuario.features[index2].dictionary) {
                    total = total + ($scope.usuario.features[index2].score == null ? 0 : $scope.usuario.features[index2].score)
                }
            }
            return total;
        }
    }
    var init = function () {
        if ($stateParams.id != null) {
            $scope.cargarCandidato($stateParams.id);
        } else {
            $scope.usuario.jobs = [];
        }
    };
    init();

    $scope.agregarFeatureCopy = function (feature, methaFeature) {
        var featureCopy = {
            name: "",
            dictionary: methaFeature.dictionary,
            lastDate: "",
            lastUpdate: "",
            value: "",
            mrName: "",
            levelOrOrder: "",
            edit: true
        };

        $scope.usuario.features.push(featureCopy);
    };

    $scope.deleteFeature = function (feature) {
        Dictionary.deleteCandidateFeature(feature, function (error, data) {
            if (!error) {
                Mensaje.Alerta("success", 'OK', data.message);
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
            } else {
                Mensaje.Alerta("error", 'Error', data.message);
            }
        })
    };

    $scope.eliminarJob = function (job) {
        Mensaje.Esperar("SAVING_DATA");
        candidatesServices.removeCNDtoJOB($scope.usuario.candidateInfo.id, job, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                Mensaje.Alerta("success", 'OK', result.message);
            } else {
                $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
    };

    $scope.agregarJob = function () {
        var featureCopy = {
            name: "",
            score: "",
            edit: true
        };
        $scope.usuario.jobs.push(featureCopy);
    };

    $scope.guardarJob = function (job) {
        Mensaje.Esperar("SAVING_DATA");
        candidatesServices.assignCNDtoJOB($scope.usuario.candidateInfo.id, job, function (result) {
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

    //INICIO ACTUALIZACIONES DE DATOS
    $scope.actualizarCandidato = function () {
        Mensaje.Esperar("SAVING_DATA");
        if ($scope.usuario.candidateInfo.id != null || $scope.usuario.candidateInfo.id != undefined) {
            var allData = candidatesServices.updateInformation($scope.usuario, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            var allData = candidatesServices.createCandidate($scope.usuario, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
    };

    $scope.actualizarFeature = function (data) {
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

    $scope.createFeature = function (data) {
        Mensaje.Esperar("SAVING_DATA");
        candidatesServices.createFeature($scope.usuario.candidateInfo.id, data, function (result) {
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
            var resultado = candidatesServices.uploadFile(files[0], $scope.usuario.paisCV, $scope.usuario.jobCV, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    if (result.data.code == 2) {
                        $scope.cargarCandidato(result.data.data.candidateId);
                    } else if (result.data.code == 1) {
                        $scope.exist = {}
                        $scope.exist.uploadExist = result.data.data
                        $('#myModalCandidate').modal('show');
                    }
                } else {
                    Mensaje.Alerta("error", "Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };

    $scope.crearCV = function () {
        $('#myModalCandidate').modal('hide');
        Mensaje.Esperar("UPLOADING_CV");
        candidatesServices.createByCV($scope.exist.uploadExist.idDoc, $scope.usuario.paisCV, $scope.usuario.jobCV, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarCandidato(result.data.candidateId);
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    }

    $scope.actualizarCV = function (candidateId) {
        $('#myModalCandidate').modal('hide');
        Mensaje.Esperar("UPLOADING_CV");
        candidatesServices.updateByCV(candidateId, $scope.exist.uploadExist.idDoc, $scope.usuario.paisCV, $scope.usuario.jobCV, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.cargarCandidato(result.data.candidateId);
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    }

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
                    $scope.cargarCandidato(result.data.data.candidateId);
                } else {
                    Mensaje.Alerta("error", "Error", result.message);
                }
            });
        };
        reader.onerror = function (error) {
            console.log('error: ', error);
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

    $scope.solveAsAsociation = function (caracteristica, name, dictionary, id) {
        if (caracteristica.nombre == "" || caracteristica.nombre == null || caracteristica.nombre == undefined) {
            Mensaje.Alerta("error", 'Error', 'CHOOSE_RESOLVE');
        } else {
            if (dictionary == "EmployerName") {
                Dictionary.getSynonyms(caracteristica.nombre, caracteristica.dictionary, 'null', function (error, result) {
                    if (!error) {
                        if (result.suggested.length == 0) {
                            Mensaje.Alerta("confirm", "", $filter('translate')('CREATE_FEATURE'), function () {
                                Dictionary.solveAsNoun(caracteristica.id, caracteristica.nombre, dictionary, function (error, result) {
                                    if (!error) {
                                        $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                                    }
                                })
                            }, function () {

                            }, "YES", "NO")
                        } else {
                            Dictionary.solveAsAsociation(caracteristica.idNoun, name, dictionary, id, function (error, result) {
                                if (!error) {
                                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                                }
                            })
                        }
                    }
                })
            } else {
                Dictionary.solveAsAsociation(caracteristica.idNoun, name, dictionary, id, function (error, result) {
                    if (!error) {
                        $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    }
                })
            }
        }
    }

    $scope.buscarDetalle = function (id) {
        Mensaje.Esperar();
        candidatesServices.getDocument(String(id), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                var str = JSON.stringify(result.data.document, undefined, 4);
                $scope.Document = syntaxHighlight(str);
                document.getElementById("data").appendChild(document.createElement('pre')).innerHTML = syntaxHighlight(str);
                $("#modalDocument").show();
            } else {
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    };

    $scope.closeModal = function () {
        $("#modalDocument").hide();
    };

    function syntaxHighlight(json) {
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }
            return '<span class="' + cls + '">' + match + '</span>';
        });
    }
}]);