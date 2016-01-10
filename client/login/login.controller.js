angular
    .module('Sir')
    .controller('LoginCtrl', LoginCtrl);

function LoginCtrl($scope, $reactive, $state, $ionicLoading, $ionicPopup, $log) {
    $reactive(this).attach($scope);

    this.login = login;

    function login() {
        if (_.isEmpty(this.data.email)) return;
        if (_.isEmpty(this.data.password)) return;

        $ionicLoading.show({
            template: 'Logging in...'
        });

        Meteor.loginWithPassword(this.data.email, this.data.password, function(error) {
            if (error) return handleError(error);
            else return handleSuccess();
        });
    }

    function handleSuccess() {
        $ionicLoading.hide();
        $state.go('home');
    }

    function handleError(err) {
        $log.error('Login error ', err);
        $ionicLoading.hide();
        $ionicPopup.alert({
            title: err.reason || 'Login failed',
            template: 'Please try again',
            okType: 'button-positive button-clear'
        });
    }
}