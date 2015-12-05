angular.module('app.controllers')

.controller('eventsTabDefaultPageCtrl', function($scope,$ionicModal, EventsService) {
  $scope.events = [];
  $scope.events =  EventsService.getEvents();
  
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
  
  
});