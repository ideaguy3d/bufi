
myApp.controller('MatchesController', ['$rootScope', '$scope', '$firebaseAuth', '$firebaseArray', 'matchMessage',
    function ($rootScope, $scope, $firebaseAuth, $firebaseArray, matchMessage) {
        var vm = this;
        var ref = firebase.database().ref();
        var auth = $firebaseAuth();

        vm.matchMessage = matchMessage;

        $scope.message = "meeting data";

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                // The entire users data node
                var usersRef = ref.child('users');
                var usersDataAR = $firebaseArray(usersRef);
                // Authenticated users' data
                var authUsersInfoRef = usersRef.child(authUser.uid);
                var dislikesRef = authUsersInfoRef.child("dislikes");
                var dislikesInfoAR = $firebaseArray(dislikesRef);

                vm.seeMatches = function () {
                    var keyCount = 0;
                    var userCount = 0;

                    //-- The MATCHES:
                    $rootScope.matches = [];

                    //-- The ACTUAL MATCHING loop:
                    for (var i = 0; i < usersDataAR.length; i++) {
                        var user = usersDataAR[i];
                        var dislikes = user.dislikes;
                        var tArr = [];

                        var otherUserEmail = user.email;

                        // O(n)^2
                        for (var key in dislikes) {
                            if(dislikes.hasOwnProperty(key)) {
                                console.log("key = " + key);
                                tArr[keyCount] = dislikes[key].answer;
                                ++keyCount;
                            }
                        }

                        var points = 0;
                        if (points === 3) {
                            $rootScope.matches[userCount] = {
                                grade: "A+",
                                user: otherUserEmail
                            };
                            userCount++;
                        } else if (points === 2) {
                            $rootScope.matches[userCount] = {
                                grade: "B+",
                                user: otherUserEmail
                            };
                            userCount++;
                        } else if (points === 1) {
                            $rootScope.matches[userCount] = {
                                grade: "C+",
                                user: otherUserEmail
                            };
                            userCount++;
                        } else if (points === 0) {
                            $rootScope.matches[userCount] = {
                                grade: "no matches :|",
                                user: otherUserEmail
                            };
                            userCount++;
                        }

                        console.log("-------------------------------------------------------------");
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