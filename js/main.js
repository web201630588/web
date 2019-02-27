/**
 * Created by shakil on 3/28/16.
 */
(function() {
    var app = angular.module('sklApp', ['ngMessages', 'ngMaterial', 'ui.bootstrap', 'all-directives','sklController','ngSanitize']
    , function ($interpolateProvider) {
            $interpolateProvider.startSymbol('[[');
            $interpolateProvider.endSymbol(']]');
        })
})();


// /**
//  * Created by shakil on 3/28/16.
//  */
// (function() {
//     var app = angular.module('sklApp', ['ngMessages', 'ngMaterial', 'ui.bootstrap', 'all-directives','sklController']);
// })();