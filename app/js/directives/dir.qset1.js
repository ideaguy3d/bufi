(function () {
    "use strict";

    angular.module('myApp').directive("questionSetOne", [
        function () {
            return {
                templateUrl: "js/directives/temps/temp.qset1.html",
                controller: "QuestionSetOneCtrl"
            }
        }
    ])
})();