angular.module('myApp.factories', []).
  value('version', '0.1')
  .factory('termFactory', function() {
    this.primary = {};
    this.synonyms = [];
    this.current = {};
    return {
        setPrimary : function (primary) {
            this.primary = primary;
        },
        setSynonyms : function (synonyms) {
            if(Object.keys(synonyms).length === 0){
                this.synonyms = [];
            }else{
                this.synonyms = synonyms;
            }
        },
        getPrimary : function () {
            return(this.primary);
        },
        getSynonyms : function () {
            return(this.synonyms)
        },
        setCurrent : function (current) {
            this.current = current;
        },
        getCurrent : function () {
            return(this.current);
        },
        setCurrentSynonym : function (current) {
            this.currentSynonym = current;
        },
        getCurrentSynonym : function () {
            return(this.currentSynonym);
        }
    };
  }).factory('candidateFactory', function() {
    this.candidate = {};
    return {
        getCandidate : function () {
            return(this.candidate);
        },
        setCandidate : function (candidate) {
            this.candidate = candidate;
        },
        getJobs : function () {
            return(this.jobs);
        },
        setJobs : function (jobs) {
            this.jobs = jobs;
        },
        getFeatures : function () {
            return(this.features);
        },
        setFeatures : function (features) {
            this.features = features;
        }
    };
  });