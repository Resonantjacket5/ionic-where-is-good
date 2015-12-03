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
    //pointer to current event
    curEvent:null,
    
    //array of preferences that event holds
    preferences: []
  };
  
  o.loadPrefernces = function(preferences){
    o.preferences=preferences;
  };
  
  o.preferences.push({
    owner: "hydrogen",
    time: 50,
    money: 0
    
  });
  
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
      id:0,
      preferences: []
    }
  );
  o.events.push(
    {  
      name:"event 7",
      creator:"sam",
      id:7,
      preferences:[]
    }
  );
  
  o.makeEvent = function(name,creator){
    var tempEvent={
      name:name,
      creator:creator,
      id:(o.lastID+1),
      preferences:[]
    };
    o.lastID+=1;
    return tempEvent;
  };
  
  
  o.getEvents = function () {
    
    return o.events;
  };
  
  o.getEvent = function(eventID) {
    
//    console.log("array size "+o.events.length);
//    console.log("eventid "+eventID);
    
    for (var index = 0; index<(o.events.length); index+=1)
    {  
      var event = o.events[index];
      if(event.id == eventID)
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


