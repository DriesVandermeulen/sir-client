angular
    .module('Sir')
    .controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var userID = Meteor.userId();

    //let giftHistory = Tracks.find( { createdBy: userID, $where:}).fetch();

    
    this.helpers({
        track() {
            return Tracks.findOne(trackId);
        }
    });
    
}