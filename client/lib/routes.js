angular
  .module('Sir')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'client/login/login.html',
            controller: 'LoginCtrl as login'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'client/home/home.html',
            controller: 'HomeCtrl as home',
            resolve: {
                user() { return Meteor.user(); }
            }
        })
        .state('history', {
            url: '/history',
            templateUrl: 'client/new_gift/history.html',
            controller: 'HistoryCtrl as history',
            resolve: {
                user() { return Meteor.user(); }
            }
        })
        .state('newGift', {
            url: '/:trackId/new-gift',
            abstract: true,
            template: '<ion-nav-view />',
            resolve: {
                user() { return Meteor.user(); }
            }
        })
        .state('newGift.selectEvent', {
            url: '/select-event',
            templateUrl: 'client/new_gift/select_event.html',
            controller: 'SelectEventCtrl as selectEvent'
        })
        .state('newGift.selectPerson', {
            url: '/select-person',
            templateUrl: 'client/new_gift/select_person.html',
            controller: 'SelectPersonCtrl as selectPerson'
        })
        .state('newGift.selectPrice', {
            url: '/select-price',
            templateUrl: 'client/new_gift/select_price.html',
            controller: 'SelectPriceCtrl as selectPrice'
        })
        .state('newGift.selectCategory', {
            url: '/select-category',
            cache: false,
            templateUrl: 'client/new_gift/select_category.html',
            controller: 'SelectCategoryCtrl as selectCategory'
        })
        .state('newGift.selectQuestion', {
            url: '/select-question',
            templateUrl: 'client/new_gift/select_question.html',
            controller: 'SelectQuestionCtrl as selectQuestion'
        })
        .state('newGift.giftProposal', {
            url: '/gift-proposal',
            templateUrl: 'client/new_gift/gift_proposal.html',
            controller: 'GiftProposalCtrl as giftProposal'
        })
        .state('newGift.giftCheckout', {
            url: '/gift-checkout',
            templateUrl: 'client/new_gift/gift_checkout.html',
            controller: 'GiftCheckoutCtrl as giftCheckout'
        })
        .state('newGift.gifts', {
            url: '/gifts',
            templateUrl: 'client/new_gift/gifts.html',
            controller: 'GiftsCtrl as gifts'
        });
    $urlRouterProvider.otherwise('login');
}