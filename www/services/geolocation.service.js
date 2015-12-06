/*
  Wrapper over Cordova Geolocation Plugin
  https://github.com/apache/cordova-plugin-geolocation
*/
angular.module('app.services')

.factory('GeolocationService',['$q',function($q) {
  var GeolocationService = {};
  
  GeolocationService.getLocation = function(/*options*/) {
    var q = $q.defer();
    
    navigator.geolocation.getCurrentPosition(function(result) {
      //code to change reply
      q.resolve(result);
    }, function(error) {
      console.log("geolocation fetch failed");
      q.reject(error);
    }/*,options*/);
    
    return q.promise;
  };

  return GeolocationService;
  
}]);