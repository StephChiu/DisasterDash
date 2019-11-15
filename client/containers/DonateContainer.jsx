import React, { useEffect, useState } from 'react'
import DonateCard from '../components/DonateCard.jsx';

const DonateContainer = (props) => {
   
  // to remove from github 
  let apiKey = '3aeb5336-1225-45f1-813f-acc92b4efce7'

  const[input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setInput(event.target.value)
  }
  
  const handleSubmit = () => {
    const results = [];
    fetch(`https://api.globalgiving.org/api/public/services/search/projects.json?api_key=${apiKey}&q=${input}`, {
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      let output = data.search.response.projects.project;
      for (let i = 0; i < output.length; i += 1) {
        let url;
        if (output[i].image.imagelink[3].url) {
          url = output[i].image.imagelink[3].url
        } else if (output[i].image.imagelink[2].url) {
          url = output[i].image.imagelink[2].url
        } else {
          url = output[i].imageLink;
        }
        results.push(<DonateCard 
          title={output[i].title} 
          image={url} 
          activity={output[i].activities}
          funding={Math.round(output[i].funding).toLocaleString()}
          goal={Math.round(output[i].goal).toLocaleString()}
          link={output[i].projectLink}
          key={i}/>
        )}
    })
    .then(() => setSearchResults(results))
  }

  return (
    <div id="container-donate">
      <div id="donateHeader">
        <div id="donateText">
          <h3>Donate to Disaster Relief</h3>
          <br></br>
          <h5>Explore Projects</h5>
          <div className="input-group">
            <input type="text" onChange={() => handleSearch(event)}></input>
            <div className="input-group-append">
              <input className="btn btn-secondary" type="button" value="Search" onClick={handleSubmit}></input>
            </div>
          </div>
        </div>
      <div id="donateResults">
        {searchResults}
      </div>
      </div>
    </div>
  )
}

export default DonateContainer;