'use strict';

/**
 * @ngdoc overview
 * @name angularfireSlackApp
 * @description
 * # angularfireSlackApp
 *
 * Main module of the application.
 */
angular
    .module('app', [
        'firebase',
        'angular-md5',
        'ui.router'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'home/home.html',
                resolve: {
                    requireNoAuth: function ($state, jaAuth) {
                        return jaAuth.$requireSignIn().then(function (auth) {
                            $state.go('channels');
                        }, function (error) {
                            // basically do nothing.
                            console.log("jha - user not signed in, in the 'home' state resolve.");
                        });
                    }
                }
            })
            .state('login', {
                url: '/login',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'auth/login.html',
                resolve: {
                    requireNoAuth: function ($state, jaAuth) {
                        return jaAuth.$requireSignIn().then(function (auth) {
                            // $state.go('home');
                            console.log(auth);
                        }, function (error) {
                            console.log("ja - error with login state.");
                        });
                    }
                }
            })
            .state('register', {
                url: '/register',
                controller: 'AuthCtrl as authCtrl',
                templateUrl: 'auth/register.html',
                resolve: {
                    requireNoAuth: function ($state, jaAuth) {
                        return jaAuth.$requireSignIn().then(function (auth) {
                            $state.go('home');
                        }, function (error) {
                            console.log("ja - error with register state.");
                        });
                    }
                }
            })
            .state('profile', {
                url: '/profile',
                controller: 'ProfileCtrl as profileCtrl',
                templateUrl: 'users/profile.tem.html',
                resolve: {
                    auth: function ($state, jUsers, jaAuth) {
                        return jaAuth.$requireSignIn().catch(function () {
                            $state.go('home');
                        });
                    },
                    profile: function (jUsers, jaAuth) {
                        return jaAuth.$requireSignIn().then(function (auth) {
                            return jUsers.getProfile(auth.uid).$loaded();
                        });
                    }
                }
            })
            .state('channels', {
                url: '/channels',
                controller: 'ChannelsCtrl as channelsCtrl',
                templateUrl: 'channels/index.html',
                resolve: {
                    channels: function (jChannels) {
                        return jChannels.$loaded();
                    },
                    profile: function ($state, jaAuth, jUsers) {
                        return jaAuth.$requireSignIn().then(function (auth) {
                            return jUsers.getProfile(auth.uid).$loaded().then(
                                function (profile) {
                                    if (profile.displayName) {
                                        return profile;
                                    } else {
                                        $state.go('profile');
                                    }
                                }, function (error) {
                                    console.log(error);
                                    $state.go('home');
                                }
                            )
                        })
                    }
                }
            })
            .state('channels.create', {
                url: '/create',
                templateUrl: 'channels/create.html',
                controller: 'ChannelsCtrl as channelsCtrl'
            })
            .state('channels.messages', {
                url: '{channelId}/messages',
                controller: 'MessagesCtrl as messagesCtrl',
                templateUrl: 'channels/messages.html',
                resolve: {
                    messages: function ($stateParams, jMessages) {
                        return jMessages.forChannel($stateParams.channelId).$loaded();
                    },
                    channelName: function ($stateParams, channels) {
                        return "#" + channels.$getRecord($stateParams.channelId).name;
                    }
                }
            })
            .state('channels.direct', {
                url: '/{uid}/messages/direct',
                templateUrl: 'channels/messages.html',
                controller: 'MessagesCtrl as messagesCtrl',
                resolve: {
                    messages: function ($stateParams, jMessages, profile) {
                        return jMessages.forUsers($stateParams.uid, profile.$id).$loaded();
                    },
                    channelName: function($stateParams, jUsers){
                        return jUsers.all.$loaded().then(function(){
                           return '@'+jUsers.getDisplayName($stateParams.uid);
                        });
                    }
                }
            });

        $urlRouterProvider.otherwise('/');

        //-- firebase db initialization:
        var config = {
            apiKey: "AIzaSyD2VdKZgPdu3twTWW09Fz8tEH9rWucozZI",
            authDomain: "ngfire-chat.firebaseapp.com",
            databaseURL: "https://ngfire-chat.firebaseio.com",
            storageBucket: "ngfire-chat.appspot.com",
            messagingSenderId: "909282110429"
        };

        firebase.initializeApp(config);
    });
