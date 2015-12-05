/*global angular */

angular.module('app.controllers', ['ionic'])
  
.controller('eventsTabDefaultPageCtrl', function($scope,$ionicModal, EventsService) {
  $scope.events = [];
  $scope.events = EventsService.getEvents();
  
  console.log("events tab reloaded");
  
  $ionicModal.fromTemplateUrl('new-event.html',function(modal){
    $scope.eventModal = modal; 
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  
  $scope.newEvent = function() {
    $scope.eventModal.show();
  };
  
  $scope.closeNewEvent = function() {
    console.log("close");
    $scope.eventModal.hide();
  };
  
  $scope.createEvent = function(event) {
    EventsService.addEvent(angular.copy(event));
    
    //erase name and creator fields
    event.name ="";
    event.creator ="";
    $scope.closeNewEvent();

  };
  
  
})
   
.controller('createTabDefaultPageCtrl', function($scope, RestaurantService, CoordinateService, $http) {
  $scope.coordtext  = CoordinateService.getCoordinates("Washington, DC");
  console.log($scope.coordtext);
  //console.log("another "+$http.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nashville,+TN").data.results);
})
   
.controller('loginCtrl', function($scope) {

})
      
.controller('joinTabDefaultPageCtrl', function($scope) {

})
   
.controller('eventPageCtrl', function($stateParams, $ionicModal, $scope, EventService, EventsService) {
  
  
  //passes in string of eventID
  $scope.curEvent = EventsService.getEvent($stateParams.eventID);
  
  //debugging
  console.log("event page"); 
  console.log($scope.curEvent.name);
  
  
  EventService.loadPrefernces($scope.curEvent.preferences);
  
  //reloading preferences probably not the best way 
  //heavily coupled to page lifecycle
  //if this controller stops reloading either change set router.js for page
  // to not cache. Or use ionicView when viewed function
  console.log("reload preferences");
  $scope.preferences = EventService.getPreferences();
  
  
  $ionicModal.fromTemplateUrl('new-preference.html',function(modal){
    $scope.preferenceModal = modal; 
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  $scope.newPreference = function () {
    console.log("open new preference");
    $scope.preferenceModal.show();
  };
  
  $scope.closeNewPreference = function () {
    console.log("close new preference");
    $scope.preferenceModal.hide();
  };
  
  // send in object holding preference parameters
  $scope.createPreference = function(p_preference) {
    EventService.addPreference(angular.copy(p_preference));
    
    //erase name and creator fields
    p_preference.owner ="";
    p_preference.distance = null;
    p_preference.money = null; 
    $scope.closeNewPreference();

  };
  
  $scope.restaurant = {};
  
  console.log(EventService.fetchRestaurantText());
  
  EventService.fetchRestaurantText().then( function (response)
  {
    $scope.restaurant.text = response;
  });
});
 