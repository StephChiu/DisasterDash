import React from 'react'

// this component could be used to show more information and allow for users to signup

const SignUp = (props) => {
    return ( 
      <div className="signupPage">
      Sign Up
      <form method="POST" action="/signup">
        <label>
          Create Username
          <input name="username" type="text"></input>
        </label>
        <label>
          Create Password
          <input name="password" type="password"></input>
        </label>
        <label>
          Email
          <input name="email" type="text"></input>
        </label>
        <label>
          City
          <input name="city" type="text"></input>
        </label>
        <label>
          State
          <input name="state" type="text"></input>
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      <input type="button" value="Login" onClick={props.switchLogin}></input>
      </div>
     );
}
 
export default SignUp;