/**
 * Created by Julius Alvarado on 2/26/2017.
 */

(function () {
    "use strict";

    angular.module('app').controller('ChannelsCtrl', ['$state', 'jaAuth', 'jUsers', 'profile', 'channels',
        function ($state, jaAuth, jUsers, profile, channels) {
            const channelsCtrl = this;
            jUsers.setOnline(profile.$id);
            channelsCtrl.channels = channels;
            channelsCtrl.profile = profile;
            channelsCtrl.getDisplayName = jUsers.getDisplayName;
            channelsCtrl.getGravatar = jUsers.getGravatar;
            channelsCtrl.users = jUsers.all;
            channelsCtrl.newChannel = {
                name: '',
                queryCode1: '?ja=julius-alvarado&randomInt=' + Math.floor((Math.random() * 1000) + 1)
            };

            channelsCtrl.logout = function () {
                channelsCtrl.profile.online = null;
                channelsCtrl.profile.$save().then(function () {
                    jaAuth.$signOut().then(function () {
                        $state.go('home');
                    });
                });
            };

            channelsCtrl.createChannel = function () {
                channelsCtrl.channels.$add(channelsCtrl.newChannel).then(function (ref) {
                    channelsCtrl.newChannel = {
                        name: '',
                        queryCode1: '?ja=julius-alvarado&randomInt=' + Math.floor((Math.random() * 1000) + 1000)
                    };
                    $state.go('channels.messages', {channelId: ref.key});
                });
            };
        }
    ]);
}());

//