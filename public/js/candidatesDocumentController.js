angular.module('myApp.candidatesDocumentCtrl', ['ui.select', 'ADM-dateTimePicker']).
controller('candidatesDocumentController', ['$scope', '$stateParams', 'candidatesServices', 'Mensaje', 'Dictionary', '$parse', '$timeout', '$filter', '$rootScope', 'userService', 'keepData', function ($scope, $stateParams, candidatesServices, Mensaje, Dictionary, $parse, $timeout, $filter, $rootScope, userService, keepData) {
    $scope.lista = {};
    $scope.lista.documentos = [];
    $scope.lista.currentPage = 1;
    $scope.lista.totalItems = 0;
    $scope.lista.entryLimit = 12;
    $scope.lista.noOfPages = 0;
    $scope.Dato = {};
    $scope.Document = {};

    $scope.advSearch = function (name, page, itemsPerPage) {
        Mensaje.Esperar();
        candidatesServices.advSearchDocuments(String(name), String(page), String(itemsPerPage), function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.lista.documentos = result.data.documents;
                $scope.lista.cantidad = result.data.total;
                $scope.lista.currentPage = page;
                $scope.lista.totalItems = result.data.total;
                $scope.lista.entryLimit = itemsPerPage;
                $scope.lista.noOfPages = Math.ceil($scope.lista.totalItems / $scope.lista.entryLimit);

                $scope.Dato.namePaginado = name;
                keepData.set('filtroDocumentos', $scope.Dato);
            } else {
                $scope.lista.documentos = [];
                Mensaje.Alerta("error", 'Error', result.message);
            }
        })
    }

    $scope.pagination = function () {
        $scope.advSearch($scope.Dato.namePaginado, $scope.lista.currentPage, 12);
    };

    $scope.clearFilter = function () {
        $scope.Dato.name = "";
        $scope.advSearch("", 1, 12);
    };

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

    Mensaje.Esperar();
    userService.getPortfolio("", function (result) {
        Mensaje.Desocupar();
        if (!result.error) {
            $rootScope.sesion.portFolios = result.data
            var datosCookies = $rootScope.filtroDocumentos;
            if (datosCookies != null && datosCookies != undefined) {
                var datos = datosCookies;
                $scope.Dato.namePaginado = datos.namePaginado != undefined ? datos.namePaginado : "";

                $scope.Dato.name = $scope.Dato.namePaginado;
                $scope.pagination();
            } else {
                $scope.advSearch("", 1, 12);
            }
        } else {
            Mensaje.Alerta("error", 'Error', result.message);
        }
    });

}]);