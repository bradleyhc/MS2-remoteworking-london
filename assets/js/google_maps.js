
// Define arrays for markers to allow for filtering by area on Map
let markers = [];
let filteredMarkers = [];
let locationListings = [];

// Initialize the Google Map
function initMap() {
    

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 51.501027, lng: -0.124095 },
        zoom: 12,
        mapId: "1daab95bc3f973ff",
        mapTypeControl: false,
    });

    const infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);
    

    // For ...in loop to iterate through 'request' array and show on map as markers and infowindow
    for (var m in request) {
        let locationMap = request[m];

        service.getDetails(locationMap, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                addMarker(locationMap, place, map, infowindow);
            } else {
                console.log("Error - place could not be found");
            }
        });
    };
    
    // For ...in loop to iterate through 'request' array and show as list
    for (let x = 0; x < request.length; x++) {
        let location = request[x];


        
        //   if (location.photo_reference === undefined) {
        //     return "";
        //  } else {
        service.getDetails(location, (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                let cardContent =
                    $("#locations_list").append(

                    `<div class="d-flex card flex-row list-item" id="list_item_${[x]}">
                    <div class="list-item-img"><img
                            src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location.photo_reference}&key=${gAPI}">
                    </div>
                    <div class="location-info d-flex flex-column">
                        <h3>
                            ${place.name}
                            ${location.area}
                        </h3>
                        <div class="area-tag">${location.area}</div>
                        <h4>${place.formatted_address}</h4>
                        <p class="list-item-short-desc">${location.para.substr(0, 50)} <span onclick="moreDetails(${[x]});" class="read-more-trigger" href="#">Read More</span></p>
                        
                
                    </div>

                </div>`);

 let sidebarContent = $("#locations_sidebar").append(

                            `<div class="hide" id="sidebar_list_${[x]}"><strong>
                            ${place.name}
                            </strong><br>
                            ${place.formatted_address}
                            <br><img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${location.photo_reference}&key=${gAPI}">
                            </div>`
                        );

            } else {
                console.log("Error - place could not be found");
            }
        });

    }

        // Sidebar each item
   /* for (let s = 0; s < request.length; s++) {
            let locationSide = request[s];

            //   if (request.item[c].photo_reference === undefined) {
            //     return "";
            //} else {
            service.getDetails(locationSide, (place, status) => {
               // if (status === google.maps.places.PlacesServiceStatus.OK) {

                        let sidebarContent = $("#locations_sidebar").append(

                            `<div class="" id="sidebar_list_${[s++]}"><strong>
                            ${place.name}
                            </strong><br>
                            ${place.formatted_address}
                            <br><img src="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${locationSide.photo_reference}&key=${gAPI}">
                            </div>`
                        );
         //       } else {
        //             console.log("Error - place could not be found");
        //            }
                }
            


            )

        }*/

    }

// Add marker function to push markers to array, allowing filter and sorting. 
// ** Acknowledgements - Peter on JS Fiddle for function concept - https://jsfiddle.net/peter/drytwvL8/ **
function addMarker(locationMap, place, map, infowindow) {
    let title = locationMap.title;
    let position = place.geometry.location;
    let address = place.formatted_address;
    let content = `<h6>${place.name}</h6><p>${address}<br>${place.place_id}</p>`;
    let area = locationMap.area;



    const marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        area: area,
    });

    filteredMarkers.push(marker);

    console.log(filteredMarkers);



    (function (marker, content) {
        // Show info on marker click
        google.maps.event.addListener(marker, "click", function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
            map.panTo(this.getPosition());
            return

        });
    })(marker, content);
};






function showList() {
    for (var ll = 0; ll < locationListings.length; ll++) {
        item = locationListings[ll];
        for (var property in item) {
            $("#locations_list").append(property);


            console.log("hi there");
        }
    }
};

showList();