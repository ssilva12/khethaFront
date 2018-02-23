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
                if ($scope.usuario.candidateInfo.birthdate != "null" && $scope.usuario.candidateInfo.birthdate != null) {
                    var parts = $scope.usuario.candidateInfo.birthdate.split('-');
                    $scope.usuario.candidateInfo.birthdate = new Date(parts[0], parts[1] - 1, parts[2]);
                }
                //Datos faltantes
                $scope.usuario.estudiosCertificaciones = [];
                $scope.usuario.caracteristicas = [];
                $scope.usuario.caracteristicasPsicologicas = [];

                if ($routeParams.vacancyId != null) {
                    $scope.cargarVacancy($routeParams.vacancyId, $routeParams.id);
                }
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    };

    $scope.aplica = function (prop, val, val2) {
        return function (item) {
            return item[prop] < val && item[val2] == true;
        }
    }

    $scope.cargarVacancy = function (vacancyId, candidateId) {
        //invocar el metodo del service
        $scope.vacancy = [{
            "id": "6373",
            "name": "Job Function",
            "order": 45,
            "methaRelationIds": ["9468", "9469", "9470", "9471", "9472", "9473", "9474"],
            "levelNames": ["< 6 Meses", "Entre 6 y 12 Meses", "Entre 12 y 18 Meses", "Entre 18 y 24 Meses", "Entre 24 y 36 Meses", "Entre 36 y 60 Meses", "> 60 Meses"],
            "maxScore": 51,
            "score": 4.705882549285889,
            "scorePercentage": 9.22722053527832,
            "features": [{
                "id": "37011",
                "name": "Jefe de Almacén",
                "nameId": "33539",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0.5882353186607361,
                "score": 10,
                "scorePercentage": 0
            }, {
                "id": "36887",
                "name": "Repartidora de correo",
                "nameId": "34339",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36755",
                "name": "HELPDESK",
                "nameId": "22463",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36993",
                "name": "Consultor Junior",
                "nameId": "16127",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36873",
                "name": "MANIPULACIÓN Y CONSERVACIÓN DE ALIMENTOS",
                "nameId": "31676",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36867",
                "name": "Comercial",
                "nameId": "35856",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36985",
                "name": "TÉCNICO DE FORMACIÓN",
                "nameId": "32637",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27993",
                "name": "Administrativa",
                "nameId": "16130",
                "featureIds": ["28025", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9468", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 5.88235330581665,
                "score": 2.941176652908325,
                "scorePercentage": 50
            }, {
                "id": "36901",
                "name": "Manipulador textil",
                "nameId": "34301",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36889",
                "name": "Redactora de periódico",
                "nameId": "34335",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27986",
                "name": "Técnico de sistemas",
                "nameId": "16135",
                "featureIds": [null, null, null, "28016", null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, "9471", null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.1764706373214722,
                "score": 1.1764706373214722,
                "scorePercentage": 100
            }, {
                "id": "36723",
                "name": "Teleoperador",
                "nameId": "31301",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.1764706373214722,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36835",
                "name": "Preparación de pedidos",
                "nameId": "31246",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37003",
                "name": "Logística Industrial",
                "nameId": "27428",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37033",
                "name": "Logística",
                "nameId": "33536",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36907",
                "name": "CAPTACIÓN DE CUENTAS",
                "nameId": "21899",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.1764706373214722,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36751",
                "name": "Promoción social",
                "nameId": "33629",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37041",
                "name": "Responsable del departamento de logística",
                "nameId": "31065",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36969",
                "name": "Docente",
                "nameId": "32142",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36943",
                "name": "Ferretero",
                "nameId": "35740",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36981",
                "name": "TÉCNICAS DE SELECCIÓN DE PERSONAL",
                "nameId": "32380",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36983",
                "name": "TÉCNICO DE SELECCIÓN",
                "nameId": "32185",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36937",
                "name": "Soldador",
                "nameId": "31284",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36995",
                "name": "Ingeniero de proyectos",
                "nameId": "16171",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27988",
                "name": "Ingeniero de soporte",
                "nameId": "16167",
                "featureIds": [null, "27988", null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, "9469", null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0.5882353186607361,
                "scorePercentage": 100
            }, {
                "id": "36821",
                "name": "Recepcionista",
                "nameId": "31244",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36871",
                "name": "Cajera",
                "nameId": "31129",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36827",
                "name": "Dependiente",
                "nameId": "31191",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37013",
                "name": "Carretillero",
                "nameId": "31177",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36735",
                "name": "Secretaria de dirección",
                "nameId": "31033",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.1764706373214722,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36761",
                "name": "Grabadora y verificadora de datos",
                "nameId": "33588",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.1764706373214722,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36949",
                "name": "Fabricación de núcleos",
                "nameId": "35717",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36687",
                "name": "Gestión de proyectos",
                "nameId": "16158",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37029",
                "name": "Almacenaje de mercancías",
                "nameId": "31130",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36965",
                "name": "Gestor call center",
                "nameId": "32133",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36925",
                "name": "Operario de maquinaria",
                "nameId": "34772",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36877",
                "name": "REDACCIÓN Y EDICIÓN DE INFORMATIVOS",
                "nameId": "34362",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5882353186607361,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6367",
            "name": "City",
            "order": -8,
            "methaRelationIds": ["795", "797"],
            "levelNames": ["Ubicación", "Lugar de nacimiento"],
            "maxScore": 10,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "36951",
                "name": "Pantoja",
                "nameId": "35678",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 10,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36717",
                "name": "Madrid",
                "nameId": "12236",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36857",
                "name": "Guadalajara",
                "nameId": "12451",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36903",
                "name": "Rhodes",
                "nameId": "34255",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27983",
                "name": "Barcelona",
                "nameId": "11942",
                "featureIds": ["27983", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["795", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6366",
            "name": "Educational center",
            "order": 65,
            "methaRelationIds": ["7171"],
            "levelNames": ["Unike"],
            "maxScore": 5,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "36879",
                "name": "Universidad Complutense de Madrid",
                "nameId": "32093",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 20,
                "scorePercentage": 0
            }, {
                "id": "36707",
                "name": "Universidad de Alcalá de Henares",
                "nameId": "35229",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36977",
                "name": "Universidad Nacional de Educación a Distancia",
                "nameId": "32175",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36997",
                "name": "UPC",
                "nameId": "13408",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6369",
            "name": "Employer",
            "order": 60,
            "methaRelationIds": ["7658", "7662"],
            "levelNames": ["Empleado por", "Empleado para"],
            "maxScore": 57,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "36957",
                "name": "NEGOCIOS ALARCOS S.L",
                "nameId": "32112",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 10,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37039",
                "name": "C.G ALBORADA",
                "nameId": "33522",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36955",
                "name": "Iberinform",
                "nameId": "32109",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36713",
                "name": "Conway The Convenience Company",
                "nameId": "34488",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36959",
                "name": "DENNIS NAKAKITA S.A.",
                "nameId": "32118",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36945",
                "name": "Y  GARCIA, S.A",
                "nameId": "35727",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36851",
                "name": "CENTRAL DE ENVASADOS  S.A",
                "nameId": "34591",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36753",
                "name": "EXTEL CRM",
                "nameId": "33622",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36861",
                "name": "Montalvo Artesana S.L",
                "nameId": "35850",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27991",
                "name": "COLOMER GROUP",
                "nameId": "14417",
                "featureIds": ["27991", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["7658", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36921",
                "name": "HORMIGONES EFAYE, S.L",
                "nameId": "34785",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37027",
                "name": "Discos Mercurio",
                "nameId": "31076",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37023",
                "name": "Duracell",
                "nameId": "31081",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36973",
                "name": "Grupo Colón IECM",
                "nameId": "32163",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27992",
                "name": "DIMALAR",
                "nameId": "14463",
                "featureIds": ["27992", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["7658", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36899",
                "name": "C&A Modas S.L.U",
                "nameId": "34303",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36869",
                "name": "Banc Sabadell",
                "nameId": "14339",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37001",
                "name": "T-Systems",
                "nameId": "14868",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36895",
                "name": "Talleres Meco Yubero, S.L",
                "nameId": "34322",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36893",
                "name": "Consejería de Cultura de Castilla",
                "nameId": "34330",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36845",
                "name": "IRON MOUNTAIN",
                "nameId": "34602",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36941",
                "name": "Cobsa S.L.",
                "nameId": "35736",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36963",
                "name": "INTECSA INDUSTRIAL",
                "nameId": "32125",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37031",
                "name": "Grupo Raxon",
                "nameId": "31084",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36847",
                "name": "OPERINTER",
                "nameId": "34598",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37035",
                "name": "Grupo Mediapubli",
                "nameId": "31091",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36971",
                "name": "INEM",
                "nameId": "32151",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36747",
                "name": "Obus, Circuit Pres S.A",
                "nameId": "33614",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36745",
                "name": "Zeninth Producciones",
                "nameId": "33609",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27996",
                "name": "CIRSA",
                "nameId": "14416",
                "featureIds": ["27996", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["7658", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36863",
                "name": "Caja Castilla",
                "nameId": "35847",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36757",
                "name": "TRASCOM",
                "nameId": "33626",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36843",
                "name": "CPL IBERICA",
                "nameId": "34607",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36831",
                "name": "LOGÍSTICA M-25",
                "nameId": "34626",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36849",
                "name": "AMAZON",
                "nameId": "32710",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36919",
                "name": "AGUIRRE Y BLAS ASESORES, S.L",
                "nameId": "34791",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36897",
                "name": "Granja Cantos Blancos, de Alovera",
                "nameId": "34314",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36967",
                "name": "el C.A.U",
                "nameId": "32375",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36837",
                "name": "MONTAJES AZUDENSES, SL",
                "nameId": "34617",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36975",
                "name": "Academia CENES",
                "nameId": "32171",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36953",
                "name": "VESTAS",
                "nameId": "32100",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36923",
                "name": "OPTIMAL CARE, S.A",
                "nameId": "34779",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36947",
                "name": "CARBURES AEROSPACE",
                "nameId": "35722",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36853",
                "name": "SYNERGIE",
                "nameId": "34588",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36823",
                "name": "D LAX S.L",
                "nameId": "34643",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37005",
                "name": "Okavango Energy",
                "nameId": "14891",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36939",
                "name": "Industrial Olmar S.A.",
                "nameId": "35730",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36833",
                "name": "AITENA",
                "nameId": "34621",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37025",
                "name": "Recreativos Franco, S.A.",
                "nameId": "31070",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27994",
                "name": "SISDIGRAF",
                "nameId": "14985",
                "featureIds": ["27994", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["7658", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36891",
                "name": "Ayuntamiento de Guadalajara",
                "nameId": "34333",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "27985",
                "name": "ABSIS",
                "nameId": "14265",
                "featureIds": ["27985", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["7658", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36825",
                "name": "SUMINISTROS ESCRIBANO S.L",
                "nameId": "34637",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36839",
                "name": "ESTUDIO DE DANZA ESTHER",
                "nameId": "34611",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36829",
                "name": "EXEL Professional Line",
                "nameId": "34631",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36759",
                "name": "RECALL",
                "nameId": "33632",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36885",
                "name": "Correos y Telégrafos",
                "nameId": "34349",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6371",
            "name": "Language",
            "order": 40,
            "methaRelationIds": ["8179", "8183", "8194"],
            "levelNames": ["Hablado", "Escrito", "Leído"],
            "maxScore": 18,
            "score": 7.222222805023193,
            "scorePercentage": 40.12345886230469,
            "features": [{
                "id": "28001",
                "name": "Español",
                "nameId": "15213",
                "featureIds": ["28001", "36080", "36081", null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["8179", "8183", "8194", null, null, null, null, null, null, null, null, null],
                "weight": [9, 9, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 5.555555820465088,
                "score": 5.555555820465088,
                "scorePercentage": 100
            }, {
                "id": "36697",
                "name": "Francés",
                "nameId": "15218",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 1.1111111640930176,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28002",
                "name": "Catalán",
                "nameId": "15126",
                "featureIds": ["28002", null, "36082", null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["8179", null, "8194", null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5555555820465088,
                "score": 0.5555555820465088,
                "scorePercentage": 100
            }, {
                "id": "28003",
                "name": "Inglés",
                "nameId": "15285",
                "featureIds": [null, null, "28003", null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, "8194", null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 2.222222328186035,
                "score": 1.1111111640930176,
                "scorePercentage": 50
            }, {
                "id": "36695",
                "name": "Chino",
                "nameId": "15146",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.5555555820465088,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6392",
            "name": "Gender",
            "order": 20,
            "methaRelationIds": ["11717", "11718"],
            "levelNames": ["Hombre", "Mujer"],
            "maxScore": 7,
            "score": 20,
            "scorePercentage": 285.71429443359375,
            "features": [{
                "id": "35983",
                "name": "Gender",
                "nameId": "36088",
                "featureIds": [null, "35983", null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, "11718", null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 20,
                "score": 0,
                "scorePercentage": 100
            }]
        }, {
            "id": "6368",
            "name": "Country",
            "order": -9,
            "methaRelationIds": ["6358", "6359"],
            "levelNames": ["Ubicación", "Nacionalidad"],
            "maxScore": 10,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "36905",
                "name": "Francia",
                "nameId": "13658",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 10,
                "scorePercentage": 0
            }, {
                "id": "27982",
                "name": "España",
                "nameId": "31980",
                "featureIds": ["27982", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["6358", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36859",
                "name": "México",
                "nameId": "14113",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6394",
            "name": "Skill",
            "order": 50,
            "methaRelationIds": ["9477", "9478", "9479", "9480", "9481", "9482", "9483"],
            "levelNames": ["< 6 Meses", "Entre 6 y 12 Meses", "Entre 12 y 18 Meses", "Entre 18 y 24 Meses", "Entre 24 y 36 Meses", "Entre 36 y 60 Meses", "> 60 Meses"],
            "maxScore": 65,
            "score": 12.307695388793945,
            "scorePercentage": 18.93491554260254,
            "features": [{
                "id": "28015",
                "name": "PROGRAMACIÓN",
                "nameId": "19247",
                "featureIds": ["28015", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 1.2307692766189575,
                "score": 1.2307692766189575,
                "scorePercentage": 100
            }, {
                "id": "28028",
                "name": "duff",
                "nameId": "35916",
                "featureIds": ["28028", null, "28014", null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, "9479", null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36991",
                "name": "AUTOCAD",
                "nameId": "15695",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28022",
                "name": "LOTUS NOTES",
                "nameId": "15797",
                "featureIds": ["28022", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36909",
                "name": "FACTURAPLUS",
                "nameId": "34808",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36733",
                "name": "GOOGLE CHROME",
                "nameId": "33599",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36911",
                "name": "CONTAPLUS",
                "nameId": "32969",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36689",
                "name": "SAP",
                "nameId": "15881",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.2307692766189575,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36677",
                "name": "MICROSOFT PROJECT",
                "nameId": "18977",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28009",
                "name": "HTML",
                "nameId": "15749",
                "featureIds": ["28009", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36875",
                "name": "TRANSPORTE",
                "nameId": "33533",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28005",
                "name": "DATA BASE",
                "nameId": "16523",
                "featureIds": [null, null, null, null, null, "28005", null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, "9482", null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36743",
                "name": "GESTIÓN DOCUMENTAL",
                "nameId": "22543",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28024",
                "name": "MICROSOFT WORD",
                "nameId": "18981",
                "featureIds": ["28024", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 6.153846263885498,
                "score": 3.076923131942749,
                "scorePercentage": 50
            }, {
                "id": "28019",
                "name": "ORACLE",
                "nameId": "15832",
                "featureIds": [null, null, null, null, null, "28019", null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, "9482", null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36679",
                "name": "MICROSOFT POWERPOINT",
                "nameId": "34537",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28010",
                "name": "JAVASCRIPT",
                "nameId": "15770",
                "featureIds": ["28010", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36691",
                "name": "CRM",
                "nameId": "21731",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36725",
                "name": "MOZILLA FIREFOX",
                "nameId": "33604",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36727",
                "name": "MICROSOFT OUTLOOK",
                "nameId": "15834",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36681",
                "name": "MICROSOFT EXCEL",
                "nameId": "15803",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 6.153846263885498,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36739",
                "name": "PHOTOSHOP",
                "nameId": "19054",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36931",
                "name": "GRÚA",
                "nameId": "35954",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36915",
                "name": "MECANOGRAFÍA",
                "nameId": "34806",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36913",
                "name": "OPERARIO",
                "nameId": "34045",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28011",
                "name": "PL/SQL",
                "nameId": "15855",
                "featureIds": [null, null, null, null, null, "28011", null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, "9482", null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "28012",
                "name": "SQL",
                "nameId": "15916",
                "featureIds": [null, null, null, null, null, "28012", null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, "9482", null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36731",
                "name": "MICROSOFT INTERNET EXPLORER",
                "nameId": "22594",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28020",
                "name": "AS/400",
                "nameId": "18959",
                "featureIds": ["28020", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "37017",
                "name": "ERP",
                "nameId": "15724",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28017",
                "name": "ASP",
                "nameId": "15672",
                "featureIds": ["28017", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36737",
                "name": "WINDOWS XP",
                "nameId": "15985",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 1.2307692766189575,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36729",
                "name": "MICROSOFT OFFICE",
                "nameId": "15805",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 3.076923131942749,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36987",
                "name": "ESTADÍSTICO",
                "nameId": "19001",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28004",
                "name": "MICROSOFT ACCESS",
                "nameId": "15825",
                "featureIds": [null, null, null, null, null, "28004", null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, "9482", null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "28007",
                "name": "VISUAL BASIC",
                "nameId": "15933",
                "featureIds": ["28007", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36929",
                "name": "MICROSOFT DYNAMICS",
                "nameId": "19107",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28008",
                "name": "C++",
                "nameId": "15698",
                "featureIds": ["28008", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }, {
                "id": "36989",
                "name": "DELINEACIÓN DE PROYECTOS",
                "nameId": "34210",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36979",
                "name": "PREVENCIÓN DE RIESGOS LABORALES",
                "nameId": "31544",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "28021",
                "name": "LINUX",
                "nameId": "15795",
                "featureIds": ["28021", null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": ["9477", null, null, null, null, null, null, null, null, null, null, null],
                "weight": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0.6153846383094788,
                "score": 0.6153846383094788,
                "scorePercentage": 100
            }]
        }, {
            "id": "6425",
            "name": "Academic Degree",
            "order": 30,
            "methaRelationIds": ["11742", "11743", "11744", "11745", "11746", "11747", "11748"],
            "levelNames": ["Básico", "Bachillerato", "Form. Profesional", "Licenciatura", "Pregrado", "Máster", "Post grado"],
            "maxScore": 4,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "27998",
                "name": "Academic Degree",
                "nameId": "36083",
                "featureIds": [null, "27998", null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, "11743", null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }, {
            "id": "6397",
            "name": "Studies",
            "order": 35,
            "methaRelationIds": ["9484", "9485", "9486", "9487", "9488", "9489", "9490"],
            "levelNames": ["Básico", "Bachillerato", "Form. Profesional", "Licenciatura", "Pregrado", "Máster", "Post grado"],
            "maxScore": 5,
            "score": 0,
            "scorePercentage": 0,
            "features": [{
                "id": "36112",
                "name": "Ingeniería técnica informática",
                "nameId": "16058",
                "featureIds": [null, null, null, null, "36112", null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, "9488", null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 10,
                "scorePercentage": 0
            }, {
                "id": "36711",
                "name": "Contabilidad Financiera",
                "nameId": "35224",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "37021",
                "name": "Biología",
                "nameId": "16083",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36917",
                "name": "Mecanografía",
                "nameId": "34799",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": true,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36883",
                "name": "Ciencias de la Información",
                "nameId": "34354",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }, {
                "id": "36999",
                "name": "Termodinámica",
                "nameId": "27432",
                "featureIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "methaRelationIds": [null, null, null, null, null, null, null, null, null, null, null, null],
                "weight": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                "mandatory": false,
                "maxScore": 0,
                "score": 0,
                "scorePercentage": 0
            }]
        }];
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
        $scope.cargarCandidato($scope.usuario.candidateInfo.id);
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
        Mensaje.Esperar("Guardando información");
        data.dictionary = dictionary
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
        Mensaje.Esperar("Subiendo curriculum");
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