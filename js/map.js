/* Module for maps application */
var MapsApplication = function () {
	var self = this;

	/* add members here */
	//var gmarkers = [];
	/* the map */
	var mp;
	/* the local device location */
	var localLocation = {lat: 40.7058683, lng: -74.0135793};

	var mapModel = function() {
		self.gmarkers = ko.observable();
		self.marker = ko.observable();
		self.location = ko.observable();
		self.infoWindow = ko.observable();
	};

	var placeModel = function() {
		self.placetypes = ko.observable();
	};

	gmarkers = [];
	infoWindow = new google.maps.InfoWindow();

	/* method to add custom binding handlers to knockout */
	var configureBindingHandlers = function() {	

		/* custom binding handler for maps panel 	*/
		ko.bindingHandlers.mapPanel = {
				init: function(element, valueAccessor){
					mp = new google.maps.Map(element, {
						zoom: 15,
                        mapTypeControl: true,
                        panControl: true,
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
					});
					centerMap(localLocation);
				}				
		};
	};

    
    /* method to center map based on the location*/
    var centerMap = function (location) {
        mp.setCenter(location);
        google.maps.event.trigger(mp, 'resize');
    }
    
    var setCurrentLocation = function () {
		if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    self.pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Your Location');
                    infoWindow.open(mp, marker);
                    mp.setCenter(pos);

                    // https://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image
                    var icon = {
                        url: "/bower_components/material-design-icons/action/2x_web/ic_room_black_36dp.png",
                        size: new google.maps.Size(20, 32),
                        origin: new google.maps.Point(0, 0),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    var marker = new google.maps.Marker({
                        icon: icon,
                        position: pos,
                        map: mp,
                        title: 'Current Location',
                        animation: google.maps.Animation.BOUNCE
					});
					
					marker.addListener('click', function() {
						infoWindow.open(mp, marker);
						mp.setCenter(pos);
					}); 


				}, function() {
				    handleLocationError(true, infoWindow, mp.getCenter());
				});
        } else {
          // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, mp.getCenter());
        }
	}
    
    
    var callService = function ( mp, places) {
	   var service = new google.maps.places.PlacesService(mp);
        service.nearbySearch({
            location: localLocation,
            radius: 2500,
            type: [places]
		}, callback);
		mp.setCenter(places.geometry.location);
		mp.fitBounds(bounds);
    }
    

	
	var callback = function(results, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
            clearMarker();
			console.log(status);
			for (var i = 0; i < results.length; i++) {
				createMarker(results[i]);
				addResult(results[i], i);	
                /* https://jsfiddle.net/geocodezip/31b2tbpu/25/ */
                $('#res-list tr').each(function(i, e) {
                    $(e).click(function(i) {
                      return function(e) {
                        google.maps.event.trigger(gmarkers[i], 'click');
                      }
                    }(i));
                });
			}
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
    
    var clearResult = function() {
        var results = document.getElementById('res-list');
        while(results.childNodes[0]) {
            results.removeChild(results.childNodes[0]);
        }
	}
	
	
	var createMarker = function(places) {
        // https://stackoverflow.com/questions/47940014/set-marker-in-the-callback-function-where-users-position-is-available-after-cre
  		var placesList = document.getElementById('places');
        
        var icons = {
			url: places.icon,
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(17, 34),
			scaledSize: new google.maps.Size(25, 25)
		};
		  
		var marker = new google.maps.Marker({
			map: mp,
			position: places.geometry.location,
			icon: icons,
			animation: google.maps.Animation.DROP
		});

		var populateInfoWindow = function(marker, infowindow) {
			  // Check to make sure the infowindow is not already opened on this marker.
			infowindow.setContent('');
			infowindow.marker = marker;
			  // Make sure the marker property is cleared if the infowindow is closed.
			infowindow.addListener('closeclick', function() {
				infowindow.marker = null;
			});
			var streetViewService = new google.maps.StreetViewService();
			var radius = 50;
			// In case the status is OK, which means the pano was found, compute the
			// position of the streetview image, then calculate the heading, then get a
			// panorama from that and set the options
			var getStreetView = function(data, status) {
				if (status == google.maps.StreetViewStatus.OK) {
					var nearStreetViewLocation = data.location.latLng;
					var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
					var contentView = '<div>' + '<h3>' + places.name + '</h3>' + '<h4>' + places.vicinity + '</h4>' + '</div><div id="pano"></div>';
					infowindow.setContent(contentView);
					var panoramaOptions = {
						position: nearStreetViewLocation,
							pov: {
								heading: 34,
								pitch: 10
							}
					};
					var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
				} else {
					infowindow.setContent('<div>' + '<h1>' + places.name + '</h1>' + '</div>' + '<div>No Street View Found</div>');
				}
			}

			streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);

			infowindow.open(map, marker);

			infowindow.addListener('closeclick',function(){
				infowindow.setMarker = null;
				marker.setAnimation(null);
			});
	
			if (marker.getAnimation() != null) {
				marker.setAnimation(null);
			} else {
				marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}

		//var content = places.name + "<br/>" + places.vicinity; 

		
	
		marker.addListener('click', function() {
			populateInfoWindow(this, infoWindow);
		});

		gmarkers.push(marker);
	}



    
    var clearMarker = function() {
        // -- https://www.codeproject.com/Questions/584179/AutoplusRefreshplusofplusGoogleplusMapplusmarkers
        for(var i = 0; i < gmarkers.length; i++) {
            gmarkers[i].setMap(null);
        }
        gmarkers = [];
        // -- https://www.codeproject.com/Questions/584179/AutoplusRefreshplusofplusGoogleplusMapplusmarkers
    }
	

	var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
				  infoWindow.setContent(browserHasGeolocation ?
										'Error: The Geolocation service failed.' :
										'Error: Your browser doesn\'t support geolocation.');
				  infoWindow.open(mp);
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
		}
	};

	/* Seach Option Slide */
	var fadeViewModel = function(){
		self.fadeTag = function(data, event) {
			$(event.currentTarget).next().fadeToggle();
			clearMarker();
			clearResult();
			//add function to uncheck the radiobox
		};
	};



	var init = function () {
		

		/* set the local location */
		setLocalLocation();

		callback();
        
		setCurrentLocation();
		

		/* add code to initialise this module */
		configureBindingHandlers();
		
		
		fadeViewModel();


		//apply the bindings
		ko.applyBindings(MapsApplication);
		ko.applyBindings(placeModel);
		ko.applyBindings(tm);
        
        
       

	};

	/* execute the init function when the DOM is ready */
	$(init);
	

    $(function () {
            $('.place-types :radio').click( function () {    	
                var plc = $( this ).val();
                //clearMarker();
                clearResult();
                callService( mp, plc);
            });
	});

	return {
		/* add members that will be exposed publicly */
		mapModel: mapModel
	};
}();
