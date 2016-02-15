angular
    .module('Sir')
    .controller('GiftCheckoutCtrl', GiftCheckoutCtrl);

function GiftCheckoutCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);
    
    this.buyGift = () => {
        Meteor.call('sendMail');
   };



}