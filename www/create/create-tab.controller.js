angular.module('app.controllers')

.controller('createTabDefaultPageCtrl', function($scope, GeolocationService, CoordinateService, $http) {
  //$scope.coordtext  = CoordinateService.getCoordinates("Washington, DC");
  //console.log($scope.coordtext);
  
  $scope.stuff ={};
  $scope.stuff.text="hadsfgfhji";
  
  $scope.buttonclicksuperactivator = function () 
  {
  
    GeolocationService.getLocation().then( function(position) {
      $scope.gpscoordinates="o"+position.coords.latitude;
      console.log($scope.gpscoordinates);
    }, function (error) {

    });
  
  
  };
  
  
  
  
  
  
  
  //console.log("another "+$http.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nashville,+TN").data.results);
});


