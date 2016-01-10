angular
    .module('Sir')
    .controller('SelectEventCtrl', SelectEventCtrl);

function SelectEventCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;

    this.helpers({
        track() {
            return Tracks.findOne(trackId);
        }
    });

    this.next = () => {
        updateTrack(this.track);
        $state.go('newGift.selectPerson', { trackId });
    };

    function updateTrack(track) {
        Tracks.update(track._id, { $set: {
            event: track.event
        }});
    }
}