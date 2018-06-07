const self = this;

function appViewModel(params) {
    var map;
    self.service = ko.observable();
    self.icons = ko.observable();

    self.allPlaces = ko.observableArray([]);

    self.placeType = ko.observable("");

    var infoWindow;
    self.lat = ko.observable('');
    self.lng = ko.observable('');
    

    localLocation = new google.maps.LatLng(40.7058683, -74.0135793);
    var markersArray = [];
    
   
    /* Seach Option Slide */
    self.fadeTag = function(data, event) {
      $(event.currentTarget).next().fadeToggle();
    };

  
    function initialize() {
      var styleTheme = [
        {
            "featureType": "administrative",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "lightness": 52
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        }
    ];
      
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: styleTheme
      });

      infoWindow = new google.maps.InfoWindow();

      setCurrentLocation();
      centerMap(localLocation);
      
    }
  
    
    var centerMap = function (location) {
        map.setCenter(location);
        google.maps.event.trigger(map, 'resize');
    }

    var setCurrentLocation = function () {
        const self = this;

        
        if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {

                            self.pos = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                            };

                            getPlaces();
                        
                            infoWindow.setPosition(pos);
                            infoWindow.setContent('Your Location');
                            infoWindow.open(map, mk);
                            map.setCenter(pos);
        
                            // https://stackoverflow.com/questions/15096461/resize-google-maps-marker-icon-image
                            var icons = {
                                url: "/bower_components/material-design-icons/action/2x_web/ic_room_black_36dp.png",
                                size: new google.maps.Size(20, 32),
                                origin: new google.maps.Point(0, 0),
                                scaledSize: new google.maps.Size(25, 25)
                            };
        
                            var mk = new google.maps.Marker({
                                icon: icons,
                                position: pos,
                                map: map,
                                title: 'Current Location',
                                animation: google.maps.Animation.BOUNCE
                              });

                              mk.addListener('click', function() {
                              infoWindow.open(map, mk);
                              map.setCenter(pos);
                            });    
                        }, function() {
                          handleLocationError(true, infoWindow, map.getCenter());
                        });
        } else {
                  // Browser doesn't support Geolocation
                    handleLocationError(false, infoWindow, map.getCenter());
        }
    }


    var handleLocationError = function(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(mp);
    }


    function getPlaces() {
      infowindow = new google.maps.InfoWindow();
      service = new google.maps.places.PlacesService(map);

      var requestP = {
        location: pos,
        radius: 2000,
        types: ['police']
      };

      var requestH = {
        location: pos,
        radius: 2000,
        types: ['hospital']
      };

      var requestF = {
        location: pos,
        radius: 2000,
        types: ['fire_station']
      };

      allPlaces = ko.computed(function(place) {
          if(self.placeType() == "requestH"){
            service.nearbySearch(requestH, callback);
            console.log("hospital");
          }

          if(self.placeType() == "requestP"){
            service.nearbySearch(requestP, callback);
            console.log("police");
          }

          if(self.placeType() == "requestF"){
            service.nearbySearch(requestF, callback);
            console.log("fire_station");
          }

          return [];
      }, this);
    }

        
        
    // Will let the user know when Google Maps fails to load.
    function failedToLoad() {
      $('#map-canvas').html("Google Maps Failed to Load");
    }


    function callback(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearMarker();
            //self.allPlaces.removeAll();
            bounds = new google.maps.LatLngBounds();
                results.forEach(function (place){
                    for (var i = 0; i < results.length; i++) {
                        place.marker = createMarker(results[i]);
                        bounds.extend(new google.maps.LatLng(
                        place.geometry.location.lat(),
                        place.geometry.location.lng()));
                    }
                });
                map.fitBounds(bounds);
                results.forEach(getAllPlaces);
        }
    }



    function clearMarker() {
        for(var i = 0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
        self.markersArray = [];
    }



    function createMarker(place) {
     icons = {
          url: place.icon,
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
      };
            
      
      var marker = new google.maps.Marker({
        map: map,
        icon: self.icons,
        name: place.name.toLowerCase(),
        position: place.geometry.location,
        place_id: place.place_id,
        animation: google.maps.Animation.DROP
      });
      
      var address;
      if (place.vicinity !== undefined) {
        address = place.vicinity;
      } else if (place.formatted_address !== undefined) {
        address = place.formatted_address;
      }
      var contentString = '<div style="font-weight: bold">' + place.name + '</div><div>' + address + '</div>';
  
      google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(contentString);
        infoWindow.open(map, this);
        map.panTo(marker.position);
        marker.setAnimation(google.maps.Animation.DROP);
        setTimeout(function(){marker.setAnimation(null);}, 1450);
      });
  
      markersArray.push(marker);
      return marker;
    }
  
  

    self.clickMarker = function(place) {
      var marker;
  
      for(var e = 0; e < markersArray.length; e++) {
        if(place.place_id === markersArray[e].place_id) {
          marker = markersArray[e];
          break;
        }
      }

      map.panTo(marker.position);
  
    
      setTimeout(function() {
        var contentString = '<div style="font-weight: bold">' + place.name + '</div>' + '<br>' + place.address;
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        marker.setAnimation(google.maps.Animation.DROP);
      }, 300);
    };
  
    
    function getAllPlaces(place){
        var myPlace = {};
        myPlace.place_id = place.place_id;
        myPlace.position = place.geometry.location.toString();
        myPlace.name = place.name;
    
        var address;
        if (place.vicinity !== undefined) {
          address = place.vicinity;
        } else if (place.formatted_address !== undefined) {
          address = place.formatted_address;
        }
        myPlace.address = address;
    
        self.allPlaces.push(myPlace);
    }

  
    function clearOverlays() {
      for (var i = 0; i < markersArray.length; i++ ) {
       markersArray[i].setMap(null);
      }
      markersArray.length = 0;
    }
  
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  

 self.vm = new appViewModel();
 ko.applyBindings(vm);
  
