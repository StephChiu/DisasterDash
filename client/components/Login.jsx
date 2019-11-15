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
      <a href="https://github.com/login/oauth/authorize?client_id=f508e33433cf1d98fd40&redirect_uri=http://localhost:8080/oathgithub" class="button">Sign in with GitHub</a>
      </div>
     );
}
 
export default Login;