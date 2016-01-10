angular
    .module('Sir')
    .controller('GiftProposalCtrl', GiftProposalCtrl);

function GiftProposalCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);
    var suggestion = suggestGift(track);

    this.helpers({
        suggestion() { return suggestion }
    });

    this.suggestAnotherGift = () => {
        suggestion = suggestGift(track);
    };

    function suggestGift(track) {
        var gifts = findGifts(track).fetch();
        var randomGift = gifts[Math.floor(Math.random() * gifts.length)]
        Tracks.update(track._id, { $push: {
            suggestions: randomGift
        }});
        return randomGift;
    }

    function findGifts(search) {
        var query = {$and: []};

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

        if(search.primary) {
            query.$and.push({"tags.context.primary.name":{ $in: search.primary}});
        }
        if(search.secondary) {
            query.$and.push({"tags.context.secondary.name":{ $in: search.secondary}});
        }
        if(search.suggestions) {
            query.$and.push({"id":{ $in: search.suggestions}});
        }
        if(search.gifts) {
            query.$and.push({"id":{ $in: search.gifts}});
        }
        return Gifts.find(query);
    }
}