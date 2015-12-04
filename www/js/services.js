angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('User', function($http){
  var o = {
    username: false,
    session_id: false,
  }
})

.factory('EventService', ['RestaurantService','$http',function(RestaurantService,$http){
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
    var restaurant = {};
    //restaurant.text = "restaurant " + RestaurantService.makeCORSRequest();
    var foodText = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1215,%20-115.1739&keyword=%22+cuisine+%22&minprice=%22+minprice+%22&maxprice=%22+maxprice+%22&rankby=distance&types=food&key=AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
    $http.get(foodText).then(function(response){
      restaurant.text=response;
    }, function (error){
      console.error('ERR', error);
    })
    return restaurant;
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

.factory('RestaurantService', [function($http){
  
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
  
  
  
  //fetches coordinates from address
  var address = "";
  var mapurl = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  mapurl += "Nashville,+TN";
  //mapurl += "Washington,+DC";
  mapurl += address;
  
  var lat = "";
  var lng = "";
  var coord = "";
  
  function getCoordinates(){
    $http.get(mapurl).then(function (response) {
      var mapJSON = JSON.parse(response);
      lat = mapJSON.results[00]["geometry"]["location"].lat;
      lng = mapJSON.results[00]["geometry"]["location"].lng;
      coord = lat+lng;
    }, function(error) {
      console.log("error"+"getCoordinates failed");
    });
  };
  
  
  // code from old hackathon project (CORS caller credit to cathy and haibo) https://github.com/Resonantjacket5/WhereIsGood/blob/master/WhereIsGood/Views/Shared/_GroupRestaurant.cshtml 
  var testURL =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1215,%20-115.1739&keyword=%22+cuisine+%22&minprice=%22+minprice+%22&maxprice=%22+maxprice+%22&rankby=distance&types=food&key=AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
  
  var weburl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=";
  
  //nashville coordinates
  var sampleCoord = "36.16,%20-86.783";
  var key = "AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
  var cuisine = "none selected";
  var distance = 0;
  var outputJSON = null;
  
  var o = {}; 

  
  
  o.makeCORSRequest = function () {
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
      console.log(text);
      var foodJSON = JSON.parse(text);
      //return the first objects name filed
      return "hi"+foodJSON.results[00].name;
    }

    xhr.onerror = function () {
     console.log("error in request"); 
    }

    xhr.send();
  };
  
  //makeCORSRequest();
  
  
  
  
  
  
  // given preferences
  
  o.simpleCORSRequest = function (preferences) {
    
    var firstRestaurantName = "";
    var temporaryJSON;
    
    
    $http.get(foodText).then(function(response){
      temporaryJSON = JSON.parse(response);
      
      //return the first restaurants name only
      return temporaryJSON.results[00].name;
      
    }, function (error){
      console.error('ERR', error);
    })
  };
  
  return o;
  
}])


.service('BlankService', [function(){

}]);


