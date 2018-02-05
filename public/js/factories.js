angular.module('myApp.factories', []).
value('version', '0.1')
    .factory('termFactory', function () {
        this.primary = {};
        this.synonyms = [];
        this.current = {};
        return {
            setPrimary: function (primary) {
                this.primary = primary;
            },
            setSynonyms: function (synonyms) {
                if (Object.keys(synonyms).length === 0) {
                    this.synonyms = [];
                } else {
                    this.synonyms = synonyms;
                }
            },
            getPrimary: function () {
                return (this.primary);
            },
            getSynonyms: function () {
                return (this.synonyms)
            },
            setCurrent: function (current) {
                this.current = current;
            },
            getCurrent: function () {
                return (this.current);
            },
            setCurrentSynonym: function (current) {
                this.currentSynonym = current;
            },
            getCurrentSynonym: function () {
                return (this.currentSynonym);
            }
        };
    })
    .factory('candidateFactory', function () {
        this.candidate = {};
        return {
            getCandidate: function () {
                return (this.candidate);
            },
            setCandidate: function (candidate) {
                this.candidate = candidate;
            },
            getJobs: function () {
                return (this.jobs);
            },
            setJobs: function (jobs) {
                this.jobs = jobs;
            },
            getFeatures: function () {
                return (this.features);
            },
            setFeatures: function (features) {
                this.features = features;
            },
            getSchooling: function () {
                return (this.schooling);
            },
            setSchooling: function (schooling) {
                this.schooling = schooling;
            }
        };
    })
    .factory('metaFeaturesFactory', function () {
        this.candidate = {};
        return {
            getMetaFeature: function () {
                return (this.MetaFeature);
            },
            setMetaFeature: function (MetaFeature) {
                this.MetaFeature = MetaFeature;
            },
            getMetaRelations: function () {
                return (this.MetaRelations)
            },
            setMetaRelations: function (MetaRelations) {
                this.MetaRelations = MetaRelations;
            },
            getCurrentMetaRelation: function () {
                return (this.currentMetaRelation)
            },
            setCurrentMetaRelation: function (currentMetaRelation) {
                this.currentMetaRelation = currentMetaRelation;
            }
        };
    })
    .factory('frequencyMatrixFactory', function () {
        return {
            getMetaFeatures: function () {
                console.log('getting factory meta features...');
                return (this.MetaFeatures);
            },
            setMetaFeatures: function (MetaFeatures) {
                console.log('factory(frequencyMatrixFactory');
                this.MetaFeatures = MetaFeatures;
            },
        };
    })
    .factory('Mensaje', ['$rootScope', function ($rootScope) {
        var Mensaje = {}

        Mensaje.Mostrar = function (tipo, mensaje) {
            var n = noty({
                type: (tipo == null || tipo == undefined) ? 'alert' : tipo,
                layout: 'topCenter',
                text: mensaje
            });
            n.show();
        };

        Mensaje.Alerta = function (tipo, titulo, mensaje) {
            $rootScope.open = true;
            $rootScope.title = titulo;
            $rootScope.message = mensaje;
            $rootScope.type = (tipo == null || tipo == undefined) ? 'alert' : tipo;
        }

        Mensaje.Confirmacion = function (mensaje, aceptar, cancelar) {
            var n = noty({
                type: 'alert',
                layout: 'topCenter',
                text: mensaje,
                buttons: [{
                        addClass: 'btn btn-success btn-clean',
                        text: 'Aceptar',
                        onClick: function ($noty) {
                            $noty.close();
                            aceptar();
                        }
                    },
                    {
                        addClass: 'btn btn-danger btn-clean',
                        text: 'Cancelar',
                        onClick: function ($noty) {
                            $noty.close();
                            cancelar();
                        }
                    }
                ]
            });
            n.show();
        };

        Mensaje.Esperar = function (mensaje) {
            $rootScope.waitModal = true;
            $rootScope.waitModalMessage = (mensaje != null && mensaje != undefined ? mensaje:'Cargando');
        };

        Mensaje.Desocupar = function () {
            $rootScope.waitModal = false;
        };

        return Mensaje;
    }]);