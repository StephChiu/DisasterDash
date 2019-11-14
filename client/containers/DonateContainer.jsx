import React, { useEffect, useState } from 'react'

const DonateContainer = (props) => {
   
  // to remove from github 
  let apiKey = '3aeb5336-1225-45f1-813f-acc92b4efce7'
  
  const[input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setInput(event.target.value)
  }
  
  const handleSubmit = () => {
    fetch(`https://api.globalgiving.org/api/public/services/search/projects.json?api_key=${apiKey}3aeb5336-1225-45f1-813f-acc92b4efce7&q=hurricane`)
  }
  

  return (
    <div id="donate">
      <h3>Donate to Disaster Relief</h3>
      <br></br>
      <h5>Explore Projects</h5>
      <input type="text" onChange={() => handleSearch(event)}></input>
      <input type="button" value="Search" onClick={handleSubmit}></input>
    </div>
  )
}

export default DonateContainer;