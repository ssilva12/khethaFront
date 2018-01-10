angular.module('myApp.candidatesCtrl', []).
controller('candidatesController', function ($scope, $routeParams,candidatesServices) {
    //Variables globales
    $scope.variablesGlobales = {};
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

    $scope.user = {};
    $scope.user2 = {};

    $scope.cargarCandidato = function (id) {
        var allData = candidatesServices.getById(id);
        allData.then(function (result) {
            console.log(result);
        });

        //Variables que se deben cargar mediante servicios
        $scope.user.edit = false;
        $scope.user.name = "Jaime Enrique Garcia Sanchez";
        $scope.user.title = "Ingeniero de sistemas";
        $scope.user.id = "1234567890";
        $scope.user.username = "jegarcias";
        $scope.user.email = "jegarcias@intergrupo.com";
        $scope.user.sexo = "Masculino";
        $scope.user.estado = "En proceso de selección";
        $scope.user.tipoId = "Cédula de Ciudadanía";
        $scope.user.numeroId = "1143345423";
        $scope.user.telefono = "1234567890";
        $scope.user.direccion = "poblado";
        $scope.user.ciudad = "Medellín";
        $scope.user.pais = "Colombia";
        $scope.user.nacionalidad = "Colombiano";
        $scope.user.long = "6.123456789!0";
        $scope.user.lat = "-7.12345678!90";
        $scope.user.desde = "10/12/2006";
        $scope.user.ultimaAct = "23/06/2010";
        $scope.user.archivoCargado = false;
        $scope.user.nombreArchivo = "";
        $scope.user.file = null;
        $scope.user.categorias = ["Desarrollador", "Ingeniero", "Web", "C#", "RPA", "UIPath", "ASP.Net", "Javascript", "SQLServer", "MongoDB", "MySQL", "AngularJS"];
        $scope.user.estudios = [{
                id: "1",
                centroEducativo: "Centro de educación el recreo",
                grado: "Bachiller",
                titulo: "Bachiller academico",
                pais: "Colombia",
                fechaFin: "02/12/2007",
                edit: false
            },
            {
                id: "2",
                centroEducativo: "Fundación universitaria tecnologico comfenalco",
                grado: "Pregrado",
                titulo: "Tecnólogo en sistemas de información",
                pais: "Colombia",
                fechaFin: "01/12/2010",
                edit: false
            },
            {
                id: "3",
                centroEducativo: "Fundación universitaria tecnologico comfenalco",
                grado: "Pregrado",
                titulo: "Ingeniero de sistemas",
                pais: "Colombia",
                fechaFin: "02/12/2012",
                edit: false
            }
        ];
        $scope.user.experiencia = [{
            empresa: "SYSNET sas",
            cargo: "Desarrollador",
            fecha: "noviembre 2014 - noviembre de 2016",
            caracteristicas: "",
            funciones: "Programador asp.net",
            meses: "24",
            edit: false
        }, {
            empresa: "Evolution sc sas",
            cargo: "Desarrollador",
            fecha: "noviembre 2016 - noviembre de 2017",
            caracteristicas: "",
            funciones: "Programador y soporte tecnico",
            meses: "12",
            edit: false
        }, {
            empresa: "IG Services",
            cargo: "Ingeniero de desarrollo",
            fecha: "noviembre de 2017 - actualidad",
            caracteristicas: "",
            funciones: "Desarrollador IPA, desarrollador Web",
            meses: "1",
            edit: false
        }];
        $scope.user.skills = [{
                habilidad: "Angular",
                fecha: "20/12/2017",
                verificado: "No"
            },
            {
                habilidad: "UIPath",
                fecha: "15/12/2017",
                verificado: "Si"
            },
            {
                habilidad: "C#",
                fecha: "22/12/2014",
                verificado: "Si"
            }
        ];
        $scope.user.postulaciones = [{
                cargo: "Cargo1",
                empresa: "Empresa1",
                fecha: "01/01/0000",
                ranking: "2/10",
                seleccionado: "No"
            },
            {
                cargo: "Cargo2",
                empresa: "Empresa1",
                fecha: "01/01/0000",
                ranking: "4/10",
                seleccionado: "No"
            },
            {
                cargo: "Cargo3",
                empresa: "Empresa2",
                fecha: "01/01/0000",
                ranking: "10/10",
                seleccionado: "No"
            },
            {
                cargo: "Cargo4",
                empresa: "Empresa3",
                fecha: "01/01/0000",
                ranking: "4/10",
                seleccionado: "No"
            },
            {
                cargo: "Cargo5",
                empresa: "Empresa4",
                fecha: "01/01/0000",
                ranking: "2/10",
                seleccionado: "No"
            },
            {
                cargo: "Cargo6",
                empresa: "Empresa5",
                fecha: "01/01/0000",
                ranking: "1/10",
                seleccionado: "Si"
            },

        ];
        $scope.user.idiomas = [{
            nombre: "Español",
            nivel: "Alto",
            hablado: "B2",
            verificado: "Si"
        }, {
            nombre: "Ingles",
            nivel: "Medio",
            hablado: "B1",
            verificado: "No"
        }];
        //Fin variables
    };

    var init = function () {
        $scope.user.edit = true;
        if ($routeParams.id != null) {
            $scope.cargarCandidato($routeParams.id);
        }
    };
    init();

    $scope.isLoaded = false;
    $scope.selected;

    $scope.eliminarEstudio = function (estudio) {
        var index = $scope.user.estudios.indexOf(estudio);
        $scope.user.estudios.splice(index, 1);
    };

    $scope.agregarEstudio = function () {
        var estudio = {
            id: "",
            centroEducativo: "",
            grado: "",
            titulo: "",
            pais: "",
            fechaFin: "",
            edit: true
        };
        $scope.user.estudios.push(estudio);
    };

    $scope.agregarExperiencia = function () {
        var experiencia = {
            empresa: "",
            cargo: "",
            fecha: "",
            caracteristicas: "",
            funciones: "",
            meses: "",
            edit: true
        };
        $scope.user.experiencia.push(experiencia);
    };

    $scope.eliminarExperiencia = function (experiencia) {
        var index = $scope.user.experiencia.indexOf(experiencia);
        $scope.user.experiencia.splice(index, 1);
    };

    $scope.uploadFile = function (files) {
        var fd = new FormData();
        fd.append("file", files[0]);

        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
            var resultado = candidatesServices.uploadFile(files[0]);
            resultado.then(function (result) {});
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
});