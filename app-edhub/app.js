/**
 * Created by Julius Alvarado on 9/2/2017.
 */

angular
    .module('edhubJobsApp', [
        'firebase',
        'angular-md5',
        'ngRoute',
        'ngMaterial',
        'ngMdIcons',
        'smoothScroll'
    ])
    .config(['$routeProvider', '$locationProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'states/landing/view.landing.html',
                    controller: 'LandingCtrl',
                    controllerAs: 'landingCtrl'
                })
                .when('/signup', {
                    url: '/signup',
                    templateUrl: 'states/auth/view.signup.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'signup'
                })
                .when('/login', {
                    templateUrl: 'states/auth/view.login.html',
                    controller: 'AuthCtrl',
                    controllerAs: 'login'
                })
                .when('/user-auth-logout/logout-page', {
                    templateUrl: 'states/auth/view.logout.html'
                })
                .when('/profile/:user', {
                    templateUrl: 'states/auth/view.profile.html'
                })
                .when('/post', {
                    templateUrl: 'states/post/view.post.html',
                    controller: 'PostJobCtrl',
                    controllerAs: 'postJobCtrl'
                })
                .when('/apply', {
                    templateUrl: 'states/apply/view.apply.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/apply/:orgId/:orgName', {
                    templateUrl: 'states/apply/view.apply.org.html',
                    controller: 'ApplyToOrgCtrl',
                    controllerAs: 'applyToOrgCtrl',
                    resolve: {
                        orgJobAppsRslv: function($route, edhubJobPostService){
                            console.log("$route.current = ");
                            console.log($route.current);
                            return edhubJobPostService.forOrg($route.current.params.orgId).$loaded();
                        }
                    }
                })
                .when('/apply-thanks', {
                    templateUrl: 'states/apply/view.thanks.html'
                })
                .when('/apply-job/:orgName/:jobId', {
                    templateUrl: 'states/apply/view.apply.org.job.html',
                    controller: 'ApplyToJobCtrl',
                    controllerAs: 'applyToJobCtrl'
                })
                .when('/lab916', {
                    templateUrl: '/states/lab916/view.landing.html'
                })
                // practice stuff
                .when('/uit1', {
                    templateUrl: 'ui-prac/uit1.html',
                    controller: 'uiPracCtrl',
                    controllerAs: 'ui'
                })
                // go to base url
                .otherwise('/');

            // Initialize Firebase
            const config = {
                apiKey: "AIzaSyDEyWzMw0NPhKUnjWTNsYeqAWazk5cR_LI",
                authDomain: "edhub-jobs.firebaseapp.com",
                databaseURL: "https://edhub-jobs.firebaseio.com",
                projectId: "edhub-jobs",
                storageBucket: "edhub-jobs.appspot.com",
                messagingSenderId: "743478741402"
            };
            firebase.initializeApp(config);
        }
    ]);