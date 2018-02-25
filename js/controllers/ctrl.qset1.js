(function () {
    "use strict";

    angular.module('myApp').controller("QuestionSetOneCtrl", ["$rootScope", "$scope",
        "$location", "jBufiDataSer", "$firebaseAuth", "$firebaseArray", QuestionSetOneCtrlClass]);

    function QuestionSetOneCtrlClass($rootScope, $scope, $location, jBufiDataSer, $firebaseAuth, $firebaseArray) {
        var vm = this;
        vm.message = "QuestionSetOneCtrl wired up!";

        var ref = firebase.database().ref();
        var auth = $firebaseAuth();

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentScore = 0;

        activate();
        setActiveQuestion();

        // will NOT work at the moment...
        $scope.seeMatchesUnauth = function () {
            if (!$rootScope.currentUser) {
                $location.url("/register");
            } else {
                $location.url("/matches");
            }

            var dislikes = dislikesInfoAR.$keyAt(1);

            console.log("BuddyMatch.me - entire dislikes array for this user:");
            console.log(dislikesInfoAR);
            $rootScope.matchesAlgo = "Sorry, I didn't complete this algorithm :'( ";
        };

        auth.$onAuthStateChanged(function (authUser) {
            if (authUser) {
                //-- DB refs:
                var usersRef = ref.child('users');
                var authUsersInfoRef = usersRef.child(authUser.uid);
                var dislikesRef = authUsersInfoRef.child("dislikes");
                //-- Firebase Arrays:
                var usersDataAR = $firebaseArray(usersRef);
                var authUsersInfoAR = $firebaseArray(authUsersInfoRef);
                var dislikesInfoAR = $firebaseArray(dislikesRef);
                //-- View Model Data Bindings:
                $scope.meetings = authUsersInfoAR;

                // selectAnswer() is The sort of Engine that powers this questionnaire
                $scope.selectAnswer = function (indexQuestion, indexAnswer) {
                    $scope.userAnswer = $scope.myQuestions[indexQuestion].answers[indexAnswer].text;
                    var item = {
                        question: $scope.myQuestions[indexQuestion].question,
                        answer: $scope.myQuestions[indexQuestion].answers[indexAnswer].text
                    };

                    addAnswerData(item);

                    var questionState = $scope.myQuestions[indexQuestion].questionState;

                    if (questionState !== 'answered') { // .questionState is falsey because user has yet to click on an answer
                        $scope.myQuestions[indexQuestion].selectedAnswer = indexAnswer;
                        var correctAnswer = $scope.myQuestions[indexQuestion].correct;
                        $scope.myQuestions[indexQuestion].correctAnswer = correctAnswer;

                        if (indexAnswer === correctAnswer) {
                            $scope.myQuestions[indexQuestion].correctness = 'correct';
                            $scope.score += 1;
                        } else {
                            $scope.myQuestions[indexQuestion].correctness = 'incorrect';
                        }
                        // now that user has clicked on an answer I now set .questionState
                        $scope.myQuestions[indexQuestion].questionState = 'answered';
                    }

                    $scope.percentScore = (100 * ($scope.score / $scope.totalQuestions)).toFixed(2);
                };

                $scope.seeMatches = function () {
                    if (!$rootScope.currentUser) {
                        $location.url("/register");
                    }
                    $location.url("/matches");
                    console.log(" - jha - dislikesInfoAR for this user:");
                    console.log(dislikesInfoAR);
                    console.log(" - jha - usersDataAR:");
                    console.log(usersDataAR);

                    $rootScope.matchesAlgo = "Sorry, I didn't complete this algorithm :'( ";
                };

                var addAnswerData = function (item) {
                    var localCopyDislikesAR = dislikesInfoAR.slice();

                    console.log("localCopyDislikesAR =");
                    console.log(localCopyDislikesAR);

                    if (!dislikesInfoAR) {
                        console.log("in $add() bool state");
                        dislikesInfoAR.$add(item).then(function (ref) {
                            console.log(" - jha -  in $add(), ref = ");
                            console.log(ref);
                        }).catch(function (err) {
                            console.log(" - jha - $add() state Error:");
                            console.log(err);
                        });
                    } else {
                        console.log("in $save() bool state");
                        dislikesInfoAR.$save(item).then(function (ref) {
                            console.log(" - jha - in $save(), ref = ");
                            console.log(ref);
                        }).catch(function (err) {
                            console.log(" - jha - $save() Error:");
                            console.log(err);
                        });
                    }
                }
            } // END "if(authUser){}"

            $scope.isSelected = function (qIndex, aIndex) {
                return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
            };

            $scope.isCorrect = function (qIndex, aIndex) {
                return $scope.myQuestions[qIndex].correctAnswer === aIndex;
            };

            $scope.selectContinue = function () {
                return $scope.activeQuestion += 1;
            };
        });

        $scope.createShareLinks = function (percent) {
            var url = 'http://php1.julius3d.com';
            var emailLink = '<a href="mailto:?subject=Quiz Score.&amp;body=Beat my ' + percent +
                '% quiz score at ' + url + ' studios." class="btn btn-sm btn-warning email">Email</a>';
            var tweetLink = '<a href="http://twitter.com/share?text=I scored ' + percent + ' on my AngularJS quiz. ' +
                'Beat my score at &hashtags=ngQuiz&url=' + url + '" target="_blank" class="btn btn-sm btn-info twitter">Tweet</a>';

            var newMarkup = emailLink + tweetLink;
            return $sce.trustAsHtml(newMarkup);
        };

        function setActiveQuestion() {
            $scope.activeQuestion = 0;
        }

        function activate() {
            jBufiDataSer.getLocalData().then(function (res) {
                $scope.myQuestions = res.data;
                $scope.totalQuestions = $scope.myQuestions.length;
            });
        }
    }
})();