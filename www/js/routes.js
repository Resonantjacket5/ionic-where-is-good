angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('tabsController.eventsTabDefaultPage', {
//      abstract: true,
      //url: '/page4',
      url: '/events',
      views: {
        'tab4': {
          templateUrl: 'templates/eventsTabDefaultPage.html',
          controller: 'eventsTabDefaultPageCtrl'
        }
      }
    })
        
      
    .state('eventPage', {
      url: '/events/:eventID',
      templateUrl: 'templates/eventPage.html',
      controller: 'eventPageCtrl'
//      resolve: {
//        eventID: function($stateParams, EventsService) {
//          return EventsService.getEvent($stateParams.eventID); 
//        }
//      }
    })
      
        
    .state('tabsController.createTabDefaultPage', {
      url: '/create',
      views: {
        'tab3': {
          templateUrl: 'templates/createTabDefaultPage.html',
          controller: 'createTabDefaultPageCtrl'
        }
      }
    })
        
      
    
      
        
    .state('login', {
      url: '/page1',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
        
      
    
      
    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })
      
    
      
        
    .state('tabsController.joinTabDefaultPage', {
      url: '/join',
      views: {
        'tab2': {
          templateUrl: 'templates/joinTabDefaultPage.html',
          controller: 'joinTabDefaultPageCtrl'
        }
      }
    })
        
      
    
      
        

        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/page1');

});