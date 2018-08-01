/**
 * mapApp.js
 * STABLE: Personal Emergency WEB App 
 * BETA PROTOTYPE ver.1.1.0.
 * Student: Juan Carlo A. Banayo 
 * Udacity: FSND 
 * Project 4: Neighborhood App (KnockoutJS Framework)
 */

/**
 * Create global self variable that store function owner or "this".
 * NOTE: Constant cannot change in re-declaration. Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
 */

var self = this;


/**
 *  Declare Map View Model.
 */
function appViewModel() {

    /**
     * Create KO observables for the following:
     * service, icons, placeType, placeCategory, lat/lng, Weather API div, localLocation, placeArray(markers)
     */
    self.service = ko.observable();
    self.icons = ko.observable();
    self.placeType = ko.observable("");
    self.placeCategory = ko.observable();
    self.allPlaces = ko.observableArray([]);

    self.lat = ko.observable('');
    self.lng = ko.observable('');

    self.showWeatherInfo = ko.observable(true);
    self.showMapOptions = ko.observable(false);
<<<<<<< HEAD

    self.showPlaceList = ko.observable(true);
=======
    self.showList = ko.observable(true);
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

    // Set Default Local location to New York.
    self.localLocation = new google.maps.LatLng(40.7058683, -74.0135793);
<<<<<<< HEAD
=======
    self.placeArray = ko.observableArray([]);

    self.markerCount = ko.observable("");

>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

    /**
     * Declare Global Variables for mp(map), infoWindow, trafficLayer and mpStartUpTimer
     */
    var mp, infoWindow;
    var trafficLayer = new google.maps.TrafficLayer();
    var bikeLayer = new google.maps.BicyclingLayer();
<<<<<<< HEAD
    var placeArray = [];

    var mpStartUpTimer = window.setTimeout(mapException, 5000);
=======
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

    var mpStartUpTimer = window.setTimeout(mapException, 6000);

<<<<<<< HEAD

    // Search and calculate the center of the map for latitude and longitude
    function cmpCtr() {
        var latAndLng = mp.getCenter();
        lat = latAndLng.lat();
        lng = latAndLng.lng();
    }


=======
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
    /* Seach Option Show */
    self.fadeTag = function (data, event) {
        self.showMapOptions(!self.showMapOptions());
        self.showWeatherInfo(!self.showWeatherInfo()); /* http://jsfiddle.net/FgVxY/672/ */
        uncheckRadio();
<<<<<<< HEAD
    };
    /* Uncheck Radio Controls Function */
=======
        clearMarker();
    };

>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
    self.uncheckRadio = function () {
        document.getElementById('hospital').parentNode.MaterialRadio.uncheck();
        document.getElementById('police').parentNode.MaterialRadio.uncheck();
        document.getElementById('firestations').parentNode.MaterialRadio.uncheck();
    };


    /**
     * Start Map App
     */
    self.initMp = function () {
<<<<<<< HEAD
=======
        weather(); // Call Weather API inside the init function.


>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
        /**
         * Google Map's Style Theme: Aquamarine
         */
        var styleTheme = [{
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#606060"
                }]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{
                    "color": "#f2f2f2"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "labels.text",
                "stylers": [{
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
                "stylers": [{
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
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [{
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
                "stylers": [{
                    "visibility": "on"
                }]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{
                        "color": "#1e6d78"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ];

<<<<<<< HEAD
        infoWindow = new google.maps.InfoWindow();

        // Map or mp declaration    
        mp = new google.maps.Map(document.getElementById('mp-c'), {
            center: localLocation,
=======
        // Map Declaration Call
        mp = new google.maps.Map(document.getElementById('mp-c'), {
            zoom: 15,
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
            styles: styleTheme,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

<<<<<<< HEAD
=======


>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
        // Map Traffic Feature
        trafficLayer.setMap(mp);
        bikeLayer.setMap(mp);

        // Declare infoWindow for user's geolocation.
        infoWindow = new google.maps.InfoWindow();

<<<<<<< HEAD
        // Functions to run in the initialized app
        weather(); // Weather API (Third Party)
        getPlaces(); // Google Places API
        cmpCtr(); // mp center calculator
        setCurrentLocation(); // Geolocator API (HTML-5 Native)
        searchBar(); // Google Place Search Autocomplete API
=======
        setCurrentLocation();
        centerMap(localLocation);
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

        // Timer to determine the startup quality of Google Map API
        google.maps.event.addListener(mp, 'tilesloaded', function () {
            window.clearTimeout(mpStartUpTimer);
        });
    };
<<<<<<< HEAD

    // Call the app or map initialization
    self.initMp();

    /**
     * Autocomplete Google Places API search box.
     */
    function searchBar() {
        var input = document.getElementById('search-input');
        var searchTextBox = new google.maps.places.SearchBox(input);
=======

    // If Google Map failed to load it will load mapException.
    function mapException() {
        alert("Google Maps Fails to Load. Please Check your Internet Connection");
    }


    function searchBar() {
        var input = document.getElementById('search-input');
        var searchTextBox = new google.maps.places.SearchBox(input);

        google.maps.event.addListener(searchTextBox, 'places_changed', function () {
            var places = searchTextBox.getPlaces();
            clearMarker();
            clbckList();
            self.allPlaces.removeAll();
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

        google.maps.event.addListener(searchTextBox, 'places_changed', function () {
            var places = searchTextBox.getPlaces();
            var bounds = new google.maps.LatLngBounds();

            // Clear current markers and list of places while using the searchBar().
            clearMarker();
            self.allPlaces.removeAll();

            // Gather all the required places that are not undefined then generate the marker from the collected list of places.
            for (var i = 0, place; i < 10; i++) {
                if (places[i] !== undefined) {
                    place = places[i];
                    getAllPlaces(place);
                    createMarker(place);
                    bounds.extend(place.geometry.location);
                }
            }
            mp.fitBounds(bounds);
<<<<<<< HEAD
            cmpCtr(mp);
        });

        // Automatically change the mp's boundary after places_changed from searchTextBox listener.
=======
            centerMap(mp);
        });
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
        google.maps.event.addListener(mp, 'bounds_changed', function () {
            var bounds = mp.getBounds();
            searchTextBox.setBounds(bounds);
        });
    }
<<<<<<< HEAD


    // If Google Map failed to load it will load mapException.
    function mapException() {
        alert("Google Maps Fails to Load in >5 sec. Please Check your Internet Connection of Refresh the Web Browser");
        $('#mp-c').html("Google Maps Fails to Load >5 sec. Please Check your Internet Connection of Refresh the Web Browser");
        console.log("Google Maps Fails to Load >5 sec. Please Check your Internet Connection of Refresh the Web Browser");
    }
=======
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

    /**
     * Dark Sky API declaration under weather function.
     */
    function weather() {
        var location = document.getElementById("location");
        var apiKey = '2e3f338bc2f1aca78c89eed53e8c1358';
        var url = 'https://api.forecast.io/forecast/';

        // Utilize current location of the user's browser
        navigator.geolocation.getCurrentPosition(success, error);

        // If location and apiKey is sound it will perform weather data gathering.
        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;

            location.innerHTML = 'Latitude is ' + latitude + '° Longitude is ' + longitude + '°';

            $.getJSON(url + apiKey + "/" + latitude + "," + longitude + "?callback=?", function (data) {
                var icons = new Skycons({
                    "color": "#1BA5DF"
                });
                var icon = data.currently.icon;

                $('#temp').html(data.currently.temperature + '°F');
                $('#minutely').html(data.currently.summary);
                $('#tmz').html(data.daily.summary);
                $('#alrt').html(data.currently.alert);

                //add to skyicons the weather information
                icons.add(document.getElementById("iconW"), icon);
                //start animation
                icons.play();
            });
        }

        // If location cannot be detected, API key is invalid and other erroneous factors happen it will inform the user that it failed to load the API.
        function error() {
            alert("Unable to retrieve your location. Please check your web browser or your internet connection");
            console.log("Unable to retrieve your location. Please check your web browser or your internet connection");
            console.log(location.innerHTML);
        }
        // Location loader
        location.innerHTML = "Searching Your Current Location...";
        console.log("Searching Your Current Location...");
    }


    /**
     * A geolocation loader for Google Map and Google Place.
     */
    function setCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var infoLoc = '<b>' + 'Your Location' + '</b>';

                var origin = new google.maps.Circle({
                    map: mp,
<<<<<<< HEAD
                    radius: Math.sqrt(10) * 100,
=======
                    radius: Math.sqrt(10) * 100, 
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
                    fillColor: '#E8453C',
                    fillOpacity: 0.45,
                    center: position,
                    strokeColor: '#801616',
                    strokeOpacity: 0.50
                });

                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

<<<<<<< HEAD
=======
                // Start getPlaces function to gather place of interest in the current browser's location.
                getPlaces();
                listAllPlaces();

                searchBar();

>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
                infoWindow.setPosition(pos);
                infoWindow.setContent(infoLoc);
                infoWindow.open(mp, mk);
                mp.setCenter(pos);


                var mk = new google.maps.Marker({
                    position: pos,
                    map: mp,
                    title: 'Current Location',
                    animation: google.maps.Animation.BOUNCE
                });

                mk.addListener('click', function () {
                    infoWindow.open(mp, mk);
                    mp.setCenter(pos);
                });

                origin.bindTo('center', mk, 'position');
            }, function () {
                handleLocationError(true, infoWindow, mp.getCenter());
            });
        } else {
            handleLocationError(false, infoWindow, mp.getCenter());
        }
    }

    /**
     * Geolocation error handler.
     */
    var handleLocationError = function (browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(mp);
    };


<<<<<<< HEAD
    /*
    Function to pre-populate the map with place types.  nearbySearch retuns up to 20 places.
    */
    function getPlaces() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                var Hospital = {
                    location: pos,
                    radius: 4000,
                    types: ['hospital']
                };

                var FireStations = {
                    location: pos,
                    radius: 4000,
                    types: ['fire_station']
                };

                var Police = {
                    location: pos,
                    radius: 4000,
                    types: ['police']
                };

                infowindow = new google.maps.InfoWindow();
                service = new google.maps.places.PlacesService(mp);
                service.nearbySearch(Hospital, callback);
                service.nearbySearch(FireStations, callback);
                service.nearbySearch(Police, callback);
=======
        var Hospital = {
            location: pos,
            radius: 2500,
            types: ['hospital']
        };

        var FireStations = {
            location: pos,
            radius: 2500,
            types: ['fire_station']
        };

        var Police = {
            location: pos,
            radius: 2500,
            types: ['police']
        };

        /**
         * Pushes the address and phone number of placeCategory to the list  via getAllPlaces and callback for markers.
         * It also utilize the radio box to filter getAllPlaces through placeType.
         * */
        self.placeCategory = ko.computed(function () {
            if (self.placeType() == "Hospital") {
                service.nearbySearch(Hospital, callback);
            }

            if (self.placeType() == "FireStations") {
                service.nearbySearch(FireStations, callback);
            }

            if (self.placeType() == "Police") {
                service.nearbySearch(Police, callback);
            }
            return [];
        }, this);
    }


    function listAllPlaces() {
        service = new google.maps.places.PlacesService(mp);

        var requestOne = {
            location: pos,
            radius: 2500,
            types: ['hospital']
        };

        var requestTwo = {
            location: pos,
            radius: 2500,
            types: ['fire_station']
        };

        var requestThree = {
            location: pos,
            radius: 2500,
            types: ['police']
        };

        self.placeCategory = ko.computed(function () {
            service.nearbySearch(requestOne, clbckList);
            service.nearbySearch(requestTwo, clbckList);
            service.nearbySearch(requestThree, clbckList);
            return [];
        }, this);
    }

    // Pushes the name of places dictated by place types from google's place API.
    function getAllPlaces(place) {
        var myPlace = {};
        myPlace.name = place.name;
        myPlace.place_id = place.place_id;

        allPlaces.push(myPlace);
    }


    // Creates all list a link to open the marker defined from allPlaces (see getAllPlaces function).
    self.listClick = function (place) {
        var marker;
        var streetVS = new google.maps.StreetViewService();
        var radius = 50;

        for (var e = 0; e < placeArray.length; e++) {
            if (place.place_id === placeArray[e].place_id) {
                marker = placeArray[e];
                break;
            }
        }
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

                /**
                 * Pushes the address and phone number of placeCategory to the list  via getAllPlaces and callback for markers.
                 * It also utilize the radio box to filter getAllPlaces through placeType.
                 * */
                self.placeCategory = ko.computed(function () {
                    if (self.placeType() == "Hospital") {
                        service.nearbySearch(Hospital, callback);
                        clearMarker();
                        self.allPlaces.removeAll();
                    }

<<<<<<< HEAD
                    if (self.placeType() == "FireStations") {
                        service.nearbySearch(FireStations, callback);
                        clearMarker();
                        self.allPlaces.removeAll();
                    }

                    if (self.placeType() == "Police") {
                        service.nearbySearch(Police, callback);
                        clearMarker();
                        self.allPlaces.removeAll();
                    }
                    return [];
                }, this);


            }, function () {
                handleLocationError(true, infoWindow, mp.getCenter());
=======
        // Use Street View Service API to obtain marker position, pano radius and getStreetView instances.
        streetVS.getPanoramaByLocation(marker.position, radius, getStreetView);

        // Open infowindow in per place list click.
        infowindow.open(mp, marker);

        // Move or center the map into the marker's position at the same time run marker animation.
        mp.panTo(marker.position);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1450);
    };

    /**
     * Its a function that supports getAllPlaces function in regards
     * to the location attributes of each listed place and markers.
     */
    function callback(results, status) {
        var res = results.length;

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            clearMarker();
            self.allPlaces.removeAll();
            bounds = new google.maps.LatLngBounds();

            results.forEach(function (place) {
                place.marker = createMarker(place);
                bounds.extend(new google.maps.LatLng(
                    place.geometry.location.lat(),
                    place.geometry.location.lng()));

                // Reveal number of place type venues in each place type category.
                $(".placepop").html((placeType()) + ": " + res);
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
            });
        } else {
            handleLocationError(false, infoWindow, mp.getCenter());
        }
    }

    /*
    Gets the callback from Google and creates a marker for each place.  Sends info to getAllPlaces.
    */
    function callback(results, status) {
        var res = results.length;

<<<<<<< HEAD
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            bounds = new google.maps.LatLngBounds();
            results.forEach(function (place) {
=======
    function clbckList(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            bounds = new google.maps.LatLngBounds();
            results.forEach(function (place) {
                place.marker = createMarker(place);
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

                // https://stackoverflow.com/questions/24844915/google-maps-marker-show-hide
                $('#hideMrkr').click(function () {
                    if (!place.marker.getVisible()) {
                        place.marker.setVisible(true);
                        if (self.showMapOptions()) {
                            self.allPlaces.removeAll();
                        }
                    } else {
<<<<<<< HEAD
                        clearMarker();
                        self.allPlaces.removeAll();
                        self.showPlaceList(!self.showPlaceList());
                    }
                });

                place.marker = createMarker(place);
=======
                        place.marker.setVisible(false);
                        //self.showList = ko.observable(true);
                    }
                });
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
                bounds.extend(new google.maps.LatLng(
                    place.geometry.location.lat(),
                    place.geometry.location.lng()
                ));
            });

            mp.fitBounds(bounds);
            results.forEach(getAllPlaces);
        }
        $(".placepop").html((placeType()) + ": " + res);
    }

    // https://stackoverflow.com/questions/37214504/how-to-test-for-google-maps-place-type-with-if-conditional
    function isInArray(a, b) {
        return !!~a.indexOf(b);
    }


    // https://stackoverflow.com/questions/37214504/how-to-test-for-google-maps-place-type-with-if-conditional
    function isInArray(a, b) {
        return !!~a.indexOf(b);
    }

<<<<<<< HEAD

    /*
    Function to create a marker at each place.  This is called on load of the map with the pre-populated list, and also after each search.  Also sets the content of each place's infowindow.
    */
=======
    /**
     * A funciton to generate markers that open infowindow details view
     * (i.e. phone number and exact address).
     */
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
    function createMarker(place) {
        var icons = {
            url: place.icon,
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        var marker = new google.maps.Marker({
            map: mp,
            icon: icons,
            name: place.name.toLowerCase(),
            position: place.geometry.location,
            place_id: place.place_id,
            animation: google.maps.Animation.DROP
        });

<<<<<<< HEAD
        var address;
        if (place.vicinity !== undefined) {
            address = place.vicinity;
        } else if (place.formatted_address !== undefined) {
            address = place.formatted_address;
        }
=======

        var circleHospital = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#FF0000',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });
        var circlePolice = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#007ACC',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });
        var circleFire = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#FC532A',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });

>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587

        // Declare variable to initiate Google Place Service.
        var detailsService = new google.maps.places.PlacesService(mp);

        //var contentString = '<div style="font-weight: bold">' + place.name + '</div><div>' + address + '</div>';


        var circleHospital = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#FF0000',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });
        var circlePolice = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#007ACC',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });
        var circleFire = new google.maps.Circle({
            map: mp,
            radius: Math.sqrt(place.rating) * 100,
            fillColor: '#FC532A',
            fillOpacity: 0.5,
            center: place.center,
            strokeColor: '#FFFFFF',
            strokeOpacity: 0.50
        });

        google.maps.event.addListener(marker, 'click', function () {
            /* https://developers.google.com/maps/documentation/javascript/examples/place-details */
            /* https://developers.google.com/web/fundamentals/native-hardware/click-to-call/ */
            detailsService.getDetails({
                placeId: place.place_id
            }, function (place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    google.maps.event.addListener(marker, 'click', function () {
                        console.error(status);
                        return;
                    });
                }

                // Address logic for the specific marker if the marker is registered to Google details. Otherwise use place.vicinity
                var adrs;
                if (place.vicinity == undefined) {
                    adrs = place.vicinity;
                } else if (place.formatted_address !== undefined) {
                    adrs = place.formatted_address;
                }

                var rate;
                if (place.rating == undefined) {
                    rate = "Not Available";
                    alert("Radius and Location Rating Not Available");
                } else if (place.rating !== undefined) {
                    rate = place.rating;
                }

                var phne;
                if (place.formatted_phone_number == undefined) {
                    phne = "Not Available";
                    alert("Phone Not Available for this Place");
                } else if (place.formatted_phone_number !== undefined) {
                    phne = place.formatted_phone_number;
                }

<<<<<<< HEAD
                infowindow.setContent('<div><strong class="infobox-address-head">' + place.name + '</strong><br>' + '<strong class="infobox-address">' +
                    adrs + '</strong>' + '<br>' + '<strong class="infobox-address-phone">' + 'Phone: ' + '<a class="infobox-address-phone" href="tel:+1-' +
                    phne + '">' + phne + '</a>' + '</strong>' + '<b>' + '<p class="infobox-rating">' + '<hr>' + "Location Rating: " + rate + '</p>' + '</div>');
=======


                infowindow.setContent('<div><strong class="infobox-address-head">' + place.name + '</strong><br>' + '<strong class="infobox-address">' +
                    adrs + '</strong>' + '<br>' + '<strong class="infobox-address-phone">' + '<hr>' + 'Phone: ' + '<a href="tel:+1-' +
                    phne + '">' + phne + '</a>' + '</strong>' + '<b>' + '<p class="infobox-rating">'+"Location Rating: "+rate+'</p>'+'</div>');
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
            });
            infowindow.open(mp, this);
            mp.panTo(marker.position);
            marker.setAnimation(google.maps.Animation.BOUNCE);

<<<<<<< HEAD
            if (isInArray(place.types, "hospital")) {
                circleHospital.bindTo('center', marker, 'position');
            }

            if (isInArray(place.types, "police")) {
                circlePolice.bindTo('center', marker, 'position');
            }

            if (isInArray(place.types, "fire_station")) {
=======

            if(isInArray(place.types, "hospital")) {
                circleHospital.bindTo('center', marker, 'position');
            }

            if(isInArray(place.types, "police")) {
                circlePolice.bindTo('center', marker, 'position');
            }

            if(isInArray(place.types, "fire_station")) {
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
                circleFire.bindTo('center', marker, 'position');
            }

            $('#hideMrkr').click(function () {
                // https://stackoverflow.com/questions/8260029/how-to-remove-circle-from-google-maps-v3
                circleHospital.setMap(null);
                circlePolice.setMap(null);
                circleFire.setMap(null);
            });

            setTimeout(function () {
                marker.setAnimation(null);
            }, 1450);
        });

        placeArray.push(marker);
        return marker;
<<<<<<< HEAD
    }


    /*
    Function that will pan to the position and open an info window of an item clicked in the list.
    */
    self.listClick = function (place) {
        var marker;
        var streetVS = new google.maps.StreetViewService();
        var radius = 50;

        for (var e = 0; e < placeArray.length; e++) {
            if (place.place_id === placeArray[e].place_id) {
                marker = placeArray[e];
                break;
            }
        }

        // Initiates the panoramic street view for the infowindow in each list.
        var getStreetView = function (data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                console.log(data);

                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                var contentView = '<div class="pano-info-box">' + '<b class="pano-header">' + place.name + '</b>' + '<br>' + '<div id="pano"></div>' + '</div>';
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
                infowindow.setContent('<div>' + '<p><b>' + place.name + '</b></p>' + '</div>' + '<div><b><i>Street View Not Available!</i></b></div>');
                alert("Street View Not Available for " + place.name);
            }
        };

        // Use Street View Service API to obtain marker position, pano radius and getStreetView instances.
        streetVS.getPanoramaByLocation(marker.position, radius, getStreetView);

        // Open infowindow in per place list click.
        infowindow.open(mp, marker);

        // Move or center the map into the marker's position at the same time run marker animation.
        mp.panTo(marker.position);
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function () {
            marker.setAnimation(null);
        }, 1450);
    };



    // Pushes the name of places dictated by place types from google's place API.
    function getAllPlaces(place) {
        var myPlace = {};
        myPlace.name = place.name;
        myPlace.place_id = place.place_id;

        allPlaces.push(myPlace);
    }


    /**
     * A function that clearMarkers in the Google Map.
     */
    function clearMarker() {
        for (var i = 0; i < placeArray.length; i++) {
            placeArray[i].setMap(null);
        }
        self.placeArray = [];
=======
>>>>>>> 5c6bdd6a933bf9c95a4679db938cef31ae8b6587
    }

}


/**
 * Start  appStart in the beginning of the app including the view model.
 */
function appStart() {
    ko.applyBindings(new appViewModel());
}