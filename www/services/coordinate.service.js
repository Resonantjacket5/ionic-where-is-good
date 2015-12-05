/*hi whats up should be getCoordinates service*/

angular.module('app.services')

/*  
  With passed in Address, returns coordinates using
  Googles API
*/
.factory('CoordinateService' , ['$http', function($http) {
  var CoordinateService = {};
  
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
  
  
  CoordinateService.getCoordinates = function (address) {
    if(address==null)
    {
      console.log("address empty");
      address = sampleaddress;
    }
    console.log("called get coordinates");
    //console.log(mapurl+" "+p_address);
    console.log(mapurl);
    return $http.get(mapurl,{
      params: { address: address}
    }).then(function (response) {
      console.log(response);
      lat = response.data.results[00]["geometry"]["location"].lat;
      lng = response.data.results[00]["geometry"]["location"].lng;
      console.log(lat);
      console.log(lng);
      coord = ""+lat+","+lng;
      console.log("coord"+coord);
      return coord;
    }, function(error) {
      console.log("error"+"getCoordinates failed");
    });
  };
  
  return CoordinateService;
   
}]);