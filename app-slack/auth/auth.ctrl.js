/**
 * Created by Julius Alvarado on 2/23/2017.
 */

(function () {
    "use strict";

    var app = angular.module('app'),
        controllerId = 'AuthCtrl';

    app.controller(controllerId, ['jaAuth', '$state', AuthCtrlClass]);

    function AuthCtrlClass(jaAuth, $state) {
        var authCtrl = this;

        authCtrl.user = {
            email: '',
            password: ''
        };

        authCtrl.login = function () {
            jaAuth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password)
                .then(function (auth) {
                    console.log("auth = ");
                    console.log(auth);
                    $state.go('channels');
                }, function (error) {
                    console.log(error);
                    authCtrl.error = error;
                });
        };

        authCtrl.register = function () {
            jaAuth
                .$createUserWithEmailAndPassword(authCtrl.user.email,
                    authCtrl.user.password)
                .then(function (user) {
                    console.log(user);
                    authCtrl.login();
                }, function (error) {
                    console.log(error);
                    authCtrl.error = error;
                });
        }
    }
}());