var myApp = angular.module('myApp', ['ngRoute', 'firebase']);

myApp.run(['$rootScope', '$location', function ($rootScope, $location) {
    // check for an error during route switching
    $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
        if (error == 'AUTH_REQUIRED') {
            console.log("jha - in if (error == 'AUTH_REQUIRED'){} block");
            $rootScope.message = 'Sorry, you must log in to access that page';
            $location.path('/login');
        } //Auth Required
    }); //$routeChangeError
}]); //run

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/view.home.html',
            controller: 'RegistrationController'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        })
        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        })
        .when('/success', {
            templateUrl: 'views/success.html',
            controller: 'SuccessController',
            resolve: {
                currentAuth: function (Authentication) {
                    return Authentication.requireAuth();
                } // currentAuth
            } // resolve
        })
        .when('/checkins/:userId/:meetingId', {
            templateUrl: 'views/checkins.html',
            controller: 'CheckInsController'
        })
        .when('/checkins/:userId/:meetingId/checkinsList', {
            templateUrl: 'views/checkinslist.html',
            controller: 'CheckInsController'
        })
        .when('/meetings', {
            templateUrl: 'views/meetings.html',
            controller: 'MeetingsController'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);