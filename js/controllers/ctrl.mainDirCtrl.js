/**
 * Created by Julius Alvarado on 1/10/2018.
 */

(function () {
    "use strict";

    angular.module('myApp')
        .controller('mainDirCtrl', ['$scope',
            function ($scope) {
                $scope.user1 = {
                    name: 'julius alvarado',
                    address: {
                        street: "po box 489",
                        city: "Sacramento",
                        state: "Califoria"
                    },
                    friends: ["Vince", "Ary", "Edward"]
                };

                $scope.user2 = {
                    name: 'vince vu',
                    address: {
                        street: "po box 557",
                        city: "Sacramento",
                        state: "Califoria"
                    },
                    friends: ["Julius", "Ary", "Edward"]
                };

                $scope.user3 = {
                    name: 'edward palacio',
                    friends: ["Julius", "Ary", "Vince"]
                };

                $scope.user4 = {
                    name: 'ary ahroosh',
                    address: {
                        street: "po box 473",
                        city: "Sacramento",
                        state: "Califoria"
                    },
                    friends: ["Julius", "Vince", "Edward"]
                };

                $scope.homeTitle = "built by julius3d.com";

                $scope.handlePause = function () {
                    console.log("jha - vid was paused...");
                };
            }
        ])
}());