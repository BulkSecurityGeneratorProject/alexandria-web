(function() {
    'use strict';
    angular
        .module('alexandriaApp')
        .factory('Student', Student);

    Student.$inject = ['$resource'];

    function Student ($resource) {
        var resourceUrl =  'api/students/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
