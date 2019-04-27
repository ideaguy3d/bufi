/**
 * Created by Julius Alvarado on 1/15/2018.
 */

(function () {
    "use strict";

    angular.module('myApp').directive('jaSpaceBarSupport', [
        function () {
            return {
                restrict: 'A',
                link: function (scope, elem, attr) {
                    jQuery('body').on('keypress', function (evt) {
                        var vidElem = elem[0];
                        if (evt.keyCode === 32) {
                            if(vidElem.paused) {
                                vidElem.play();
                            } else {
                                vidElem.pause();
                            }
                        }
                    })
                }
            }
        }
    ]);

    angular.module('myApp').directive('jaEventPause', function(){
        return {
            restrict: 'A',
            scope: {
                eventPause: "&jaEventPause"
            }
        }
    })
})();