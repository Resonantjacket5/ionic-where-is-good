angular.module('app.services')

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
      location: "Nashville, TN",
      id:0,
      preferences: []
    }
  );
  o.events.push(
    {  
      name:"event 7",
      creator:"sam",
      location: "Los Angeles, CA",
      id:7,
      preferences:[]
    }
  );
  
  function makeEvent (name,creator,location){
    
    
    var tempEvent={
      name:name,
      creator:creator,
      location:location,
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
    var event  = makeEvent(eventInfo.name,eventInfo.creator,eventInfo.location);
    o.events.push(event);
  };
  
  // return $http.get("url/users")

  
  return o;
}])