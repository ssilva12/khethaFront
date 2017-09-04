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
        }
    };
  });