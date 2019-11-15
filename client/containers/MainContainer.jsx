import React, { useEffect, useState } from 'react';
import ContentContainer from './ContentContainer.jsx';
import LandingContainer from './LandingContainer.jsx';
import DonateContainer from './DonateContainer.jsx';
import SignUp from '../components/SignUp.jsx';
import Login from '../components/Login.jsx';

//we utilized react-bootstrap to style our page with pre-made components
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

//we imported the next set to utilize react-router as we wanted to route in a landing page
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Link,
  } from "react-router-dom";

//We created a main container preferentially as to carry our other containers
//This allows us to also utilize another layer for styling as well

//react router has two parts, one part is integrated into your main code to direct your user
//the second portion sends the user to where they go based on where your routes are established


const MainContainer = () => {
  //instantiating hook in this component so that the fetch occurs earlier
  const [newsEarthquake, setEarthquake] = useState([]);
  const [newsFire, setFire] = useState([]);
  const [newsTornado, setTornado] = useState([]);
  const [newsHurricane, setHurricane] = useState([]);
  const [location, setLoc] = useState("");
  const [signupPage, setSignup] = useState(false);
  const [loginPage, setLogin] = useState(false);
  const [user, setUser] = useState('');

  // conditional rendering for sign up  
  const signupPopUp = () => {
    if (signupPage == false) {
      setSignup(true);
      setLogin(false);
    } else {
      setSignup(false);
      setLogin(false);
    }
  }

  const switchLogin = () => {
    setSignup(false);
    setLogin(true);
  }

  const handleSignup = (event) => {
    event.preventDefault();
    fetch('/signup', {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target))
    })
    .then(res => res.json())
    .then(data => {
      alert(data)
    })
    .catch(err => console.log('error in login fetch', err))
    switchLogin();
  }

  let SignUpDisplay = null;
  if (signupPage === true) {
    SignUpDisplay = <SignUp className="signup" switchLogin={switchLogin} handleSignup={handleSignup}/>
  }

  // conditional rendering for login
  const loginPopUp = () => {
    if (loginPage == false) {
      setLogin(true);
      setSignup(false);
    } else {
      setLogin(false);
      setSignup(false);
    }
  }

  const handleLogin = (event) => {
    event.preventDefault();
    fetch('/login', {
      method: 'POST',
      body: new URLSearchParams(new FormData(event.target))
    })
    .then(res => res.json())
    .then(data => {
      setUser(`Welcome ${data}!`)
    })
    .catch(err => console.log('error in login fetch', err))
    setLogin(false);
  }

  let LoginDisplay = null;
  if (loginPage === true) {
    LoginDisplay = <Login handleLogin={handleLogin}/>
  }

  const updateLocation = (newLoc) =>{
    console.log("updated location", newLoc);
    newLoc = newLoc.replace(" ", "+");
    const endPoint = `/news?loc=${newLoc}&dis=earthquake`;
    fetch(endPoint)
    .then(body => body.json())
    .then(body => {
      setEarthquake(body);
      setLoc(newLoc);
    })
    const fireEndPoint = `/news?loc=${newLoc}&dis=fire`;
    fetch(fireEndPoint)
    .then(body => body.json())
    .then(body => {
      setFire(body);
      setLoc(newLoc);
    })
    const hurricaneEndPoint = `/news?loc=${newLoc}&dis=hurricane`;
    fetch(hurricaneEndPoint)
    .then(body => body.json())
    .then(body => {
      setHurricane(body);
      setLoc(newLoc);
    })
    const tornadoEndPoint = `/news?loc=${newLoc}&dis=tornado`;
    fetch(tornadoEndPoint)
    .then(body => body.json())
    .then(body => {
      setTornado(body);
      setLoc(newLoc);
    })

    
  };

  //easter egg for sandstorm- just need to click the fire icon
  const Easteregg = () => {
    const audio = new Audio(
      'https://iringtone.net/rington/file?id=8454&type=sound&name=mp3'
    );
    audio.play();
    const app = document.getElementById('root');
    app.classList.add('easter-egg');
    const colorGen = () => {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    };
    setInterval(() => {
      const elements = document.querySelectorAll('*');
      for (let i = 0; i < elements.length; i += 1) {
        elements[i].style.backgroundColor = `${colorGen()}`;
        elements[i].style.color = `${colorGen()}`;
        elements[i].style.fill = `${colorGen()}`;
      }
    }, 100);
  };

  return ( 
    <article id ="mainContainer">
      {SignUpDisplay}
      {LoginDisplay}
      <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>
          <img
              alt=""
              src="http://www.clker.com/cliparts/P/r/s/n/g/W/maron-flame-logo-4.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
              onClick={()=> Easteregg()}
          />
          <Link className="navLinks" to="/">DisasterDash</Link>
          </Navbar.Brand>
          <NavLink className="navLinks" to="/earthquake">Earthquake</NavLink>
          <NavLink className="navLinks" to="/fire">Wild Fire</NavLink>
          <NavLink className="navLinks" to="/hurricane">Hurricane</NavLink>
          <NavLink className="navLinks" to="/tornado">Tornado</NavLink>
          <NavLink className="navLinks" to="/donate">Donate</NavLink>
          <Button className="navButtons" variant="outline-light" onClick={loginPopUp}>Login</Button>
          <Button className="navButtons" variant="outline-light"  onClick={signupPopUp}>Sign Up</Button>
          <Navbar.Text fixed="right">{user}</Navbar.Text>
        </Navbar>
        <Switch>
          <Route path="/earthquake">
            <ContentContainer location={location} news={newsEarthquake} path={'earthquake'} disaster="earthquake"/>
          </Route>
          <Route path="/fire">
            <ContentContainer location={location} news={newsFire} layers={'fires-outlook,fires-dryltg-outlook,fires-obs-icons,fires-obs-points'} disaster="fire"/>
          </Route>
          <Route path="/hurricane">
            <ContentContainer location={location} news={newsHurricane} layers={'stormcells,tropical-cyclones'} disaster="hurricane"/>
          </Route>
          <Route path="/tornado">
            <ContentContainer location={location} news={newsTornado} layers={'stormcells'} disaster="tornado"/>
          </Route>
          <Route path="/donate">
            <DonateContainer/>
          </Route>
          <Route path="/">
            <LandingContainer updateLocation={updateLocation}/>
          </Route>
        </Switch>
      </Router>
    </article>
  );
}

 
export default MainContainer;