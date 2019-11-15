import React from 'react'
import Map from '../components/Maps.jsx'

//We decided to pass our props into our container levels because we wanted to onboard passing our hooks
//despite there not being an actual reason to do so

const MapsContainer = (props) => {
  // console.log(props.path)
    return (
        <div id="map" >
          <Map location={props.location} layers={props.layers} path={props.path}/>
        </div>      
      );
}
 
export default MapsContainer;