import React from 'react'

// this component could be used to show more information and allow for users to signup

const SignUp = (props) => {
    return ( 
      <div className="signupPage">
      <form className="signupForm" onSubmit={(event) => {props.handleSignup(event)}}>
        <label>
          Create Username: 
          <input name="username" type="text"></input>
        </label>
        <label>
          Create Password:
          <input name="password" type="password"></input>
        </label>
        <label>
          Email:
          <input name="email" type="text"></input>
        </label>
        <label>
          City:
          <input name="city" type="text"></input>
        </label>
        <label>
          State:
          <input name="state" type="text"></input>
        </label>
        <input className="btn btn-outline-light btn-sm" type="submit" value="Submit"></input>
      </form>
      {/* <input className="btn btn-outline-light btn-sm" type="button" value="Login Page" onClick={props.switchLogin}></input> */}
      </div>
     );
}
 
export default SignUp;