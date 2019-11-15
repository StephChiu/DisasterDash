import React, {useEffect}from 'react';


//This componenet was build for the purpose of displaying a map that displays local disasters
//We started with displaying fires

const Maps = (props) => {

    let latitude
    let longitude
    useEffect(()=>{
        fetch(`/chooseLoc/${props.location}`)
        .then(data => data.json())
        .then(data => {
            latitude = data.lat;
            longitude = data.lng;
        })
        .then(() => {
            console.log(latitude);
            const aeris = new AerisWeather('BX5DJsHFWzOBmPsfAVf15', 'p7wb1Z4XFlC5g7NrLsQOmqNIBlr7JDUUypuW3Opb');
            aeris.views().then(views => {
                const map = new views.InteractiveMap(document.getElementById('map'), {
                    center: {
                        lat: latitude,
                        lon: longitude
                    },
                    zoom: 8,
                    layers: props.layers
                });
            });
        })
    },[props.location]);
    

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