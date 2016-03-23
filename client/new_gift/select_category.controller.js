angular
    .module('Sir')
    .controller('SelectCategoryCtrl', SelectCategoryCtrl);

function SelectCategoryCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;

    this.helpers({
        track() { return Tracks.findOne(trackId) },
        category() { return Categories.findOne({ 
            $and:[ 
                { "_id":{ $nin: _.pluck(this.track.categories.yes, "_id")}}, 
                {"_id":{ $nin: _.pluck(this.track.categories.no, "_id")}} 
            ]
        })}

    });

    this.yes = () => {
        var track = updateTrackYes(this.track, this.category);
        var categories = Categories.findOne({ 
            $and:[ 
                { "_id":{ $nin: _.pluck(track.categories.yes, "_id")}}, 
                {"_id":{ $nin: _.pluck(track.categories.no, "_id")}} 
            ]
        });

        if(categories){
             $state.go($state.current, {trackId}, {reload: true});

        }

        else {
            $state.go('newGift.selectQuestion', { trackId });
        }
    };

    this.no = () => {
        //updateTrack(this.track);
        var track = updateTrackNo(this.track, this.category);

        var categories = Categories.findOne({ 
            $and:[ 
                { "_id":{ $nin: _.pluck(track.categories.yes, "_id")}}, 
                {"_id":{ $nin: _.pluck(track.categories.no, "_id")}} 
            ]
        });

        if(categories){
              $state.go($state.current, {trackId}, {reload: true});

        }

        else {
            $state.go('newGift.selectQuestion', { trackId });
        }
    };

    function updateTrackYes(track, category) {
        Tracks.update(track._id, { $push: {
            'categories.yes': category
            }
        });
        return Tracks.findOne(track._id);
    }

      function updateTrackNo(track, category) {
        Tracks.update(track._id, { $push: {
            'categories.no': category
            }
        });
        return Tracks.findOne(track._id);
    }
}