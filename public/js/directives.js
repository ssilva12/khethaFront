'use strict';

/* Directives */

angular.module('myApp.directives', []).
directive('appVersion', function (version) {
  return function (scope, elm, attrs) {
    elm.text(version);
  };
}).
directive("select2", function ($timeout, $parse) {
  return {
    restrict: 'AC',
    require: 'ngModel',
    link: function (scope, element, attrs) {
      $timeout(function () {
        element.select2({
          tags: true
        });
        element.select2Initialized = true;
      });

      var refreshSelect = function () {
        if (!element.select2Initialized) return;
        $timeout(function () {
          element.trigger('change');
        });
      };

      var recreateSelect = function () {
        if (!element.select2Initialized) return;
        $timeout(function () {
          element.select2('destroy');
          element.select2({
            tags: true
          });
        });
      };

      scope.$watch(attrs.ngModel, refreshSelect);

      if (attrs.ngOptions) {
        var list = attrs.ngOptions.match(/ in ([^ ]*)/)[1];
        // watch for option list change
        scope.$watch(list, recreateSelect);
      }

      if (attrs.ngDisabled) {
        scope.$watch(attrs.ngDisabled, refreshSelect);
      }

    }
  };
});