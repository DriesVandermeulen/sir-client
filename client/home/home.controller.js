angular
    .module('Sir')
    .controller('HomeCtrl', HomeCtrl);

function HomeCtrl ($scope, $reactive, $state) {
    $reactive(this).attach($scope);

    this.goToNewGift = () => {
        var trackId = newGift();
        $state.go('newGift.selectEvent', { trackId });
    };

    this.goToGifts = () => {
        $state.go('gifts');
    };

    function newGift() {
        return Tracks.insert({
            event: '',
            name: '',
            age: '',
            gender: '',
            date: '',
            price: {
                min: 0,
                max: 100
            },
            suggestions: [],
            createdBy: Meteor.userId()
        });
    }
}