import React from 'react';


//This componenet was build for the purpose of displaying a map that displays local disasters
//We started with displaying fires

const Maps = (props) => {
    console.log(props)
    let latitude
    let longitude
    fetch('/chooseLoc/:name')
    .then(data => data.json())
    .then(data => {
        console.log(data.lat, data.lng)
        latitude = data.lat;
        longitude = data.lng;
    })
    .then(() => {
        console.log(latitude);
        const aeris = new AerisWeather('01eC4PsnCj8tOk6CLMynd', '5TCmINp2KuOzPddNUj7Jw3Tf6Px9PoUPIIzDaexN');
        aeris.views().then(views => {
            const map = new views.InteractiveMap(document.getElementById('map'), {
                center: {
                    lat: latitude,
                    lon: longitude
                },
                zoom: 11,
                layers: 'fires-outlook,fires-dryltg-outlook,fires-obs-icons,lightning-strike-density,fires-obs-points,alerts,stormcells,tropical-cyclones'
            });
        });
    })
    

    return ( 
        <div>
            <p>Maps</p>
            <div className="map-container">
                <div id="map"></div>
            </div>
        </div>
     );
}
 
export default Maps;