angular
    .module('Sir')
    .controller('HistoryCtrl', HistoryCtrl);

function HistoryCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var userID = Meteor.userId();

    //let giftHistory = Tracks.find( {$and: [{ createdBy: userID, }, { status: { $not: {$ne: "Completed"} } }]});

    
    this.helpers({
        purchases() {
            return Purchases.find( {$and: [{ userID: userID, }, { paymentStatus: { $not: {$ne: "Completed"} } }]});
        }
    });
    
}