angular
    .module('Sir')
    .controller('SelectQuestionCtrl', SelectQuestionCtrl);

function SelectQuestionCtrl($scope, $reactive, $state, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);
    var gifts = findGifts(track).fetch();
    var questions = [];

    if(findQuestion(track)){
         this.question = findQuestion(track); 
    }
   
    else{
        $state.go('newGift.giftProposal', { trackId });
    }

    this.helpers({
        track() { return Tracks.findOne(trackId) }
    });

    this.yes = () => {
        var track = updateTrackYes(this.track, this.question);
        //$state.go('newGift.gifts', { trackId });
       
        if(findQuestion(track)){
            this.question = findQuestion(track);
            $state.go($state.current, {}, {reload: true});
        }

        else {
            $state.go('newGift.giftProposal', { trackId });
        }
    };

    this.no = () => {
        //updateTrack(this.track);
        var track = updateTrackNo(this.track, this.question);

        if(findQuestion(track)){
            this.question = findQuestion(track);
             $state.go($state.current, {}, {reload: true});
        }

        else {
            $state.go('newGift.giftProposal', { trackId });
        }
    };

    function updateTrackYes(track, question) {
        Tracks.update(track._id, { $push: {
            'questions.yes': question
            }
        });
        return Tracks.findOne(track._id);
    }

      function updateTrackNo(track, question) {
        Tracks.update(track._id, { $push: {
            'questions.no': question
            }
        });
        return Tracks.findOne(track._id);
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

    function findQuestion(search) {
        

        var giftsFound = findGifts(search).fetch();

        if(giftsFound.length) {
        //iterate through all found gifts
            for(var i = 0, l = giftsFound.length; i < l; i++) {

            //iterate through all questions of one gift
                for(var k = 0, length = giftsFound[i].questions.length; k < length; k++) {    

                //check if question is in the array list      
                    if (!questions.some(function (el) {return el.name === giftsFound[i].questions[k].name;})) { 
                        
                        //if not => add to question list
                        giftsFound[i].questions[k].count = 1;
                        questions.push(giftsFound[i].questions[k]); 
                        
                        }
                //if already in list => add count 
                    else {
                            var index = $.map(questions, function(obj, index) {
                                if(obj.name == giftsFound[i].questions[k].name) {
                                    return index;
                                }
                            })
                            questions[index].count  = questions[index].count+1;
                            console.log("count ++");
                        }
                }
            }

            //remove all questions already asked

            for(var i = 0, l = search.questions.yes.length; i < l; i++) {

                questions = _.reject(questions, function(question){ 
                    return question._id == search.questions.yes[i]._id; 
                });

            }

             for(var i = 0, l = search.questions.no.length; i < l; i++) {

                questions = _.reject(questions, function(question){ 
                    return question._id == search.questions.no[i]._id; 
                });

            }

            console.log(questions);

            //sort list from max to min
            questions.sort(function (a, b) {
                  if (a.count < b.count) {
                    return 1;
                  }
                  if (a.count > b.count) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
            });

            //ask index 0 as this is max question
            //console.log(questions[0].text);

            //alert with usdr input yes or no
            return(questions[0]);
           
            //add question object to track.questions yes / no
            //change find question => don't include yes /no questions 
        }
        else{
            console.log("No Gifts found");
        }
    }
}