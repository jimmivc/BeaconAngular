// // Range beacons screen.
// ;(function(app)
// {
// 	// app.controller('buscarBeaconController',function(){
// 	// 	console.log('nothingController');
// 	// });
// 	// 'F1:A5:A6:CF:98:BC'
// 	beaconsIdsList = ['E1:0D:88:DA:70:BA'];
// 	beaconDistance = 10;

// 	beaconHot = 10.0;
// 	beaconWarm = 20.0;
// 	beaconArround = 40.0;

// 	// proximityNames = ['Nope','caliente','tibio','frio'];

// 	app.startRangingBeacons = function()
// 	{
// 		function onRange(beaconInfo)
// 		{
// 			displayBeconInfo(beaconInfo);
// 		}

// 		function onError(errorMessage)
// 		{
// 			console.log('Range error: ' + errorMessage);
// 		}

// 		function displayBeconInfo(beaconInfo)
// 		{
// 			// Clear beacon HTML items.
// 			$('#id-screen-range-beacons .style-item-list').empty();

// 			// Sort beacons by distance.
// 			beaconInfo.beacons.sort(function(beacon1, beacon2) {
// 				return beacon1.distance > beacon2.distance; });

// 			// Generate HTML for beacons.
// 			$.each(beaconInfo.beacons, function(key, beacon)
// 			{
// 				var element = $(createBeaconHTML(beacon));
// 				$('#id-screen-range-beacons .style-item-list').append(element);
// 			});
// 		};

// 		function createBeaconHTML(beacon)
// 		{
// 			var colorClasses = app.beaconColorStyle(beacon.color);
// 			var htm = '<div class="' + colorClasses + '">'
// 				+ '<table><tr><td>Major</td><td>' + beacon.major;
// 			// 	+ '</td></tr><tr><td>Minor</td><td>' + beacon.minor
// 			// 	+ '</td></tr><tr><td>RSSI</td><td>' + beacon.rssi
// 			if (beacon.proximity)
// 			{
// 				htm += '</td></tr><tr><td>Proximity</td><td>'
// 					+ app.formatProximity(beacon.proximity);

// 				// htm += '</td></tr><tr><td>Proximidad</td><td>'
// 				// 	+ getProximity(beacon.proximity);
// 			}
// 			if (beacon.distance)
// 			{
// 				htm += '</td></tr><tr><td>Distance</td><td>'
// 					+ app.formatDistance(beacon.distance);					
				
// 				//llamar a esta funcion si se quiere ejecutar una llamada o accion a api con una distancia definida
// 				// if(isClose(beacon.distance,beaconDistance)){
// 				// 	callMedia(beacon);
// 				// }

// 				htm += '</td></tr><tr><td>Distancia</td><td>'
// 				    + howCloseBeaconIs(beacon.distance);

// 	    		// $('#beacon-media').append('<p>'+howCloseBeaconIs(beacon.distance)+'</p>');

// 			}
// 			htm += '</td></tr></table></div>';
// 			return htm;
// 		};

// 		// Show screen.
// 		app.showScreen('id-screen-range-beacons');
// 		$('#id-screen-range-beacons .style-item-list').empty();

// 		// Request authorisation.
// 		estimote.beacons.requestAlwaysAuthorization();

// 		// Start ranging.
// 		estimote.beacons.startRangingBeaconsInRegion(
// 			{}, // Empty region matches all beacons.
// 			onRange,
// 			onError);
// 	};

// 	function callMedia(beacon){

// 		if(!findByMacAddress(beacon.macAddress)){


// 			//test
// 			$.get( "http://koko-test.com/click/back-end/index.php/app/test", function( data ) {
// 				$('#beacon-media').append('<p>'+data+'</p>');
// 			});			

// 		 	$.post( "http://koko-test.com/click/back-end/index.php/app/saveEvent", {id_channel:"null",channel_name:"null",event_name:"null",id_rule:"null",rule_name:"null",id_object:beacon.macAddress})
// 			  .done(function( data ) {
// 			    $('#beacon-media').append('<p>datos registrados</p>');
// 			});

// 			var beacons = JSON.parse(localStorage.getItem('beacons'));
// 			beacons.push(beacon.macAddress);
// 			$('#beacons-history').append('<p>'+beacon.macAddress+'</p>')
// 			localStorage.setItem('beacons',JSON.stringify(beacons));
			
// 		}
// 	}

// 	function findByMacAddress(macAddress){

// 		beaconInList = false;

// 		//find in list...
// 		for (var i = 0; i < beaconsIdsList.length; i++) {
// 			if(beaconsIdsList[i]==macAddress){
// 				beaconInList = true;
// 			}
// 		}

// 		//avoid calling method more than one time
// 		if (beaconInList) {
// 			var beacons = JSON.parse(localStorage.getItem('beacons'));

// 			for (var i = 0; i < beacons.length; i++) {
// 				if(beacons[i]==macAddress){
// 					return true;
// 				}
// 			}
// 		}else{
// 			return true;
// 		}

// 		return false;
// 	}
	
// 	function isClose(meters, limit){
// 		if(meters<=limit){
// 			return true;
// 		}else{
// 			return false;
// 		}
// 	}

// 	function howCloseBeaconIs(beaconDistance){
// 		result= ''; 

// 		if (beaconDistance<=beaconHot) {
// 			result = 'Caliente';
// 		}else if(beaconDistance<=beaconWarm){
// 			result = 'Tibio';
// 		}else if(beaconDistance<=beaconArround){
// 			result = 'Frio';
// 		}else{
// 			result = 'Ni cerca';
// 		}

// 		return result;
// 	}

// 	// function getProximity(proximity)
// 	// {
// 	// 	if (!proximity) { return 'No hay beacons cerca'; }

// 	// 	// Eliminate bad values (just in case).
// 	// 	proximity = Math.max(0, proximity);
// 	// 	proximity = Math.min(3, proximity);

// 	// 	// Return name for proximity.
// 	// 	return proximityNames[proximity];
// 	// };

// 	app.stopRangingBeacons = function()
// 	{
// 		estimote.beacons.stopRangingBeaconsInRegion({});
// 		app.showHomeScreen();
// 	};

// })(app);
