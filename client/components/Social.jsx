import React, { useEffect, useState } from 'react';
const axios = require('axios');

//This component was built to view social media feeds of government accounts
//We began locally by targeting the LAFD

const Social = (props) => {
    // Create hook for the alerts state with initial values
    const [social, socialUpdate] = useState([[{title:'Loading...', link:'google.com'}],[{title:'Loading...', link:'google.com'}],[{title:'Loading...', link:'google.com'}]]);
    
    // Fetch alerts from the backend
    useEffect(() => {
        axios.get('/alerts')
            .then(res => {
                console.log('RES -> ', res.data);
            })
            .catch(err => console.log(err))

    });
    

    // Map incoming alerts to anchor tags
    const alerts = social.map((el, i) => {
        return <a key={i} className="alertEntry" href={el.link}>{el.title}</a>
        
        // <iframe width="560" height="315" 
        //     src={`https://www.youtube.com/embed/${}`} 
        //     frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
        //     allowfullscreen>
        // </iframe>
    })

    // Spread anchor tags to fill module
    return ( 
        <React.Fragment>
            {alerts}
        </React.Fragment>
    );
}
 
export default Social;