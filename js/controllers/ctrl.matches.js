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
                var authUsersDislikesA = $firebaseArray(dislikesRef);

                vm.seeMatches = function () {
                    var keyCount = 0;
                    var userCount = 0;

                    //-- The MATCHES:
                    $rootScope.matches = [];

                    //-- The ACTUAL MATCHING loop:
                    for (var i = 0; i < usersDataAR.length; i++) {
                        var user = usersDataAR[i]; // the other user
                        var dislikes = user.dislikes; // other users' dislikes
                        var tArr = [];
                        var otherUserEmail = user.email;
                        var points = 0;

                        // O(n)^2
                        for (var key in dislikes) {
                            if (dislikes.hasOwnProperty(key)) {
                                // .key will update with each for.in iteration.
                                var otherUserQues = dislikes[key].question;
                                var authUserQues1 = authUsersDislikesA[0].question;
                                var authUserQues2 = authUsersDislikesA[1].question;
                                var authUserQues3 = authUsersDislikesA[2].question;

                                if (otherUserQues === authUserQues1) {
                                    if (dislikes[key].answer === authUsersDislikesA[0].answer) points++;
                                } else if (otherUserQues === authUserQues2) {
                                    if (dislikes[key].answer === authUsersDislikesA[1].answer) points++;
                                } else if (otherUserQues === authUserQues3) {
                                    if (dislikes[key].answer === authUsersDislikesA[2].answer) points++;
                                }
                            }
                        }

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
                                grade: "F",
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

                    console.log("-----------------> MATCHES MATCHES MATCHES = ");
                    console.log($rootScope.matches);

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