angular.module('myApp.jobCtrl', []).
    controller('jobController', ['$scope', '$stateParams', 'jobService', 'Mensaje', 'Dictionary', '$parse', '$timeout', function ($scope, $stateParams, jobService, Mensaje, Dictionary, $parse, $timeout) {

        $scope.cargarJob = function (id) {
            Mensaje.Esperar();
            var allData = jobService.getById(id, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    console.log(result.data.job);
                    $scope.job = result.data.job;
                } else {
                    Mensaje.Alerta("error", "Error", result.message);
                }
            });
        };


        $scope.actualizarJob = function () {
            Mensaje.Esperar("SAVING_DATA");
            debugger
            $scope.job.sectorName = $scope.job.sectorNameSelected != "" ? $scope.job.sectorNameSelected : $scope.job.sectorName;
            if ($scope.job.id != null || $scope.job.id != undefined) {
                var allData = jobService.updateInformation($scope.job, function (result) {
                    Mensaje.Desocupar();
                    if (!result.error) {
                        Mensaje.Alerta("success", 'OK', result.message);
                    } else {
                        Mensaje.Alerta("error", 'Error', result.message);
                    }
                });
            } else {
                var allData = jobService.createJob($scope.job, function (result) {
                    Mensaje.Desocupar();
                    if (!result.error) {
                        Mensaje.Alerta("success", 'OK', result.message);
                        //$scope.cargarJob($scope.job.id);
                    } else {
                        Mensaje.Alerta("error", 'Error', result.message);
                    }
                });
            }
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

        $scope.data = [];
        $scope.autocompletarInput = function (string, tipo, datos, acronimo, selected) {
            var model = $parse(datos);
            var modelSelect = $parse(selected + "Selected");
            modelSelect.assign($scope, "");
            var data = Dictionary.getSynonyms(string, tipo, acronimo, function (error, result) {
                if (!error) {
                    console.log(result)
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
        $scope.assign = function (variable, valor) {
            var model = $parse(variable);
            var modelSelect = $parse(variable + "Selected");
            model.assign($scope, valor);
            modelSelect.assign($scope, valor);
        }
        //INIT
        var init = function () {
            if ($stateParams.id != null) {
                $scope.cargarJob($stateParams.id);
            } else {

            }
        };
        init();

    }]);