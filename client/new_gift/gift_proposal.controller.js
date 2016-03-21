angular
    .module('Sir')
    .controller('GiftProposalCtrl', GiftProposalCtrl);

function GiftProposalCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var placeholder = {
        name:"We don't have a gift for you at the moment",
        description:"please come back another time"
    };
    this.sugestionCount = 0;

    this.helpers({
        track() {
            return Tracks.findOne(trackId);
        },
        suggestion() {
            let count = this.getReactively('sugestionCount')
            let track = this.track;
            let suggestion = suggestGift(track); 
            console.log(suggestion)
            if(suggestion) return suggestion
            else return placeholder
        }
    });

    this.suggestAnotherGift = () => {
        this.sugestionCount++;
    };

    function suggestGift(track) {
        const randomGift = Gifts.findOne(buildGiftSearchQuery(track));
        if(randomGift) {
            Tracks.update(trackId, { $push: {
                suggestions: {
                    $each: [randomGift],
                    $position: 0}
            }});
        }
        return randomGift;
    }
    
    function buildGiftSearchQuery(search) {
        let query = {};
        
        if(!search) return query;

        query.$and = [];

        if(search.age) {
            query.$and.push({"age.min":{ $lte: search.age}});
            query.$and.push({"age.max":{ $gte: search.age}});
        }

        if(search.price) {
            var price = {$and: []};
            if (search.price.min) {
                price.$and.push({"price" : {$gte: search.price.min}})
            }
            if (search.price.max) {
                price.$and.push({"price" : {$lte: search.price.max}})
            }
            query.$and.push(price);
        }

        if(search.gender){
            query.$and.push({$or: [
                {"gender" : search.gender},
                {"gender" : "N"}
            ]});
        }

        if(search.event) {
            query.$and.push({"events.name": search.event});
        }

        if(search.categories) {
            query.$and.push({"categories.name":{ $in: _.pluck(search.categories.yes, 'name')}});
            query.$and.push({"categories.name":{ $nin: _.pluck(search.categories.no, 'name')}});
        }

        if(search.secondary) {
            query.$and.push({"questions.name":{ $in: search.secondary}});
        }
        if(search.suggestions) {
            //query.$and.push({"id":{ $nin: search.suggestions}});
            query.$and.push({"_id":{ $nin: _.pluck(search.suggestions, '_id')}});
        }
        if(search.questions) {
            query.$and.push({"questions.name":{ $nin: _.pluck(search.questions.no, 'name')}});

            // query.$and.push({ "questions": { $elemMatch: { "_id": { $nin: _.pluck(search.questions.no, '_id') } } } });

        }        

        return query;
    }   

    function buildGiftSearchQuery_AnsweredYes(search) {
        let query = {};
        if(!search) return query;

        query = buildGiftSearchQuery(search)
        query.$and.push({"questions.name":{ $in: _.pluck(search.questions.yes, 'name')}});

        return query;
    }  

    this.buyGift = () => {
        
        this.call('newPayment', this.suggestion, this.track, function (err, result) {
           
           this.result = result;
           this.openPaymentWindow(result);
         });

    }

    this.openPaymentWindow = (result) => {
        console.log(result);
        var paymentWindow = window.open(result, '_self', 'location=yes');

    }



}