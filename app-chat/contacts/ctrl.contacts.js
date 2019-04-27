/**
 * Created by Julius Alvarado on 8/8/2017.
 */

angular.module('app').controller('ContactCtrl', ['jUsers', '$mdBottomSheet', '$mdSidenav',
    function (jUsers, $mdBottomSheet, $mdSidenav) {
        var vm = this;
        vm.users = jUsers.all;

        vm.selectUser = function (user) {
            vm.selected = user;
        };

        vm.toggleList = function(){
            $mdSidenav('leftnav').toggle();
        };

        vm.share = function () {
            $mdBottomSheet.show({
                controller: UserSheetCtrl,
                controllerAs: "mdbs",
                templateUrl: "./contacts/temp.bottomSheet.html",
                parent: angular.element("body")
            });
        };

        function UserSheetCtrl() {
            var b = this;
            b.user = vm.selected;
            b.items = [
                {name: 'Phone', icon: 'phone', icon_url: './images/svg/phone.svg'},
                {name: 'Twitter', icon: 'twitter', icon_url: './images/svg/twitter.svg'},
                {name: 'Google+', icon: 'google_plus', icon_url: './images/svg/google_plus.svg'},
                {name: 'Hangout', icon: 'hangouts', icon_url: './images/svg/hangouts.svg'}
            ];
            b.performAction = function(action){
                $mdBottomSheet.hide(); //
            }
        }
    }
]);