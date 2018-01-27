(function () {
    "use strict";

    angular.module('myApp').factory('jBufiDataSer', ["$http",
        function ($http) {

            var getLocalData = function () {
                return $http.get('local_data.json')
            };

            return {
                getLocalData: getLocalData
            }
        }
    ]);
})();