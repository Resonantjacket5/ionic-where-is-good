angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('User', function($http){
  var o = {
    username: false,
    session_id: false,
  }
})

.factory('EventService', ['RestaurantService',function(RestaurantService){
  var o ={
    //pointer to current event
    curEvent:null,
    
    //array of preferences that event holds
    preferences: []
  };
  
  o.loadPrefernces = function(preferences){
    o.preferences=preferences;
  };
  console.log("event Service loaded");
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
  
  o.fetchRestaurantText = function() {
    console.log("try fetch restaurant");
    
    return RestaurantService.makeCORSRequest();
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

.service('RestaurantService', [function(){
  // code from old hackathon project (CORS caller credit to cathy and haibo) https://github.com/Resonantjacket5/WhereIsGood/blob/master/WhereIsGood/Views/Shared/_GroupRestaurant.cshtml
  var testURL =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1215,%20-115.1739&keyword=%22+cuisine+%22&minprice=%22+minprice+%22&maxprice=%22+maxprice+%22&rankby=distance&types=food&key=AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
  
  var outputJSON = null;

  // below creates the  CORS Request
  // from html5rocks.com/en/tutorials/cors/ by Monsur Hossain
  // Create the XHR object.
  function createCORSRequest(method, url) {
      var xhr = new XMLHttpRequest();
      if ("withCredentials" in xhr) {
          // XHR for Chrome/Firefox/Opera/Safari.
          xhr.open(method, url, true);
      } else if (typeof XDomainRequest != "undefined") {
          // XDomainRequest for IE.
          xhr = new XDomainRequest();
          xhr.open(method, url); 
      } else {
          // CORS not supported.
          xhr = null; 
      }
      return xhr;
  }
  
  function makeCORSRequest() {
    var xhr = createCORSRequest('GET', testURL);

    if (!xhr) {
        console.log('CORS not supported');
    }
    else
    {
      console.log('cors supported');
    }

    //Response handlers.
    xhr.onload = function () {
      var text = xhr.responseText;
      console.log("text");
      var foodJSON = JSON.parse(test);
      return text;
    }

    xhr.onerror = function () {
     console.log("error in request"); 
    }

    xhr.send();
  }
  
  //makeCORSRequest();
  
  
}])


.service('BlankService', [function(){

}]);


