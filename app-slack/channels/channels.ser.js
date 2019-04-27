/**
 * Created by Julius Alvarado on 2/26/2017.
 */
(function () {
    "use strict";

    angular.module('app').factory('jChannels', ['$firebaseArray',
        function ($firebaseArray) {
            var ref = firebase.database().ref('channels');
            return $firebaseArray(ref);
        }
    ]).factory('jMessages', ['$firebaseArray', function ($firebaseArray) {
        var channelMessagesRef = firebase.database().ref('channelMessages');
        var userMessagesRef = firebase.database().ref('userMessages');
        return {
            forChannel: function (channelId) {
                return $firebaseArray(channelMessagesRef.child(channelId));
            },
            forUsers: function (uid1, uid2) {
                console.log("uid1 = "+uid1);
                console.log("uid2 = "+uid2);
                console.log("uid1 < uid2 = "+(uid1 < uid2));
                var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' + uid1;
                return $firebaseArray(userMessagesRef.child(path));
            }
        };
    }]);
}());