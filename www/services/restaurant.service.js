angular.module('app.services')

.factory('RestaurantService',['$http','$q', function($http, $q){

  var o = {};
  
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
  
    // given preferences
  
  o.simpleCORSRequest = function (preferences) {
    
    var firstRestaurantName = "";
    console.log(weburl+preferences.coordinates);
    return $http.get(weburl, {
    params:{
        location: preferences.coordinates,
        rankby: "distance",
        types: "food",
        key: key
      }
    }).then(function(response){
      //return the first restaurants name only
      console.log(response.data);
      console.log(response.data.results[00].name);
      
      var status = response.data.status;
      
      if(status=="OK")
        return response.data.results[00].name;
      else if(status="ZERO_RESULTS")
        return "No nearby restaurants found";
      else if(status="INVALID_REQUEST")
        return "Invalid request made";
//      deferred.resolve(response.data.results[00].name);
//      return defered.promise; 
       
    }, function (error){
      console.error('ERR', error);
      throw new Error("SimpleCORSRequest failed");
    })
  };
  
  return o;
  
}])