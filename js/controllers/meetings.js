/**
 * Created by Julius Alvarado on 11/21/2017.
 */
myApp.controller('MeetingsController', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseArray',
    function ($rootScope, $scope, $firebaseAuth, $firebaseArray) {
        $scope.message = "meeting data";
        var ref = firebase.database().ref();
        var auth = $firebaseAuth();
        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
                var meetingsInfo = $firebaseArray(meetingsRef);
                $scope.meetings = meetingsInfo;
                // once meetingsInfo has loaded do something:
                meetingsInfo.$loaded().then(function(data){
                    $rootScope.howManyMeetings = meetingsInfo.length;
                });
                meetingsInfo.$watch(function(data){
                    $rootScope.howManyMeetings = meetingsInfo.length;
                });
                $scope.addMeeting = function () {
                    meetingsInfo.$add({
                        name: $scope.meetingname,
                        date: firebase.database.ServerValue.TIMESTAMP
                    }).then(function () {
                        $scope.meetingname = '';
                    });
                };
                $scope.deleteMeeting = function (key) {
                    meetingsInfo.$remove(key);
                };
            }
        });
    }]);