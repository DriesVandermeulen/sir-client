angular
    .module('Sir')
    .controller('GiftsCtrl', GiftsCtrl);

function GiftsCtrl ($scope, $reactive, $stateParams) {
    $reactive(this).attach($scope);

    var trackId = $stateParams.trackId;
    var track = Tracks.findOne(trackId);
    var gifts = findGifts(track).fetch();

    track.questions = {
        yes: [],
        no: []
    };

    findAndAskQuestion(); 
    findAndAskQuestion(); 

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

        if(search.primary) {
            query.$and.push({"categories.name":{ $in: search.primary}});
        }
        if(search.secondary) {
            query.$and.push({"questions.name":{ $in: search.secondary}});
        }
        if(search.gifts) {
            query.$and.push({"id":{ $in: search.gifts}});
        }       

        return Gifts.find(query);

    }

    function findAndAskQuestion() {
        var questions = [];

        var giftsFound = findGifts(track).fetch();


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

        for(var i = 0, l = track.questions.yes.length; i < l; i++) {

            questions = _.reject(questions, function(question){ 
                return question._id == track.questions.yes[i]._id; 
            });

        }

         for(var i = 0, l = track.questions.no.length; i < l; i++) {

            questions = _.reject(questions, function(question){ 
                return question._id == track.questions.no[i]._id; 
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
        console.log(questions[0].text);

        //alert with usdr input yes or no
        var answer = confirm(questions[0].text);
        if (answer == true) {
            track.questions.yes.push(questions[0]);
        } else {
            track.questions.no.push(questions[0]);
        }
        
        //add question object to track.questions yes / no
        //change find question => don't include yes /no questions 
    }
}