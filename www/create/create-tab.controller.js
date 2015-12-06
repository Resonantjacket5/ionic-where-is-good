angular.module('app.controllers')

.controller('createTabDefaultPageCtrl', function($state,$scope, GeolocationService, CoordinateService, $http) {
  //$scope.coordtext  = CoordinateService.getCoordinates("Washington, DC");
  //console.log($scope.coordtext);
  
  $scope.stuff ={};
  $scope.stuff.text="hadsfgfhji";
  
  $scope.buttonOther = function() {
    $scope.stuff.other="other hi";
  };
  $scope.buttonclicksuperactivator = function () 
  {
    console.log("button ran");
    
//    navigator.geolocation.getCurrentPosition( function(position){
//      $scope.stuff.other="crazy!"; 
//      console.log($scope.stuff.other); 
//      $scope.gpscoordinates = position.coords.latitude;
//      
//      //reload current stat
//      $state.go($state.current, {}, {reload: true});
//    });
//    
    GeolocationService.getLocation().then( function(position) {
      console.log("try fetch geolocation");
      $scope.stuff.other="crazy!"; 
      
      $scope.gpscoordinates="o"+position.coords.latitude;
      console.log($scope.gpscoordinates);
      $state.go($state.current, {}, {reload: true});
    }, function (error) {

    });
  
  
  };
  

  
  
  
  //console.log("another "+$http.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nashville,+TN").data.results);
});


