/**
 * Created by Julius Alvarado on 9/11/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').controller('AuthCtrl', ['$scope', 'edhubAuthService',
        '$location', AuthClass
    ]);

    function AuthClass($scope, edhubAuthService, $location) {
        const vm = this;
        vm.email = "";
        vm.pw = "";
        vm.error = "";
        vm.name = "";
        vm.orgName = "";
        vm.showProgress = false;

        vm.authSignup = function () {
            const orgInfo = {
                email: vm.email,
                password: vm.pw,
                orgName: vm.orgName !== "" ? vm.orgName : "no orgName input field yet :/",
                name: vm.name !== "" ? vm.name : "no name given"
            };
            edhubAuthService.signup(orgInfo);
            vm.showProgress = true;
        };

        vm.go2login = function () {
            $location.path("/login");
        };

        vm.go2signup = function () {
            $location.path('/signup');
        };

        vm.userLogin = function () {
            const orgInfo = {
                email: vm.email,
                password: vm.pw,
                orgName: vm.orgName !== "" ? vm.orgName : "no orgName input field yet :/",
                name: vm.name !== "" ? vm.name : "no name given"
            };

            edhubAuthService.login(orgInfo);
        };
    }
}());