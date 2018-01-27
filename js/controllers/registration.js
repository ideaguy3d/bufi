myApp.controller('RegistrationController',
    ['$scope', 'Authentication', '$location',
        function ($scope, Authentication, $location) {
            // $scope.message = "";
            $scope.user = {};
            $scope.regCtrlTitle = "From RegistrationController";
            $scope.login = function () {
                Authentication.login($scope.user);
            };

            $scope.logout = function () {
                $location.path('/login');
                Authentication.logout();
            };

            $scope.register = function () {
                Authentication.register($scope.user);
            }; // register

        }]); // Controller