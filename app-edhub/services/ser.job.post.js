/**
 * Created by Julius Alvarado on 9/17/2017.
 */

(function () {
    "use strict";

    angular.module('edhubJobsApp').factory('edhubJobPostService', ['$firebaseArray',
        function ($firebaseArray) {
            const refJobPostings = firebase.database().ref('jobPostings');
            const refOrgApplicants = firebase.database().ref('orgApplicants');

            var jobPostingsLimitTo = function (limit) {
                const qJobPostingsLimitToOrderByDate = refJobPostings.orderByChild("timeStamp").limitToLast(limit);
                return $firebaseArray(qJobPostingsLimitToOrderByDate);
            };

            var forOrg = function (orgId) {
                return $firebaseArray(refOrgApplicants.child(orgId));
            };

            return {
                jobPostings: $firebaseArray(refJobPostings),
                jobPostingsLimitTo: jobPostingsLimitTo,
                forOrg: forOrg
            };
        }
    ]);
}());


