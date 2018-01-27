myApp.factory('Authentication',
    ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
        function ($rootScope, $location, $firebaseObject, $firebaseAuth) {

            var ref = firebase.database().ref();
            var auth = $firebaseAuth();
            var authapi;

            auth.$onAuthStateChanged(function (authUser) {
                console.log("jha - there was a change to auth state...");
                if (authUser) {
                    var userRef = ref.child('users').child(authUser.uid);
                    $rootScope.currentUser = $firebaseObject(userRef);
                } else {
                    $rootScope.currentUser = '';
                }
            });

            authapi = {
                login: function (user) {
                    auth.$signInWithEmailAndPassword(
                        user.email,
                        user.password
                    ).then(function (user) {
                        $location.path('/success');
                    }).catch(function (error) {
                        $rootScope.message = error.message;
                    }); //signInWithEmailAndPassword
                }, //login

                logout: function () {
                    return auth.$signOut();
                }, //logout

                requireAuth: function () {
                    return auth.$requireSignIn();
                }, // require Authentication

                register: function (user) {
                    auth.$createUserWithEmailAndPassword(
                        user.email,
                        user.password
                    ).then(function (regUser) {
                        var regRef = ref.child('users').child(regUser.uid).set({
                                date: firebase.database.ServerValue.TIMESTAMP,
                                regUser: regUser.uid,
                                firstname: user.firstname,
                                lastname: user.lastname,
                                email: user.email
                            }); // user info
                        $rootScope.message = "Thanks for registering "+user.firstname;
                        authapi.login(user);
                    }).catch(function (error) {
                        $rootScope.message = error.message;
                    }); //createUserWithEmailAndPassword
                } //register

            }; //return


            return authapi;

        }]); //factory