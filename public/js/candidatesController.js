angular.module('myApp.candidatesCtrl', ['ui.select', 'ADM-dateTimePicker']).
controller('candidatesController', ['$scope', '$routeParams', 'candidatesServices', 'Mensaje', 'Dictionary', '$parse', '$timeout', function ($scope, $routeParams, candidatesServices, Mensaje, Dictionary, $parse, $timeout) {
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
        label: "Hombre"
    }, {
        value: 1,
        label: "Mujer"
    }];
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
    $scope.variablesGlobales.poblacion = [{
        value: 1,
        label: "Norte"
    }, {
        value: 2,
        label: "Centro"
    }, {
        value: 3,
        label: "Sur"
    }];
    $scope.variablesGlobales.paises = [{
        value: 1,
        label: "Colombia"
    }, {
        value: 2,
        label: "España"
    }, {
        value: 3,
        label: "EEUU"
    }];
    //Fin variables globales

    $scope.usuario = {};

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
                // debugger
                if ($scope.usuario.candidateInfo.birthdate != "null" && $scope.usuario.candidateInfo.birthdate != null) {
                    var parts = $scope.usuario.candidateInfo.birthdate.split('-');
                    $scope.usuario.candidateInfo.birthdate = new Date(parts[0], parts[1] - 1, parts[2]);
                }
                //Datos faltantes
                $scope.usuario.estudiosCertificaciones = [];
                $scope.usuario.caracteristicas = [];
                $scope.usuario.caracteristicasPsicologicas = [];
                $scope.usuario.postulaciones = [];
                // $scope.usuario.candidateInfo.title = "xxxxxxxxxxxxxx";
                // $scope.usuario.candidateInfo.username = "xxxxxxxxxx";
                // $scope.usuario.candidateInfo.sex = "";
                // $scope.usuario.candidateInfo.status = "";
                // $scope.usuario.candidateInfo.idNumber = "xxxxxxxxxx";
                // $scope.usuario.candidateInfo.poblacion = "";
                // $scope.usuario.candidateInfo.pais = "";


                // $scope.usuario.candidateInfo.desde = "xx/xx/xxxx";
                // $scope.usuario.candidateInfo.ultimaAct = "xx/xx/xxxx";
                // $scope.usuario.experiencia = [{
                //     job: "xxxxxxxxxx",
                //     fecha: "xx/xx/xxxx",
                //     meses: "xx",
                //     edit: false
                // }];
                // $scope.usuario.estudios = [{
                //     estudio: "xxxxxxxxxxxxxx",
                //     grado: "xxxxxxxxx",
                //     fechaTerminacion: "xx/xx/xxxx",
                //     pais: "",
                //     edit: false
                // }];
                // $scope.usuario.estudiosCertificaciones = [{
                //     estudio: "xxxxxxxxxxxxxxx",
                //     pais: "",
                //     edit: false
                // }];

                // $scope.usuario.skills = [{
                //     nombre: "xxxxxxxxxxxxxx",
                //     meses: "xx",
                //     fechaFin: "xx/xx/xxxx"
                // }];
                // $scope.usuario.caracteristicas = [{
                //     nombre: "",
                //     valor: ""
                // }];
                // $scope.usuario.caracteristicasPsicologicas = [{
                //     nombre: "",
                //     valor: 0
                // }];
                // $scope.usuario.postulaciones = [{
                //     job: "xxxxxxxxxxxx",
                //     fecha: "xx/xx/xxxx",
                //     empleador: "xxxxx",
                //     seleccionado: "No",
                //     ranking: "xx/xx"
                // }];
                //fin datos faltantes
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    };

    var init = function () {
        if ($routeParams.id != null) {
            $scope.cargarCandidato($routeParams.id);
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
            studyName: "",
            grado: "",
            fechaTerminacion: "",
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
            estudio: "",
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
        Mensaje.Esperar("Guardando información");
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

    };

    $scope.actualizarFeature = function (data, dictionary) {
        Mensaje.Esperar("Guardando información");
        if (data.id != null && data.id != undefined) {
            var allData = candidatesServices.updateFeature(data, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.cargarCandidato($scope.usuario.candidateInfo.id);
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
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
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
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
    //FIN ACTUALIZACION DE DATOS
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

    
}]);