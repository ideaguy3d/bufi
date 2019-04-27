/**
 * Created by Julius Alvarado on 2/26/2017.
 */

(function(){
    "use strict";

    angular.module('app').controller('ProfileCtrl', ['$state', 'md5', 'auth', 'profile',
        function($state, md5, auth, profile) {
            var profileCtrl = this;

            profileCtrl.profile = profile;

            profileCtrl.updateProfile = function() {
                profileCtrl.profile.emailHash = md5.createHash(auth.email);
                profileCtrl.profile.$save().then(function(){
                    $state.go('channels');
                });
            }
        }
    ])
}());

//