angular.module('app.controllers')
.controller('eventPageCtrl', function($stateParams, $ionicModal, $scope, EventService, EventsService) {
  
  
  //passes in string of eventID
  $scope.curEvent = EventsService.getEvent($stateParams.eventID);
  
  //debugging
  console.log("event page"); 
  console.log($scope.curEvent.name);
  
  
  EventService.loadPrefernces($scope.curEvent,$scope.curEvent.preferences);
  
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
  
  //console.log(EventService.fetchRestaurantText());
  
  $scope.askSuggestion = function () {
    EventService.fetchRestaurantText().then( function (response)
    {
      //$scope.restaurant.text = response;
      $scope.restaurants = response.results;
    });
  };
  
});