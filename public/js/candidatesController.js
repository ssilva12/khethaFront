angular.module('myApp.candidatesCtrl', []).
controller('candidatesController', ['$scope', '$routeParams', 'candidatesServices', 'Mensaje', function ($scope, $routeParams, candidatesServices, Mensaje) {
    //Variables globales
    $scope.variablesGlobales = {};
    $scope.variablesGlobales.expandir = false;
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
                $scope.usuario.candidateInfo.codigoPostal = "xxxx";
                $scope.usuario.candidateInfo.pais = "";
                $scope.usuario.candidateInfo.nacionalidad = "";


                $scope.usuario.candidateInfo.desde = "xx/xx/xxxx";
                $scope.usuario.candidateInfo.ultimaAct = "xx/xx/xxxx";
                $scope.usuario.experiencia = [{
                    job: "xxxxxxxxxx",
                    fecha: "xx/xx/xxxx",
                    meses: "xx",
                    edit: false
                }];
                $scope.usuario.estudios = [{
                    estudio: "xxxxxxxxxxxxxx",
                    grado: "xxxxxxxxx",
                    fechaTerminacion: "xx/xx/xxxx",
                    pais: "",
                    edit: false
                }];
                $scope.usuario.estudiosCertificaciones = [{
                    estudio: "xxxxxxxxxxxxxxx",
                    pais: "",
                    edit: false
                }];
                $scope.usuario.idiomas = [{
                    nombre: "xxxxxxxxxx",
                    leido: "xx",
                    hablado: "xx",
                    escrito: "xx"
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
                Mensaje.Mostrar("error", result.message);
            }
        });
    };

    var init = function () {
        if ($routeParams.id != null) {
            $scope.cargarCandidato($routeParams.id);
        } else {
            $scope.usuario.jobs = [];
            $scope.usuario.schooling = [];
            $scope.usuario.experiencia = [];
            $scope.usuario.estudios = [];
            $scope.usuario.estudiosCertificaciones = [];
            $scope.usuario.idiomas = [];
            $scope.usuario.skills = [];
            $scope.usuario.caracteristicas = [];
            $scope.usuario.caracteristicasPsicologicas = [];
        }
    };
    init();

    $scope.eliminarEstudio = function (estudio) {
        var index = $scope.usuario.estudios.indexOf(estudio);
        $scope.usuario.estudios.splice(index, 1);
    };

    $scope.agregarEstudio = function () {
        var estudio = {
            estudio: "",
            grado: "",
            fechaTerminacion: "",
            pais: "",
            edit: true
        };
        $scope.usuario.estudios.push(estudio);
    };

    $scope.eliminarCentroEstudio = function (estudio) {
        var index = $scope.usuario.schooling.indexOf(estudio);
        $scope.usuario.schooling.splice(index, 1);
    };

    $scope.agregarCentroEstudio = function () {
        var estudio = {
            jobName: "",
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
            job: "",
            fecha: "",
            meses: "",
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
            nombre: "",
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
            meses: "",
            fechaFin: "",
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

    $scope.actualizarCandidato = function () {

        var allData = candidatesServices.updateInformation($scope.usuario.candidateInfo, function (result) {
            if (!result.error) {
                Mensaje.Mostrar("success", result.message);
            } else {
                Mensaje.Mostrar("error", result.message);
            }
        });
    };
}]);