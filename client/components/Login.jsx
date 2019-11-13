import React from 'react';

const Login = (props) => {
    return ( 
      <div className="loginPage">
      Login
      <form onSubmit={(event) => {props.handleLogin(event)}}>
        <label>
          Username
          <input name="username" type="text"></input>
        </label>
        <label>
          Password
          <input name="password" type="password"></input>
        </label>
        <input type="submit" value="Login"></input>
      </form>
      </div>
     );
}
 
export default Login;