angular.module('mapdisplay', ['map'])
.controller('MapDisplay', ['$scope', 'mapConstructor', function($scope, mapConstructor){
  $scope.map = mapConstructor.initialize();
  $scope.randoHeatMap = mapConstructor.randoHeatMap;

}]);