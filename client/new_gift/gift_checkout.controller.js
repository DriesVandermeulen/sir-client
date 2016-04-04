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

function checkPayment (trackId){
	 	
	 	Meteor.call('checkPayment', trackId, function (err, result) {

          var track = Tracks.findOne(trackId);          
           if (result == 1){
           	//sendMail(track);
            var purchase = Purchases.findOne({trackID : trackId});
            Purchases.update(
              {
                _id: purchase._id
              },
              { $set: 
                {
                  paymentStatus : track.status,
                  paymentUrl : track.paymentUrl
                }
              }
            );

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