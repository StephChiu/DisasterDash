import React, {useState, useEffect} from 'react';
import Particles from 'react-particles-js'

//This container was made to display the landing page
//Ideally this will also contain auth and other things
//This will primarily be to display information regarding the site as a whole

//the particles in this container are for the polygon mask before entering the page

const LandingContainer = (props) => {
  const [location, setTempLoc] = useState("");
  console.log(props.history);
  useEffect(() => {
    fetch('/loc')
    .then(resp => resp.json())
    .then(data => {
      props.updateLocation(data.city);
      setTempLoc(data.city);
    })
    .catch((err) => {
        console.log(err)
    })
  },[])
  
  const tempLoc = (e) =>{
    setTempLoc(e.target.value);
  }

  return ( 
    <div id="landing">
      <div id="landingInfo">
        <h2>DisasterDash</h2>
        <h3>Keep Up With The Disaster</h3>
        <p>Outpace Your Fate</p>
        <input onChange= {tempLoc} type="text" value={location}></input><button onClick={() => {props.updateLocation(location); alert("location configured!");}}>Set</button>
      </div>
      <div id="particles">
      <Particles
          params={{
            // Maximum Frames Per Second
            "fps_limit": 60,
            "width": 500,
            "particles": {
              "number": {
                // Number of Particles
                "value": 600,
                "density": {
                  "enable": false
                }
              },
              // Lines between Particles
              "line_linked": {
                "enable": true,
                // Maximum Distance that Particles will attach to each other
                "distance": 20,
                "opacity": 0.4
              },
              // Movement Speed of the Particles
              "move": {
                "speed": 1
              },
              "opacity": {
                "anim": {
                  "enable": true,
                  "opacity_min": 0.05,
                  "speed": 1,
                  "sync": false
                },
                "value": 0.4
              }
            },
            "polygon": {
              "enable": true,
              // Size of your mask
              "scale": .5,
              // Type can be:
              // inline(particles on the lines of your mask),
              // inside(particles inside the lines of your mask[ Will only work on non-curved lines ]),
              // outside(particles outside the lines of your mask[ Will only work on non-curved lines ])
              "type": "inline",
              "move": {
                // How far away from your lines the particles are allowed to venture out
                "radius": .5
              },
              // Url for mask, here we are routing to the backend
              "url":"/flare",
              "inline": {
                "arrangement": "equidistant"
              },
              "draw": {
                "enable": false,
                "stroke": {
                  "color": "rgba(0, 0, 0, .2)"
                }
              }
            },
            "retina_detect": false,
            "interactivity": {
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "bubble"
                }
              },
              "modes": {
                "bubble": {
                  "size": 1,
                  "distance": 1
                }
              }
            }
        }} />
      </div>
      <p id="company">by teamd-Umbledore</p>
    </div>
  );
}
 
export default LandingContainer;