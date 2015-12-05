angular.module('app.services')

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
    
    //returns a $http promise
    return RestaurantService.simpleCORSRequest();
  };

  
  return o;
}])
