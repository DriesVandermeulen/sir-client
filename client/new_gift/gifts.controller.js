angular
    .module('Sir')
    .controller('GiftsCtrl', GiftsCtrl);

function GiftsCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);
    var gifts = findGifts(track).fetch();
    
    this.helpers({
        data() {
            return gifts
        }
    });

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

        if(search.categories) {
            query.$and.push({"categories.name":{ $in: _.pluck(search.categories.yes, 'name')}});
            query.$and.push({"categories.name":{ $nin: _.pluck(search.categories.no, 'name')}});
        }

        if(search.secondary) {
            query.$and.push({"questions.name":{ $in: search.secondary}});
        }
        if(search.gifts) {
            query.$and.push({"id":{ $not: search.gifts}});
        }
        if(search.questions) {
            query.$and.push({"questions.name":{ $nin: _.pluck(search.questions.no, 'name')}});

            // query.$and.push({ "questions": { $elemMatch: { "_id": { $nin: _.pluck(search.questions.no, '_id') } } } });

        }        

        return Gifts.find(query);

    }
}