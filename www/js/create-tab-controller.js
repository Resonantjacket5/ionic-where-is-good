angular.module('app.controllers')

.controller('createTabDefaultPageCtrl', function($scope, RestaurantService, CoordinateService, $http) {
  $scope.coordtext  = CoordinateService.getCoordinates("Washington, DC");
  console.log($scope.coordtext);
  //console.log("another "+$http.get("https://maps.googleapis.com/maps/api/geocode/json?address=Nashville,+TN").data.results);
})