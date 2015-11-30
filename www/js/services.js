angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('User', function($http){
  var o = {
    username: false,
    session_id: false,
  }
})

.factory('EventService', [function(){
  var o ={
    //array of preferences that event holds
    preferences: []
  };
  
  
  o.getPreferences = function () {
    
    //should look up event id
    //and fetch from parse server
    
    return o.preferences;
  };
  
  o.addPreference = function(preference){
    o.preferences.push(preference);
  };
  
  return o;
}])



.factory('EventsService', [function(){
  
  //array of events that user attains
  var o = {
    events: [],
    lastID: 0
  };
  
  o.events.push(
    {  
      name:"event 4b",
      creator:"Jackson",
      id:0
    }
  );
  
  o.makeEvent = function(name,creator){
    var tempEvent={
      name:name,
      creator:creator,
      id:(o.lastID+1)
    };
    o.lastID+=1;
    return tempEvent;
  };
  
  
  o.getEvents = function () {
    
    return o.events;
  };
  
  o.getEvent = function(eventID) {
    for ( event in o.events)
    {
      if(event.id === eventID)
      {
        return event;
      }
    }
    console.log("event not found");
  };
  
  o.addEvent = function (eventInfo) {
    console.log("added event");
    //probably should have a event constructor, don't directly call 
    // upon the add the created event from controller
    var event  = o.makeEvent(eventInfo.name,eventInfo.creator);
    o.events.push(event);
  };
  
  // return $http.get("url/users")
  
  return o;
}])




.service('BlankService', [function(){

}]);


