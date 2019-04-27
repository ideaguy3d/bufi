/**
 * Created by Julius Alvarado on 7/8/2017.
 */

(function () {
    "use strict";

    angular.module('app').controller('MessagesCtrl', [
        'profile', 'channelName', 'messages',
        function (profile, channelName, messages) {
            var messagesCtrl = this;
            messagesCtrl.messages = messages;
            messagesCtrl.channelName = channelName;
            messagesCtrl.message = '';

            messagesCtrl.sendMessage = function () {
                if (messagesCtrl.message.length > 0) {
                    messagesCtrl.messages.$add({
                        uid: profile.$id,
                        body: messagesCtrl.message,
                        timestamp: firebase.database.ServerValue.TIMESTAMP
                    }).then(function () {
                        messagesCtrl.message = '';
                        console.log("jha - message was posted to the server");
                    });
                }
            }
        }
    ]);
}());