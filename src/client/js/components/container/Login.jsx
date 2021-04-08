import React from 'react';

function Login() {
  return( 
  <div className="lgon">
    <form action="http://localhost:3000/api/login" method="post">
        <div>
            <label>Username:</label>
            <input type="text" name="username"/>
        </div>
        <div>
            <label>Password:</label>
            <input type="password" name="password"/>
        </div>
        <div>
            <input type="submit" value="Log In"/>
        </div>
    </form>
  </div>
  )
}

export default Login;
