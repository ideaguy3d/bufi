/**
 * Created by Julius Alvarado on 2/25/2017.
 */

(function () {
    "use strict";

    angular.module('app').factory('jUsers', function ($firebaseArray, $firebaseObject) {
        var usersRef = firebase.database().ref('users'),
            users = $firebaseArray(usersRef),
            connectedRef = firebase.database().ref('.info/connected');

        return {
            getProfile: function (uid) {
                return $firebaseObject(usersRef.child(uid));
            },
            getDisplayName: function (uid) {
                var rec = users.$getRecord(uid);
                return rec.displayName;
            },
            all: users,
            getGravatar: function (uid) {
                return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
            },
            setOnline: function (uid) {
                var connected = $firebaseObject(connectedRef);
                var online = $firebaseArray(usersRef.child(uid + '/online'));
                connected.$watch(function () {
                    if (connected.$value === true) {
                        online.$add(true).then(function (connectedRef) {
                          connectedRef.onDisconnect().remove();
                        });
                    }
                });
            }
        };
    });
}());