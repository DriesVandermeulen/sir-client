angular
    .module('Sir')
    .controller('SelectPersonCtrl', SelectPersonCtrl);

function SelectPersonCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;

    this.helpers({
        track() { return Tracks.findOne(trackId); }
    });

    this.next = () => {
        updateTrack(this.track);
        $state.go('newGift.selectPrice', { trackId });
    };

    this.previous = () => {
        updateTrack(this.track);
        $state.go('newGift.selectEvent', { trackId });
    };

    function updateTrack(track) {
        Tracks.update(track._id, { $set: {
            name: track.name,
            age: parseInt(track.age),
            gender: track.gender
        }});
    }
}