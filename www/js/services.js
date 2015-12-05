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
    restaurant.text  = "restaurant " + RestaurantService.simpleCORSRequest();
    return restaurant;
  };
  
//  {
//    var foodText = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1215,%20-115.1739&keyword=%22+cuisine+%22&minprice=%22+minprice+%22&maxprice=%22+maxprice+%22&rankby=distance&types=food&key=AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
//    $http.get(foodText).then(function(response){
//      restaurant.text=response;
//    }, function (error){
//      console.error('ERR', error);
//    })
//    return restaurant;
//  }
  
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

.factory('RestaurantService', ['$http', function($http){
  
  var o = {};
  
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
  
  //Example url call
  //"https://maps.googleapis.com/maps/api/geocode/json?address=Nashville,+TN"
  
  var sampleaddress = "Nashville,+TN";
  var mapurl = "https://maps.googleapis.com/maps/api/geocode/json";
  var samplemapurl = mapurl + "?address="+sampleaddress;
  //mapurl += "Washington,+DC";
  
  var lat = "";
  var lng = "";
  var coord = "";
  
  
  o.getCoordinates = function (p_address) {
    if(p_address==null)
    {
      p_address = sampleaddress;
    }
    console.log("called gete coordinates");
    //console.log(mapurl+" "+p_address);
    mapurl = samplemapurl;
    console.log(mapurl);
    $http.get(mapurl
              //,{
      //params: { address: p_address}}
      ).then(function (response) {
      console.log(response);
      lat = response.data.results[00]["geometry"]["location"].lat;
      lng = response.data.results[00]["geometry"]["location"].lng;
      console.log(lat);
      console.log(lng);
      coord = ""+lat+""+lng;
      console.log("coord"+coord);
      return coord;
    }, function(error) {
      console.log("error"+"getCoordinates failed");
    });
  };
  
  
  // code from old hackathon project (CORS caller credit to cathy and haibo) https://github.com/Resonantjacket5/WhereIsGood/blob/master/WhereIsGood/Views/Shared/_GroupRestaurant.cshtml 
  var testURL =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=36.1215,%20-115.1739&keyword=%22+cuisine+%22&minprice=%22+minprice+%22&maxprice=%22+maxprice+%22&rankby=distance&types=food&key=AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
  
  var weburl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
  
  //?=location
  
  //nashville coordinates
  var sampleCoord = "36.16,-86.783";
  var key = "AIzaSyB8sCjeWMHJcCqvHNA0CknuFgXfJ80BKg0";
  var cuisine = "none selected";
  var distance = 0;
  var outputJSON = null;
  
   

  
  
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
     
    $http.get(weburl, {
    params:{
        location: sampleCoord,
        rankby: "distance",
        types: "food",
        key: key
      }
    }).then(function(response){
      //return the first restaurants name only
      console.log(response.data);
      console.log(response.data.results[00].name);
      return response.data.results[00].name;
      
    }, function (error){
      console.error('ERR', error);
    })
  };
  
  return o;
  
}])


.service('BlankService', [function(){

}]);


