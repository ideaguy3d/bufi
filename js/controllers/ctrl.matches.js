
myApp.controller('MatchesController', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseArray', 'matchMessage',
    function ($rootScope, $scope, $firebaseAuth, $firebaseArray, matchMessage) {
        var vm = this;

        vm.matchMessage = matchMessage;

        $scope.message = "meeting data";

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();
        var usersRef = ref.child('users');
        var usersDataAR = $firebaseArray(usersRef);
        var authUsersInfoRef = usersRef.child(authUser.uid);
        var dislikesRef = authUsersInfoRef.child("dislikes");
        var dislikesInfoAR = $firebaseArray(dislikesRef);

        vm.seeMatches = function () {
            console.log("jha - in vm.seeMatches()");
            //-- The MATCHES:
            $rootScope.matches = [];

            //-- The ACTUAL MATCHING loop:
            for (var i = 0; i < usersDataAR.length; i++) {
                var user = usersDataAR[i];
                var dislikes = user.dislikes;
                var tArr = [];
                var count = 0;
                var otherUserEmail = user.email;


                for (var key in dislikes) {
                    tArr[count] = dislikes[key].answer;
                    ++count;
                }

                var points = 0;

                count = 0;
                if (points === 3) {
                    $rootScope.matches[count] = {
                        grade: "A+",
                        user: otherUserEmail
                    };
                    count++;
                } else if (points === 2) {
                    $rootScope.matches[count] = {
                        grade: "B+",
                        user: otherUserEmail
                    };
                    count++;
                } else if (points === 1) {
                    $rootScope.matches[count] = {
                        grade: "C+",
                        user: otherUserEmail
                    };
                    count++;
                } else if (points === 0) {
                    $rootScope.matches[count] = {
                        grade: "no matches :|",
                        user: otherUserEmail
                    }
                }

                console.log(" - jha - other user dislikes = ");
                console.log(otherUserEmail);
                console.log(user.dislikes);
                console.log("temp array: ");
                console.log(tArr);
                console.log("the other user");
                console.log(user);
            }

            $scope.testBind = "should be set to test bind near matching loop";

            console.log("MATCHES MATCHES MATCHES= ");
            console.log($rootScope.matches);

            console.log(" - jha - dislikesInfoAR for this user:");
            console.log(dislikesInfoAR);

            console.log(" - jha - usersDataAR:");
            console.log(usersDataAR);

            $rootScope.matchesAlgo = "Sorry, I didn't complete this algorithm :'( ";
        };

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                var meetingsRef = ref.child('users').child(authUser.uid).child('meetings');
                var meetingsInfo = $firebaseArray(meetingsRef);
                $scope.meetings = meetingsInfo;

                // once meetingsInfo has loaded do something:
                meetingsInfo.$loaded().then(function (data) {
                    $rootScope.howManyMeetings = meetingsInfo.length;
                });

                meetingsInfo.$watch(function (data) {
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