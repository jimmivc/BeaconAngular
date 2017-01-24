// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('beaconApp', ['ionic','LocalStorageModule'])

.config(function (localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('beaconApp');
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('main',function($scope, $ionicModal, localStorageService){
  $scope.beaconProx = 'aqui nomas';
  $scope.beaconDist = 'como a 100 mts wey';
  $scope.beaconTemp = 'ufffff';

  localStorage.clear();
  localStorage.setItem('beacons',JSON.stringify([]));

  // Application data.
  app.currentScreenId = null;
 
  app.proximityNames = [
    'desconocido',
    'muy cerca',
    'cerca',
    'lejos'];


  $scope.scanBeacons = function (){
    alert('casual escaneando');
    app.startRangingBeacons($scope);
  }

  // ------------- Private helper function ------------- //

  function onDeviceReady()
  {
    // TODO: Add functionality if needed.
    console.log('onDeviceReady')
  }

  // ------------- Application functions ------------- //

  app.formatDistance = function(meters)
  {
    if (!meters) { return 'desconocido'; }

    if (meters > 1)
    {
      return meters.toFixed(3) + ' m';
    }
    else
    {
      return (meters * 100).toFixed(3) + ' cm';
    }
  };

  app.formatProximity = function(proximity)
  {
    alert(proximity);
    if (!proximity) { return 'desconocido'; }

    // Eliminate bad values (just in case).
    proximity = Math.max(0, proximity);
    proximity = Math.min(3, proximity);

    // Return name for proximity.
    return app.proximityNames[proximity];
  };

  app.beaconColorStyle = function(color)
  {
    if (!color)
    {
      color = 0;
    }

    // Eliminate bad values (just in case).
    color = Math.max(0, color);
    color = Math.min(5, color);

    // Return style class for color.
    return app.beaconColorStyles[color];
  };

  // ------------- Initialisation ------------- //

  document.addEventListener('deviceready', onDeviceReady, false);


  //////////BEACONS////////
  beaconsIdsList = ['E1:0D:88:DA:70:BA'];
  beaconDistance = 10;

  beaconHot = 10.0;
  beaconWarm = 20.0;
  beaconArround = 40.0;

  proximityNames = ['Nope','caliente','tibio','frio'];

  app.startRangingBeacons = function($scope)
  {

    $scope.beaconProx = 'como demonios sirve aqui pero no alla :(';

    function onRange(beaconInfo)
    {
      alert('onRange1');
      displayBeconInfo(beaconInfo);
      $scope.beaconProx = 'y tambien aqui :O';
      alert('onRange2');

    }

    function onError(errorMessage)
    {
      console.log('Range error: ' + errorMessage);
    }

    function displayBeconInfo(beaconInfo)
    {
      alert('display beacon info'); 
      alert('porfis...')
      // alert(JSON.stringify(beaconInfo));
      // Sort beacons by distance.
      // beaconInfo.beacons.sort(function(beacon1, beacon2) {
      //   return beacon1.distance > beacon2.distance; });



      // // Generate HTML for beacons.
      // $.each(beaconInfo.beacons, function(key, beacon)
      // {
      //   var element = $(createBeaconHTML(beacon));
      //   $('#id-screen-range-beacons .style-item-list').append(element);
      // });
      if(beaconInfo['beacons'].length>0){
        for (var i = 0; i < beaconInfo['beacons'].length; i++) {
          createBeaconHTML(beaconInfo['beacons'][i]);
        }
      }
    };

    function createBeaconHTML(beacon)
    {
      alert(JSON.stringify(beacon));

      if (beacon.proximity)
      {
        alert('got the first one');
        $scope.beaconProx = '' + app.formatProximity(beacon.proximity);
        alert('first got it');
      }
      if (beacon.distance)
      {
        alert('started second');
        $scope.beaconDist = '' + app.formatDistance(beacon.distance);          
        alert('ended second');
        //llamar a esta funcion si se quiere ejecutar una llamada o accion a api con una distancia definida
        // if(isClose(beacon.distance,beaconDistance)){
        //  callMedia(beacon);
        // }
        alert('finishing last');
        $scope.beaconTemp = '' + howCloseBeaconIs(beacon.distance);
        alert('finished');
      }
    };

    // Show screen.
    // app.showScreen('id-screen-range-beacons');
    // $('#id-screen-range-beacons .style-item-list').empty();

    // Request authorisation.
    alert('estimote1');
    estimote.beacons.requestAlwaysAuthorization();
    alert('estimote2');

    // Start ranging.
    
    estimote.beacons.startRangingBeaconsInRegion(
      {}, // Empty region matches all beacons.
      onRange,
      onError);
  };

  function callMedia(beacon){

    if(!findByMacAddress(beacon.macAddress)){

      //test
      
    }
  }

  
  function isClose(meters, limit){
    if(meters<=limit){
      return true;
    }else{
      return false;
    }
  }

  function howCloseBeaconIs(beaconDistance){
    result= ''; 

    if (beaconDistance<=beaconHot) {
      result = 'Caliente';
    }else if(beaconDistance<=beaconWarm){
      result = 'Tibio';
    }else if(beaconDistance<=beaconArround){
      result = 'Frio';
    }else{
      result = 'Ni cerca';
    }

    return result;
  }

  // function getProximity(proximity)
  // {
  //  if (!proximity) { return 'No hay beacons cerca'; }

  //  // Eliminate bad values (just in case).
  //  proximity = Math.max(0, proximity);
  //  proximity = Math.min(3, proximity);

  //  // Return name for proximity.
  //  return proximityNames[proximity];
  // };

  app.stopRangingBeacons = function()
  {
    estimote.beacons.stopRangingBeaconsInRegion({});
    app.showHomeScreen();
  };

});