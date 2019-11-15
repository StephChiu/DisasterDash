import React from 'react'

const DonateCard = (props) => {
  return (
    <div className="donateCard">
    <div className="card mb-3">
      <div className="row no-gutters">
      <div className="col-md-4">
        <img className="card-img" src={`${props.image}`}/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
         <h5 className="card-title">{props.title}</h5>
         <div className="card-text">
         <small className="mb-2 text-muted">
           {`Goal: $${props.goal}`}
            <br></br>
           {`Funding: $${props.funding}`}
         </small>
        </div>
        <br></br>
        <div className="card-text">{props.activity}</div>
        <br></br>
        <a href={`${props.link}`}>Donate</a>
        </div>
      </div>
    </div>
    </div>
    </div>
  )
}

export default DonateCard;
