(function () {
    "use strict";

    angular.module('myApp').factory('jBufiDataSer', ["$http",
        function ($http) {
            var unauthUserAnswers = [];

            var getLocalData = function () {
                return $http.get('local_data.json')
            };

            var setUnauthUserAnswers = function(item){
                unauthUserAnswers.push(item);
            };

            var getUnauthUserAnswers = function(){
                return unauthUserAnswers;
            };

            return {
                getLocalData: getLocalData,
                setUnauthUserAnswers: setUnauthUserAnswers,
                getUnauthUserAnswers: getUnauthUserAnswers
            }
        }
    ]);
})();