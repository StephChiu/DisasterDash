import React from 'react';


//This componenet was build for the purpose of displaying a map that displays local disasters
//We started with displaying fires

const Maps = (props) => {
    console.log(props.location)
        const aeris = new AerisWeather('BX5DJsHFWzOBmPsfAVf15', 'p7wb1Z4XFlC5g7NrLsQOmqNIBlr7JDUUypuW3Opb');
        aeris.views().then(views => {
            const map = new views.InteractiveMap(document.getElementById('map'), {
                center: {
                    lat: 33.7997,
                    lon: -118.2445
                },
                zoom: 11,
                layers: 'fires-outlook,fires-dryltg-outlook,fires-obs-icons,lightning-strike-density,fires-obs-points,alerts,stormcells,tropical-cyclones'
            });
        });
    
    

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