angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('tabsController.eventsTabDefaultPage', {
      url: '/events',
      views: {
        'eventsTab': {
          templateUrl: '/events/eventsTabDefaultPage.html',
          controller: 'eventsTabDefaultPageCtrl'
        }
      }
    })
    .state('tabsController.eventPage', {
      url: '/events/:eventID',
      views: {
        'eventsTab':{
          templateUrl: '/events/eventPage.html',
          controller: 'eventPageCtrl'
        }
      }
    })
      
        
    .state('tabsController.createTabDefaultPage', {
      url: '/create',
      views: {
        'createTab': {
          templateUrl: '/create/createTabDefaultPage.html',
          controller: 'createTabDefaultPageCtrl'
        }
      }
    })
        
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'login/login.html',
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
        'joinTab': {
          templateUrl: 'join/joinTabDefaultPage.html',
          controller: 'joinTabDefaultPageCtrl'
        }
      }
    })
        

        
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});