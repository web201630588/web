/**
 * Created by shakil on 3/28/16.
 */
(function(){
    var app = angular.module('all-directives', []);

    app.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }]);

// We can write our own fileUpload service to reuse it in the controller
    app.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl, name){
            var fd = new FormData();
            fd.append('file', file);
            fd.append('name', name);
            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined,'Process-Data': false}
            })
                .success(function(response){

                    console.log(response);
                })
                .error(function(){
                    console.log("error");
                });
        }
    }]);






})();

