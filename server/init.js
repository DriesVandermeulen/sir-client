Meteor.startup(function () {
    //Meteor.users.remove({});

    process.env.MAIL_URL = 'smtp://postmaster%40giftsbysir.com:d4f12027a5eedd67d100313bf142d402@smtp.mailgun.org:587';

    Mollie = Meteor.npmRequire('mollie-api-node');
    Future = Meteor.npmRequire('fibers/future');
    mollie = new Mollie.API.Client;
    mollie.setApiKey("test_Qk8pSfhFJgjhPAj5hDknAefAgcrAhU");

    if (Meteor.users.find().count() === 0) {
        var users = [
            {name:"Dries",email:"dries@giftsbysir.com",roles:['admin']},
            {name:"Stein",email:"stein@giftsbysir.com",roles:['admin']},
            {name:"Manu",email:"manu@giftsbysir.com",roles:['admin']},
            {name:"Vincent",email:"vincent@giftsbysir.com",roles:['admin']},
            {name:"User",email:"user@giftsbysir.com",roles:['user']}
        ];

        _.each(users, function (user) {
            var id;

            id = Accounts.createUser({
                email: user.email,
                password: "giftsbysir",
                profile: { name: user.name }
            });

            if (user.roles.length > 0) {
                // Need _id of existing user record so this call must come
                // after `Accounts.createUser` or `Accounts.onCreate`
                Roles.addUsersToRoles(id, user.roles, Roles.GLOBAL_GROUP);
            }

        });
    }

    Gifts.remove({});
    Events.remove({});
    Questions.remove({});
    Categories.remove({});

    if (Gifts.find().count() === 0) {
        //insert Gift1 with 1 Gifts tag + Contact tags : 1 primary Tag and 2 SubTags | Housewarming
        Gifts.insert({
            name: "Fles sterke",
            description: "test",
            events: [{
                name: "housewarming",
                eventId: 1
            }],
            price: 24,
            gender: 'V',
            age: {
                min: 25,
                max: 40
            },
            tags: {
                gift: [{
                    name: "book",
                    tagId: 1
                }],
                context: {
                    primary: [{
                        name: "reading",
                    }],
                    secondary: [
                        {
                            name: "best seller",
                        },
                        {
                            name: "bibliografie",
                        }]
                }
            },
            randomID: Math.random()
        });

        //insert Gift2 with 1 Gifts tag + Contact tags : 1 primary Tag and 2 SubTags | Housewarming
        Gifts.insert({
            name: "Millenium Falcon",
            description: "test",
            events: [{
                name: "housewarming",
                eventId: 1
            }],
            price: 50,
            gender: 'M',
            age: {
                min: 18,
                max: 25
            },
            tags: {
                gift: [{
                    name: "onderleggers",
                    tagId: 1
                }],
                context: {
                    primary: [{
                        name: "interior",
                        tagId: 1
                    }],
                    secondary: [
                        {
                            name: "design",
                            tagId: 1
                        },
                        {
                            name: "modern",
                            tagId: 1
                        }]
                }
            },
            randomID: Math.random()

        });

        //insert Gift3 with 1 Gifts tag + Contact tags : 2 primary Tag and 1 SubTags | Housewarming
        Gifts.insert({
            name: "Tutter",
            description: "test",
            events: [{
                name: "baby party",
                eventId: 1
            }],
            price: 14,
            gender: 'M',
            age: {
                min: 0,
                max: 8
            },
            tags: {
                gift: [{
                    name: "calender",
                    tagId: 1
                }],
                context: {
                    primary: [{
                        name: "reading",
                        tagId: 1
                    },
                        {
                            name: "ecology",
                            tagId: 1
                        }],
                    secondary: [{
                        name: "calender",
                        tagId: 1
                    }]
                }
            },
            randomID: Math.random()
        });

        //insert Gift4 with 1 Gifts tag + Contact tags : 2 primary Tag and 1 SubTags | Housewarming
        Gifts.insert({
            name: "Plant",
            description: "test",
            events: [{
                name: "housewarming",
                eventId: 1
            }],
            price: 26,
            gender: 'M',
            age: {
                min: 30,
                max: 60
            },
            tags: {
                gift: [{
                    name: "calender",
                    tagId: 1
                }],
                context: {
                    primary: [{
                        name: "reading",
                        tagId: 1
                    },
                        {
                            name: "ecology",
                            tagId: 1
                        }],
                    secondary: [{
                        name: "calender",
                        tagId: 1
                    }]
                }
            },
            randomID: Math.random()
        });

        var eventHousewarming = Events.findOne(Events.insert({
            name: "housewarming"
        }));


        var categoryBooks = Categories.findOne(Categories.insert({
            name: "books",
            text: "does he/she loves to read books ?"
        }));
        
        var categoryDesign = Categories.findOne(Categories.insert({
            name: "design",
            text: "does he/she loves design?"
        }));
            var categoryGadget = Categories.findOne(Categories.insert({
            name: "gadget",
            text: "Is he/she a Gadget person?"

        }));

        var questionMakesYouSmile = Questions.findOne(Questions.insert({
            name: "makes you smile",
            text: "Does he or she like humor? "
        }));

        var questionMakesYouSmile2 = Questions.findOne(Questions.insert({
            name: "makes you smile2",
            text: "Does he or she like humor2? "
        }));

        var questionMakesYouSmile3 = Questions.findOne(Questions.insert({
            name: "makes you smile3",
            text: "Does he or she like humor3? "
        }));

        var questionMakesYouSmile4 = Questions.findOne(Questions.insert({
            name: "makes you smile4",
            text: "Does he or she like humor4? "
        }));

        Gifts.insert({
            name: "Design Gift",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryDesign],
            questions: [questionMakesYouSmile, questionMakesYouSmile2],
            randomID: Math.random()
        });

        Gifts.insert({
            name: "Books & Design Gift",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryBooks, categoryDesign],
            questions: [questionMakesYouSmile, questionMakesYouSmile4],
            randomID: Math.random()
        });

        Gifts.insert({
            name: "Gadget",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryGadget],
            questions: [questionMakesYouSmile, questionMakesYouSmile4],
            randomID: Math.random()
        });

        Gifts.insert({
            name: "Design Gift2",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryDesign],
            questions: [questionMakesYouSmile, questionMakesYouSmile4],
            randomID: Math.random()
        });

        Gifts.insert({
            name: "Books 4",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryBooks],
            questions: [questionMakesYouSmile, questionMakesYouSmile3],
            randomID: Math.random()
        });

        Gifts.insert({
            name: "Books 5",
            description: "Some description",
            events: [eventHousewarming],
            price: 24,
            gender: 'F',
            age: {
                min: 25,
                max: 40
            },
            categories: [categoryBooks],
            questions: [questionMakesYouSmile,],
            randomID: Math.random()
        });

    } 
    
    Meteor.methods({
    'sendMail': function(randomGift){
        Email.send({
        from: "stein@giftsbysir.com",
        to: "steinvermeulen@gmail.com",
        replyTo: "stein@giftsbysir.com",
        subject: "Gift: " + randomGift.name + " was just ordered via Sir",
        html: ''
      });
    },

    'newPayment': function(gift, track) { 
      // load Future 
      var newPayment = new Future(); 
        
        mollie.payments.create({
            amount: gift.price,
            description: gift.name,
            redirectUrl: "http://localhost:3000/#/"+track._id+"/new-gift/gift-checkout"
            //redirectUrl: "http://localhost:3000/#/home"
        },  Meteor.bindEnvironment(function (payment) {
            if (payment.error) newPayment.throw(error);
            paymentUrl = payment.getPaymentUrl();
            paymentID = payment.id;  

            Tracks.update(track._id, { $set: {
                paymentUrl: paymentUrl,
                paymentID: paymentID
            }});
            console.log(paymentUrl);
            newPayment.return(paymentUrl);
           
        }));

        return newPayment.wait();

    },
    'checkPayment' : function(trackId){
        var track = Tracks.findOne(trackId);
        var checkPayment = new Future; 
        console.log(track.paymentID[0]);
        mollie.payments.get(track.paymentID, Meteor.bindEnvironment(function(payment) {
                if (payment.error) {
                    checkPayment.throw(payment.error);  
                }           

                if (payment.status == "paid") {
                   
                    Tracks.update(track._id, { $set: {
                        status: "Completed"
                    }});
                   
                   console.log("Paid!");
                   checkPayment.return(1);
                } else if (payment.status !== "open") {

                    
                    Tracks.update(track._id, { $set: {
                        status: "Expired"
                    }});

                    console.log("not Paid!");
                    checkPayment.return(0);
                }
            }));
        return checkPayment.wait();
    }

    });
});