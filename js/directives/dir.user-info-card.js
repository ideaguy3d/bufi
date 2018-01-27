/**
 * Created by Julius Alvarado on 1/10/2018.
 */

(function () {
    "use strict";

    angular.module('myApp').directive('jaUserInfoCard', [
        function () {
            return {
                templateUrl: 'js/directives/temps/temp.user-info-card.html',
                restrict: 'E',
                scope: {
                    user: '=',
                    initialCollapsed: '@collapsed'
                },
                controller: function ($scope) {
                    $scope.collapsed = ($scope.initialCollapsed === 'true');

                    $scope.knightMe = function (user) {
                        user.rank = "Knight Mode";
                    };

                    $scope.collapse = function () {
                        $scope.collapsed = !$scope.collapsed;
                    };

                    $scope.removeFriend = function (friend) {
                        console.log("jha - userInfo dir ctrl .removeFriend() invoked!");
                        var idx = $scope.user.friends.indexOf(friend);
                        if (idx > -1) {
                            $scope.user.friends.splice(idx, 1);
                        }
                    };
                }
            }
        }
    ]);

    angular.module('myApp').directive('jaRemoveFriendBtn', function () {
        function jaRemoveFriendBtnCtrl() {
            
        }

        return {
            restrict: 'E',
            templateUrl: 'js/directives/temps/temp.remove-friend-btn.html',
            scope: {
                notifyParent: '&removeAFriend'
            },
            controller: ['$scope', function ($scope) {
                $scope.removing = false;

                $scope.startRemove = function () {
                    $scope.removing = true;
                };

                $scope.cancelRemove = function () {
                    $scope.removing = false;
                };

                $scope.confirmRemoveFriend = function () {
                    // to override parent parameter
                    // the key is 'friend' because that is the name of the parents param
                    // $scope.notifyParent({friend: 'ary'});
                    $scope.notifyParent();
                }
            }]
        }
    });

    angular.module('myApp').directive('jaAddress', function () {
        return {
            restrict: 'E',
            templateUrl: 'js/directives/temps/temp.user-info-card-address.html',
            scope: true, // inherited scope
            controller: function ($scope) {
                $scope.collapsed = false;

                $scope.collapseAddress = function () {
                    $scope.collapsed = true;
                };

                $scope.expandAddress = function () {
                    $scope.collapsed = false;
                }
            }
        }
    })
}());