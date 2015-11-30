/*global angular */

angular.module('app.controllers', ['ionic'])
  
.controller('eventsTabDefaultPageCtrl', function($scope,$ionicModal, EventsService) {
  $scope.events = [];
  $scope.events = EventsService.getEvents();
  
  $ionicModal.fromTemplateUrl('new-event.html',function(modal){
    $scope.eventModal = modal; 
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });
  
  $scope.hi = function() {
    console.log("hi");
  };
  
  $scope.createEvent = function(event) {
//    $scope.events.push({
//      "name": "bob",
//      "creator": "fake"
//    });
    
    console.log("controller create event");
    console.log(event.name);


    EventsService.addEvent(angular.copy(event));
    
    //erase name and creator fields
    event.name ="";
    event.creator ="";
    $scope.closeNewEvent();

  };
  
  $scope.createTask = function(task) {
    console.log(task.title); 
  }
  
  
  $scope.newEvent = function() {
    $scope.eventModal.show();
  };
  
  $scope.closeNewEvent = function() {
    console.log("close");
    $scope.eventModal.hide();
  };
  
  
  
  
})
   
.controller('createTabDefaultPageCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope) {

})
      
.controller('joinTabDefaultPageCtrl', function($scope) {

})
   
.controller('eventPageCtrl', function($scope, EventService) {
  $scope.preferences;
  //$scope.preferences.push("hi");
  
});
 