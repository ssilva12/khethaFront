angular.module('myApp.userController', ['ui.select', 'ADM-dateTimePicker', 'ui.bootstrap']).
controller('userDetailController', ['$scope', '$rootScope', '$stateParams', 'Mensaje', 'Dictionary', '$parse', '$timeout', 'userService', '$state', 'keepData', function ($scope, $rootScope, $stateParams, Mensaje, Dictionary, $parse, $timeout, userService, $state, keepData) {

    $scope.cargarUser = function (id) {
        Mensaje.Esperar();
        userService.getById(id, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.user = result.data[0];
                $scope.user.password = $scope.user.key;
            } else {
                Mensaje.Alerta("error", "Error", result.message);
            }
        });
    };

    $scope.actualizarUser = function () {
        if ($scope.user.portFolio == null || $scope.user.portFolio == undefined) {
            create(false);
        } else {
            userService.getPortfolio($scope.user.portFolio, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    if (result.data.length == 0) {
                        Mensaje.Alerta("confirm", "", "CREATE_PORTFOLIO", function () {
                            create(true);
                        }, function () {
                            create(false);
                        }, "YES", "NO")
                    } else {
                        create(false);
                    }
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
    };

    var create = function (createPortfolio) {
        if ($scope.user.id != null || $scope.user.id != undefined) {
            if ($scope.user.key != $scope.user.password) {
                var SHA512 = new Hashes.SHA512
                $scope.user.key = SHA512.hex($scope.user.userName + "" + $scope.user.password);
                $scope.user.password = $scope.user.key;
            } else {
                $scope.user.key = "";
                $scope.user.password = "";
            }
            userService.updateInformation($scope.user, createPortfolio, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarUser($scope.user.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        } else {
            var SHA512 = new Hashes.SHA512
            $scope.user.key = SHA512.hex($scope.user.userName + "" + $scope.user.password);
            $scope.user.password = $scope.user.key;
            userService.createUser($scope.user, createPortfolio, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    Mensaje.Alerta("success", 'OK', result.message);
                    $scope.cargarUser(result.data.id);
                } else {
                    Mensaje.Alerta("error", 'Error', result.message);
                }
            });
        }
    }

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
        model.assign($scope, item.name);
        modelSelect.assign($scope, item);
    }
    $scope.data = [];
    $scope.autocompletarInput = function (string, tipo, datos, acronimo, selected) {
        var model = $parse(datos);
        var modelSelect = $parse(selected + "Selected");
        modelSelect.assign($scope, "");
        var data = userService.getPortfolio(string, function (result) {
            if (!result.error) {
                if (result.data) {
                    model.assign($scope, result.data);
                } else {
                    model.assign($scope, []);
                }
            } else {
                Mensaje.Alerta("error", 'Error', '');
                model.assign($scope, []);
            }
        });
    };
    //INIT
    var init = function () {
        if ($stateParams.id != null) {
            $scope.cargarUser($stateParams.id);
        } else {

        }
    };
    init();

}]);