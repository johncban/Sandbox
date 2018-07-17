const self = this;

function appViewModel() {
    var map;
    var service;
    self.service = ko.observable();
    self.icons = ko.observable();

    self.placeType = ko.observable("");
    self.placeCategory = ko.observable();
    self.allPlaces = ko.observableArray([]);

    var infoWindow;
    self.lat = ko.observable('');
    self.lng = ko.observable('');
    

    localLocation = new google.maps.LatLng(40.7058683, -74.0135793);
    self.markersArray = ko.observableArray([]);
    
    var trafficLayer = new google.maps.TrafficLayer();
    var mapTimerLoad = window.setTimeout(mapException,6000);

    /* Seach Option Slide */
    self.fadeTag = function(data, event) {
      $(event.currentTarget).next().fadeToggle();
      clearMarker();
    };

  
    function initialize() {
      weather();

      var styleTheme = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#606060"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
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
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                },
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
            "elementType": "geometry",
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
                    "hue": "#ff0000"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text",
            "stylers": [
                {
                    "hue": "#ff0000"
                },
                {
                    "visibility": "on"
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
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
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
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.highway",
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
            "featureType": "road.highway",
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
            "featureType": "road.highway",
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
            "featureType": "road.highway",
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
            "featureType": "road.highway",
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
            "featureType": "road.highway.controlled_access",
            "elementType": "all",
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
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
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
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#a9c7db"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#1e7393"
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
                },
                {
                    "hue": "#ff0000"
                }
            ]
        },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#1b5d51"
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
            "elementType": "all",
            "stylers": [
                {
                    "hue": "#ff0000"
                },
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
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
                    "color": "#1e6d78"
                },
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

      trafficLayer.setMap(map);

      infoWindow = new google.maps.InfoWindow();

      setCurrentLocation();
      centerMap(localLocation);
      
      google.maps.event.addListener(map, 'tilesloaded', function() {
        window.clearTimeout(mapTimerLoad);
      });
    }
  
    function mapException() {
      alert("Google Maps Fails to Load. Please Check your Internet Connection");
    }

    function weather() {
      var location = document.getElementById("location");
      var apiKey = '2e3f338bc2f1aca78c89eed53e8c1358';
      var url = 'https://api.forecast.io/forecast/';
  
      navigator.geolocation.getCurrentPosition(success, error);
  
      function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
  
        location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';
        
  
         $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function(data) {
          $('#temp').html(data.currently.temperature + '° F');
          $('#minutely').html(data.currently.summary);
          $('#alrt').html(data.currently.alert);
        });
      }
  
      function error() {
        location.innerHTML = "Unable to retrieve your location";
      }
  
      location.innerHTML = "Locating...";
    }

    var centerMap = function (location) {
        map.setCenter(location);
        google.maps.event.trigger(map, 'resize');
    }

    var setCurrentLocation = function () {
        if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {

                            this.pos = {
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

      self.placeCategory = ko.computed(function(place) {
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


    function getAllPlaces(place) {
        var myPlace = {};
        myPlace.name = place.name;
        
        console.log(myPlace);
        allPlaces.push(myPlace);
    }
    


    function callback(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearMarker();
            self.allPlaces.removeAll();
            bounds = new google.maps.LatLngBounds();
                results.forEach(function (place){
                    for (var i = 0; i < results.length; i++) {
                        place.marker = createMarker(results[i]);
                        bounds.extend(new google.maps.LatLng(
                        place.geometry.location.lat(),
                        place.geometry.location.lng()));
                        self.listClick = function() {
                          google.maps.event.trigger(self.markersArray[i++], 'click');
                        };
                    }
                });
                map.fitBounds(bounds);
                results.forEach(getAllPlaces);
        }
    }

    self.listClick = function(allPlaces) {
      google.maps.event.trigger(allPlaces.marker, 'click');
    };



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



    google.maps.event.addDomListener(window, 'load', initialize);
}
  

 self.vm = new appViewModel();
 ko.applyBindings(vm);
  
