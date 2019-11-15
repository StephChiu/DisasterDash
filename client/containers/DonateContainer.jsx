import React, { useEffect, useState } from 'react'
import DonateCard from '../components/DonateCard.jsx';
import axios from 'axios';


const DonateContainer = (props) => {

  const[input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    setInput(event.target.value)
  }
  
  const handleSubmit = () => {
    const results = [];
    axios.get('/donate', {
      params: {
        input: input
      }
    })
    .then(data => {
      let output = data.data.search.response.projects.project;
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