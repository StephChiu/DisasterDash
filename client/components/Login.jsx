import React from 'react';

const Login = (props) => {
    return ( 
      <div className="loginPage">
      <div className="loginForm">
        <form onSubmit={(event) => {props.handleLogin(event)}}>
          <label>
            Username:
            <input name="username" type="text"></input>
          </label>
          <label>
            Password:
            <input name="password" type="password"></input>
          </label>
          <input className="btn btn-outline-light btn-sm" type="submit" value="Login"></input>
          <a className="btn btn-outline-light btn-sm" href="https://github.com/login/oauth/authorize?client_id=f508e33433cf1d98fd40&redirect_uri=http://localhost:8080/oathgithub" class="button">Sign in with GitHub</a>
        </form>
      </div>
      </div>
     );
}
 
export default Login;