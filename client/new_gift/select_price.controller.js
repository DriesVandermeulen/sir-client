angular
    .module('Sir')
    .controller('SelectPriceCtrl', SelectPriceCtrl);

function SelectPriceCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);

    this.helpers({
        track() { return track }
    });

    this.next = () => {
        updateTrack(this.track);
        $state.go('newGift.gifts', { trackId });
    };

    this.previous = () => {
        updateTrack(this.track);
        $state.go('newGift.selectPerson', { trackId });
    };

    function updateTrack(track) {
        Tracks.update(track._id, { $set: {
            price: {
                min: parseInt(track.price.min),
                max: parseInt(track.price.max)
            }
        }});
    }
}