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
}).
directive("activeTab", function ($state) {
  return function (scope, element, attrs) {
    var links = element.find('a'),
      currentLink,
      urlMap = {},
      activeClass = attrs.navMenu || 'active';

    for (var i = links.length - 1; i >= 0; i--) {
      var link = angular.element(links[i]);
      var url = link.attr('href');

      if (url.substring(0, 1) === '#') {
        urlMap[url.substring(1)] = link;
      } else {
        urlMap[url] = link;
      }
    }

    scope.$on('$routeChangeStart', function () {
      var path = urlMap[$state.href()];

      links.parent('li').removeClass(activeClass);

      if (path) {
        path.parent('li').addClass(activeClass);
      }
    });
  };
});