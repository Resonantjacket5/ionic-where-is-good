"use strict";
angular.module('app.services')
.factory('EventService', ['RestaurantService','$http','$ionicPopup',function(RestaurantService,$http,$ionicPopup){
  var o ={
    //pointer to current event
    curEvent:null,
    
    //array of preferences that event holds
    preferences: []
  }; 
  
  o.preferences.push({
    owner: "hydrogen", 
    time: 50,
    money: 0
  });
  
  o.loadPrefernces = function(event,preferences){
    o.curEvent=event;
    o.preferences=preferences;
  };
  console.log("event Service loaded");

  
  o.getPreferences = function () {
    
    //should look up event id
    //and fetch from parse server
    
    return o.preferences; 
  };
  
  o.addPreference = function(preference){
    o.preferences.push(preference);
  };
  
  
  /*
    Takes an average of the preferences and then
    outputs one "average" preference. Currently
    fixed to deal with restaurant preferences.
    
    In the future might make this more generic, 
    and move to a separate class.
  */
  function averagePreferences(preferences){
    
    if(preferences.length==0)
    {
      throw new Error("Not enough preferences"); 
    }
    
    var averageMoney=0;
    var averageDistance=0;
    
    for(let index=0; index<preferences.length; index+=1)
    {
      var tempPreference = preferences[index];
      averageMoney+=tempPreference.money;
      averageDistance+=tempPreference.distance;
    }
    
    var averagePreference = {
      money:averageMoney, 
      distance:averageDistance
    }
    
    return averagePreference;
  }
  
  o.fetchAlert = function() {
    $ionicPopup.alert({ 
      title: "Can't fetch Restaurants",
      template: "Need more preferences!"
    }).then(function (response) {
      
      console.log("alert stop user from fetching with only one preference");
    });
    
  };
  
  o.fetchRestaurantText = function() {
    console.log("try fetch restaurant");
    
    if(o.preferences.length==0)
    {
      o.fetchAlert();
      return; 
    }
    
    var googleparams = averagePreferences(o.preferences);
    
    googleparams.coordinates = o.curEvent.coordinates;
    
    //returns a $http promise
    return RestaurantService.simpleCORSRequest(googleparams);
  };

  
  return o;
}])
