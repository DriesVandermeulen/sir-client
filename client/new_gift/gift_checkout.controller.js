angular
    .module('Sir')
    .controller('GiftCheckoutCtrl', GiftCheckoutCtrl);

function GiftCheckoutCtrl ($scope, $reactive, $stateParams, $state) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    //var track = Tracks.findOne(trackId);
    var checkpaymentStatus; 

    checkPayment(trackId);

    this.helpers({
    track() {
            let track = Tracks.findOne(trackId);
            
     }
    });

this.home = () => {
        $state.go('home');
    };

function sendMail(track){
	var suggestions = track.suggestions;
	Meteor.call('sendMail', suggestions[0]);
}

function checkPayment (track){
	 	
	 	Meteor.call('checkPayment', track, function (err, result) {
           if (result == 1){
           	//sendMail(track);
           	console.log("Payment Received");
            this.paymentStatus = "Je betaling is goed ontvangen. Parcify neemt binnen de 12u met je contact op om de levering in orde te brengen";
           	return;
           }
           else { 
           	console.log("Payment NOT Received");
           	this.paymentStatus = "Je betaling is niet ontvangen. Gelieve je bestelling opnieuw te plaatsen.";
           	return;
           }
         });
}

}