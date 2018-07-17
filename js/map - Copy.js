/* Module for maps application */
var MapsApplication = function () {

	/* add members here */
	var gmarkers = [];
	/* the map */
	var map, infoWindow;
	/* the local device location */
	var localLocation = {lat: -37.810432, lng: 144.96616};


	/* method to add custom binding handlers to knockout */
	var configureBindingHandlers = function() {	

		/* custom binding handler for maps panel 	*/
		ko.bindingHandlers.mapPanel = {
				init: function(element, valueAccessor){
					map = new google.maps.Map(element, {
						zoom: 15
					});
					centerMap(localLocation);
					
					infoWindow = new google.maps.InfoWindow();

									
					  // Try HTML5 geolocation.
					  if (navigator.geolocation) {
							navigator.geolocation.getCurrentPosition(function(position) {
									var pos = {
										lat: position.coords.latitude,
										lng: position.coords.longitude
									};

									var marker = new google.maps.Marker({
										position: pos,
										map: map,
										title: 'Current Location'
									});
									

									infoWindow.setPosition(pos);
									infoWindow.setContent('Your Location');
									infoWindow.open(map);
									map.setCenter(pos);

									var service = new google.maps.places.PlacesService(map);
									service.nearbySearch({
											location: pos,
											radius: 2000,
											type: ['hospital']
									}, callback);

									service.nearbySearch({
											location: pos,
											radius: 2000,
											type: ['police']
									}, callback);

									service.nearbySearch({
											location: pos,
											radius: 2000,
											type: ['fire_station']
									}, callback);

									

							}, function() {
								handleLocationError(true, infoWindow, map.getCenter());
							});
					  } else {
						// Browser doesn't support Geolocation
					  	handleLocationError(false, infoWindow, map.getCenter());
					  }
				}				
		};
	};

	
	var callback = function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			console.log(status);
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
				addResult(results[i], i);			
			}
			/* https://jsfiddle.net/geocodezip/31b2tbpu/25/ */
			$('#res-list tr').each(function(i, e) {
				$(e).click(function(i) {
				  return function(e) {
					google.maps.event.trigger(gmarkers[i], 'click');
				  }
				}(i));
			});
			/* https://jsfiddle.net/geocodezip/31b2tbpu/25/ */
		}
	}



	var addResult = function(result, i) {
		var results = document.getElementById('res-list');
		var tr = document.createElement('tr'); 
		var nameTd = document.createElement('td');
		var name = document.createTextNode(result.name);


		nameTd.appendChild(name);

		tr.appendChild(nameTd);
		results.appendChild(tr);
	}


	var createMarker = function(places) {
  		var placesList = document.getElementById('places');
		  var icons = {
			url: places.icon,
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(25, 25)
		};
		  
		var marker = new google.maps.Marker({
			map: map,
			position: places.geometry.location,
			icon: icons,
			animation: google.maps.Animation.DROP
		});

		var content = places.name + "<br/>" + places.vicinity; 
	
		google.maps.event.addListener(marker, 'click', function(details, status) {
			infoWindow.setContent(content);
			infoWindow.open(map, this);
		});
		gmarkers.push(marker);
	}


	

	/* method to center map based on the location*/
	var centerMap = function (location) {
		map.setCenter(location);
		google.maps.event.trigger(map, 'resize');
	}

	var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
				  infoWindow.setContent(browserHasGeolocation ?
										'Error: The Geolocation service failed.' :
										'Error: Your browser doesn\'t support geolocation.');
				  infoWindow.open(map);
	}

	/* method to retrieve and set local location */
	var setLocalLocation = function () {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function(position) {
				localLocation.lat = position.coords.latitude;
				localLocation.lng = position.coords.longitude;
				console.log("successfully retrieved local location. Lat [" + localLocation.lat + "] Lng [" + localLocation.lng + "]");
			},
			function (error) {
				console.log("Could not get current coords: " + error.message);
			});
		};
	};

	/* Seach Option Slide */
	var fadeViewModel = function(){
		var self = this;
		self.fadeTag = function(data, event) {
			$(event.currentTarget).next().fadeToggle();
		};
	};


	var init = function () {
		

		/* set the local location */
		setLocalLocation();

		callback();

		/* add code to initialise this module */
		configureBindingHandlers();
		
		
		fadeViewModel();


		//apply the bindings
		ko.applyBindings(MapsApplication);

	};

	/* execute the init function when the DOM is ready */
	$(init);

	return {
		/* add members that will be exposed publicly */
		/***
		mapsModel: mapsModel
		***/
	};
}();
