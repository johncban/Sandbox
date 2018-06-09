const self = this;

function appViewModel() {
    var map;
    self.service = ko.observable();
    self.icons = ko.observable();

    self.placeType = ko.observable("");
    self.placeCategory = ko.observable();
    self.allPlaces = ko.observable([]);

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
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        //styles: styleTheme
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

      self.placeCategory = ko.computed(function() {
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

    /***
    function failedToLoad() {
      $('#map-canvas').html("Google Maps Failed to Load");
    }
     ***/


    function getAllPlaces(place) {
        var myPlace = {};
        myPlace.name = place.name;
        
        console.log(myPlace);
        self.allPlaces.push(myPlace); //Uncaught TypeError: self.allPlaces.push is not a function
        
    }



    function callback(results, status){
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearMarker();
            //self.getAllPlaces.removeAll();
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
  

  
    google.maps.event.addDomListener(window, 'load', initialize);
  }
  

 self.vm = new appViewModel();
 ko.applyBindings(vm);
  
