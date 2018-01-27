
myApp.controller('CheckInsController', ['$rootScope', '$scope', '$routeParams', '$firebaseObject',
    '$location', '$firebaseArray',
    function ($rootScope, $scope, $routeParams, $firebaseObject, $location, $firebaseArray) {
        $scope.whichmeeting = $routeParams.meetingId;
        $scope.whichuser = $routeParams.userId;
        $scope.order = 'firstname';
        $scope.direction = null;
        $scope.query = '';
        $scope.recordId = '';
        var ref = firebase.database().ref().child('users').child($scope.whichuser).child('meetings').child($scope.whichmeeting).child('checkins');
        var checkinsList = $firebaseArray(ref);
        $scope.checkins = checkinsList;

        $scope.showLove = function (myCheckin) {
            myCheckin.show = !myCheckin.show;
            if(myCheckin.userState === 'expanded') {
                myCheckin.userState = '';
            } else {
                myCheckin.userState = ' expanded';
            }
        };

        $scope.pickRandom = function () {
            var whichRecord = Math.round(Math.random() * (checkinsList.length - 1));
            $scope.recordId = checkinsList.$keyAt(whichRecord);
        };

        $scope.addCheckin = function () {
            $firebaseArray(ref).$add({
                firstname: $scope.user.firstname,
                lastname: $scope.user.lastname,
                email: $scope.user.email,
                date: firebase.database.ServerValue.TIMESTAMP
            }).then(function (res) {
                console.log("jha - response after adding data via fbArr = ");
                console.log(res);
                $location.path('/checkins/' + $scope.whichuser + '/' + $scope.whichmeeting + '/checkinsList');
            });
        };

        $scope.deleteCheckin = function (id) {
            var refDel = ref.child(id);
            var recordObj = $firebaseObject(refDel);
            recordObj.$remove(id);
        };

        $scope.giveLove = function (myCheckin, myGift) {
            var loveRef = ref.child(myCheckin.$id).child('awards');
            var checkinsArray = $firebaseArray(loveRef);
            checkinsArray.$add({
                name: myGift,
                date: firebase.database.ServerValue.TIMESTAMP
            });
        };

        $scope.deleteLove = function(myCheckin, key){
            var loveRef = ref.child(myCheckin.$id).child('awards').child(key);
            $firebaseObject(loveRef).$remove(key);
        };
    }]
);