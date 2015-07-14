angular.module('map', [])
.factory('mapConstructor', function(){
  var mapId = 'map-canvas';
  var options = {
    center: { lat: 40.6928, lng: -73.9903},
    zoom: 8
  };
  var initialize = function(){
    mapId = document.getElementById(mapId)
    return new google.maps.Map(mapId, options);
  };

  var randoHeatMap = function(map){

    // this code exposes the lat and long bounds of the map object
    var bounds = map.getBounds();
    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();
    var n = ne.lat();
    var e = ne.lng();
    var s = sw.lat();
    var w = sw.lng();

    // array to store heatmap data
    var hots = [];

    // initial heatmap position
    var lng = Math.random() * (w - e) + e;
    var lat = Math.random() * (n - s) + s;
    hots.push(new google.maps.LatLng(lat, lng));

    // random walk
    for (var i = 1; i < 100; i++){
      var up = Math.floor(Math.random() * 2);
      var right = Math.floor(Math.random() * 2);
      if (up === 0) {
        var lng = hots[i-1].lng() + Math.random() * ((w - e)/100);        
      } else {
        var lng = hots[i-1].lng() - Math.random() * ((w - e)/100);      
      }
      if (right === 0) {
        var lat = hots[i-1].lat() + Math.random() * ((n - s)/100);
      } else {
        var lat = hots[i-1].lat() - Math.random() * ((n - s)/100);

      }
      // we instantiate google maps LatLng objects and push them into an array
      hots.push(new google.maps.LatLng(lat, lng));
    };


    // now we feed the array to the data attribute of the heatmaplayer
    var heatMap = new google.maps.visualization.HeatmapLayer({data: hots});
    heatMap.setMap(map);
  }

  var logVisualization = function(map) {
    console.log(map)
  }

  return {initialize: initialize, 
    randoHeatMap: randoHeatMap,
    logVisualization: logVisualization
  }
});