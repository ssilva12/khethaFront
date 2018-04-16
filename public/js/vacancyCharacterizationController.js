angular.module('myApp.vacancyCharacterizationController', []).
controller('vacancyCharacterizationCtrl', ['$scope', '$rootScope', '$stateParams', 'Mensaje', 'Dictionary', 'vacancyService', '$state', 'keepData', '$filter', function ($scope, $rootScope, $stateParams, Mensaje, Dictionary, vacancyService, $state, keepData, $filter) {
    $scope.Dato = {};
    $scope.Dato.employer = '';
    $scope.Dato.job = '';
    $scope.Dato.vacancy = '';
    const maxYearsBack = 10;
    $scope.Dato.possibleYearsBack = [...Array(maxYearsBack).keys()].map(x => maxYearsBack - x++);
    const currentYear = (new Date()).getFullYear();
    $scope.Dato.possibleReferenceYears = [...Array(maxYearsBack).keys()].map(x => currentYear - x++);
    $scope.Dato.minPercentage = 10;
    $scope.methaFeatures = [];
    $scope.Dato.tab = "tab1";

    $scope.getJobs = function () {
        Mensaje.Esperar();
        if ($scope.Dato.employer == "") {
            $scope.Dato.jobs = null;
            $scope.Dato.job = '';
            $scope.Dato.vacancies = null;
            $scope.Dato.vacancy = '';
            Mensaje.Desocupar();
        } else {
            vacancyService.getJobs($scope.Dato.employer, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.Dato.jobs = result.data;
                    //$scope.Dato.job = '';
                    //$scope.getVacancies();
                } else {
                    Mensaje.Alerta("error", result.message);
                }
            });
        }
    }

    $scope.getEmployers = function () {
        Mensaje.Esperar();
        vacancyService.getEmployers(function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.Dato.employers = result.data;
                //$scope.Dato.employer = '';
                //$scope.getVacancies();
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    }

    $scope.getVacancies = function () {
        Mensaje.Esperar();
        if ($scope.Dato.job == "") {
            $scope.Dato.vacancies = null;
            $scope.Dato.vacancy = '';
            Mensaje.Desocupar();
        } else {
            vacancyService.getVacancies($scope.Dato.employer, $scope.Dato.job, function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.Dato.vacancies = result.data;
                    //$scope.Dato.vacancy = '';
                } else {
                    Mensaje.Alerta("error", result.message);
                }
            });
        }
    }

    $scope.getMethaFeatures = function () {
        Mensaje.Esperar();
        vacancyService.getMethaFeatures($scope.Dato.employer, $scope.Dato.job, $scope.Dato.vacancy, $scope.Dato.referenceYear, $scope.Dato.yearsBack, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.methaFeatures = result.data;
                //$scope.showValue = "w";
            }
        })
    }

    $scope.editWeight = function (feature, methaFeatures, weightIndex) {
        $scope.Dato.featureEdit = feature;
        $scope.Dato.weightIndexEdit = weightIndex;
        $scope.Dato.featureEdit.methaFeature = methaFeatures;
        $scope.Dato.weightPopupEdit = $scope.Dato.featureEdit.isWeightInferred[weightIndex] ?
            $scope.Dato.featureEdit.weightInferred[weightIndex] : $scope.Dato.featureEdit.weightSetted[weightIndex]; // .toFixed(0);
        $scope.Dato.methaRelationEdit = methaFeatures.levelNames[$scope.Dato.weightIndexEdit];
    };

    $scope.saveWeight = function () {
        Mensaje.Esperar();
        vacancyService.setFeatureWeight($scope.Dato.featureEdit.entityId, $scope.Dato.featureEdit.methaFeature.id, $scope.Dato.featureEdit.methaFeature.methaRelationIds[$scope.Dato.weightIndexEdit],
            $scope.Dato.featureEdit.featureIds[$scope.Dato.weightIndexEdit], $scope.Dato.featureEdit.type, $scope.Dato.featureEdit.nameId, $scope.Dato.weightPopupEdit,
            function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.calculateFrequencyMatrix();
                } else {
                    Mensaje.Alerta("error", result.message);
                }
            });
    };

    $scope.showAddFeature = function (methaFeatures) {
        $scope.Dato.addFeatureError = '';
        $scope.Dato.featureToAdd = '';
        $scope.Dato.currentMethaFeatureId = methaFeatures.id;
        $scope.Dato.currentMethaFeatureName = methaFeatures.name;
        $scope.Dato.currentMethaFeatureFirstMethaRelationId = methaFeatures.methaRelationIds[0];
        Mensaje.Esperar();
        vacancyService.getFeatureNames(methaFeatures.dictionary, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                let names = [];
                for (var fm in methaFeatures.featuresMap) {
                    names.push(fm);
                }
                $scope.Dato.currentFeatureNames = result.data.filter(f => $.inArray(f.name, names) < 0);
            }
        })
    }

    $scope.addFeature = function () {
        $scope.Dato.addFeatureError = '';
        if (!$scope.Dato.featureToAdd) {
            $scope.Dato.addFeatureError = $filter('translate')('SELECT_FEATURE') + '.';
            return;
        }

        let entityId = '';
        let featureType = '';
        if ($scope.Dato.vacancy !== '') {
            entityId = $scope.Dato.vacancy;
            featureType = 'JobVacancyFeature';
        } else if ($scope.Dato.job !== '') {
            entityId = $scope.Dato.job;
            featureType = 'JobFeature';
        } else if ($scope.Dato.employer !== '') {
            entityId = $scope.Dato.employer;
            featureType = 'EmployerFeature';
        } else {
            $scope.Dato.addFeatureError = $filter('translate')('SELECT_DATA') + '.'
            return;
        }
        $("#modalAddFeature").modal("hide");
        Mensaje.Esperar();
        vacancyService.addFeature(entityId, $scope.Dato.currentMethaFeatureId, $scope.Dato.currentMethaFeatureFirstMethaRelationId, featureType, $scope.Dato.featureToAdd, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.calculateFrequencyMatrix();
            } else {
                Mensaje.Alerta("error", result.message);
            }
        });
    }

    $scope.showDiscarded = function (feature, methaFeatures, discarded) {
        $scope.Dato.featureEdit = feature;
        $scope.Dato.featureEdit.methaFeature = methaFeatures;
    }

    $scope.saveDiscarded = function () {
        $("#modalDiscarded").modal("hide");
        Mensaje.Esperar();
        vacancyService.setFeatureDiscarded($scope.Dato.featureEdit.entityId, $scope.Dato.featureEdit.methaFeature.id, $scope.Dato.featureEdit.id,
            $scope.Dato.featureEdit.type, $scope.Dato.featureEdit.nameId, !$scope.Dato.featureEdit.discarded,
            function (result) {
                Mensaje.Desocupar();
                if (!result.error) {
                    $scope.calculateFrequencyMatrix();
                } else {
                    Mensaje.Alerta("error", result.message);
                }
            });
    }

    $scope.calculateFrequencyMatrix = function () {
        //$scope.methaFeatures = [];
        Mensaje.Esperar();
        vacancyService.calculateFrequencyMatrix($scope.Dato.employer, $scope.Dato.job, $scope.Dato.vacancy, $scope.Dato.referenceYear, $scope.Dato.yearsBack, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.methaFeatures = result.data;
            }
        })
    }

    $scope.getMethaFeaturesJobLastVacancy = function () {
        //$scope.methaFeatures = [];
        var error = "";
        if ($scope.Dato.employer == "") {
            error = "\n" + $filter('translate')('EMPLOYER');
        }
        if ($scope.Dato.job == "") {
            error += "\n" + $filter('translate')('JOB');
        }

        if (error != "") {
            Mensaje.Alerta("warning", $filter('translate')('COMPLETE_FIELDS') + error);
            return;
        }
        Mensaje.Esperar();
        vacancyService.getMethaFeaturesJobLastVacancy($scope.Dato.employer, $scope.Dato.job, $scope.Dato.minPercentage, function (result) {
            Mensaje.Desocupar();
            if (!result.error) {
                $scope.methaFeatures = result.data;
            }
        })
    }

    var init = function () {
        $scope.getEmployers();
        if ($stateParams.vacancyId != null && $stateParams.employerId != null && $stateParams.jobId != null) {
            $scope.Dato.employer = $stateParams.employerId;
            $scope.getJobs();
            $scope.Dato.job = $stateParams.jobId;
            $scope.getVacancies();
            $scope.Dato.vacancy = $stateParams.vacancyId;
            $scope.getMethaFeatures();
        }
    };
    init();

}]);