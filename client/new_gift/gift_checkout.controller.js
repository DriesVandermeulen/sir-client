angular
    .module('Sir')
    .controller('GiftCheckoutCtrl', GiftCheckoutCtrl);

    this.home = () => {
        $state.go('home');
    };


function GiftCheckoutCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    //var track = Tracks.findOne(trackId);
    

    this.helpers({
    track() {
            let track = Tracks.findOne(trackId);
            checkPayment(track);
     }
    });

function sendMail(track){
	var suggestions = track.suggestions;
	Meteor.call('sendMail', suggestions[0]);
}

function checkPayment (track){
	 	var checkpaymentStatus; 
	 	Meteor.call('checkPayment', track, function (err, result) {
           console.log(result);
           if (result == 1){
           	sendMail(track);

			this.paymentStatus = "Je betaling is goed ontvangen. Parcify neemt binnen de 12u met je contact op om de levering in orde te brengen";
           	return;
           }
           else { 

           	this.paymentStatus = "Je betaling is niet ontvangen. Gelieve je bestelling opnieuw te plaatsen.";
           	return;
           }
         });
}

}