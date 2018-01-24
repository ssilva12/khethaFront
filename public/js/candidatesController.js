angular.module('myApp.candidatesCtrl', ['ui.select']).
controller('candidatesController', ['$scope', '$routeParams', 'candidatesServices', 'Mensaje', 'Dictionary', function ($scope, $routeParams, candidatesServices, Mensaje, Dictionary) {
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
        value: 1,
        label: "Femenino"
    }, {
        value: 2,
        label: "Masculino"
    }, {
        value: 3,
        label: "Indefinido"
    }];
    $scope.variablesGlobales.estados = [{
        value: 1,
        label: "Asignado"
    }, {
        value: 2,
        label: "En proceso de selección"
    }, {
        value: 3,
        label: "Disponible"
    }, {
        value: 4,
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
        var allData = candidatesServices.getById(id, function (result) {
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
                //Datos faltantes
                $scope.usuario.candidateInfo.title = "xxxxxxxxxxxxxx";
                $scope.usuario.candidateInfo.username = "xxxxxxxxxx";
                $scope.usuario.candidateInfo.sex = "";
                $scope.usuario.candidateInfo.status = "";
                $scope.usuario.candidateInfo.idNumber = "xxxxxxxxxx";
                $scope.usuario.candidateInfo.poblacion = "";
                $scope.usuario.candidateInfo.pais = "";


                $scope.usuario.candidateInfo.desde = "xx/xx/xxxx";
                $scope.usuario.candidateInfo.ultimaAct = "xx/xx/xxxx";
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
                $scope.usuario.estudiosCertificaciones = [{
                    estudio: "xxxxxxxxxxxxxxx",
                    pais: "",
                    edit: false
                }];

                // $scope.usuario.skills = [{
                //     nombre: "xxxxxxxxxxxxxx",
                //     meses: "xx",
                //     fechaFin: "xx/xx/xxxx"
                // }];
                $scope.usuario.caracteristicas = [{
                    nombre: "",
                    valor: ""
                }];
                $scope.usuario.caracteristicasPsicologicas = [{
                    nombre: "",
                    valor: 0
                }];
                $scope.usuario.postulaciones = [{
                    job: "xxxxxxxxxxxx",
                    fecha: "xx/xx/xxxx",
                    empleador: "xxxxx",
                    seleccionado: "No",
                    ranking: "xx/xx"
                }];
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
            educationalCenterName: "",
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
        $scope.usuario.experiencia.push(experiencia);
    };

    $scope.eliminarExperiencia = function (experiencia) {
        var index = $scope.usuario.experiencia.indexOf(experiencia);
        $scope.usuario.experiencia.splice(index, 1);
    };

    $scope.agregarEmpleador = function () {
        var empleador = {
            job: "",
            fecha: "",
            meses: "",
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
        $scope.usuario.idiomas.splice(index, 1);
    };

    $scope.agregarIdioma = function () {
        var idioma = {
            lenguageName: "",
            leido: "",
            hablado: "",
            escrito: "",
            edit: true
        };
        $scope.usuario.idiomas.push(idioma);
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
        if ($scope.usuario.candidateInfo.userId != null || $scope.usuario.candidateInfo.userId != undefined) {
            var allData = candidatesServices.updateInformation($scope.usuario, function (result) {
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            var allData = candidatesServices.createCandidate($scope.usuario, function (result) {
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }

    };

    $scope.actualizarFeature = function (data) {
        var allData = candidatesServices.updateFeature(data, function (result) {
            if (!result.error) {
                Mensaje.Alerta("success", 'OK', result.message);
            } else {
                Mensaje.Alerta("error", 'Error', result.message);
            }
        });
    }

    $scope.actualizarEstudios = function (estudio) {
        $scope.actualizarFeature(estudio);
    }

    $scope.actualizarCentroEducativo = function (centro) {
        $scope.actualizarFeature(centro);
    }

    $scope.actualizarCertificacion = function (certificacion) {
        $scope.actualizarFeature(certificacion);
    }

    $scope.actualizarExperiencia = function (experiencia) {
        $scope.actualizarFeature(experiencia);
    }

    $scope.actualizarEmpleador = function (empleador) {
        $scope.actualizarFeature(empleador);
    }

    $scope.actualizarIdioma = function (idioma) {
        $scope.actualizarFeature(idioma);
    }

    $scope.actualizarSkill = function (skill) {
        $scope.actualizarFeature(skill);
    }

    $scope.actualizarCaracteristica = function (caracteristica) {
        $scope.actualizarFeature(caracteristica);
    }

    $scope.actualizarCaracteristicaPsicologica = function (caracteristica) {
        $scope.actualizarFeature(caracteristica);
    }
    //FIN ACTUALIZACION DE DATOS
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo) {
        var data = Dictionary.getSynonyms(string, tipo, 'null', function (error, result) {
            if (!error) {
                $scope.data = result.suggested;
            } else {
                Mensaje.Alerta("error", 'Error', '');
                $scope.data = [];
            }
        });

    };
}]);