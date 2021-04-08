import React from 'react';
import Axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorsList: [], redirect: false };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.showErrors = this.showErrors.bind(this)
  }

  showErrors() {
    let errsDiv = document.getElementById('errors');
    errsDiv.innerHTML = '';
    this.state.errorsList.map(err => {
      let li = document.createElement('li');
      li.textContent = err.message;
      errsDiv.appendChild(li);
    })
  }
  
  handleSubmit(e) {
    e.preventDefault();
    let currentComponent = this;
    Axios({
      method: 'POST',
      url: 'http://localhost:3000/api/register',
      data: JSON.stringify(Object.fromEntries(new FormData(e.target))),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
    })
    // server responds with:
    .then((res) => {

      var errors = res.data;

      // if no errors
      if (errors == 'OK') {
        //window.location = '/login';
      }
      else {
        // handle errors
        currentComponent.setState({errorsList: errors});
        currentComponent.showErrors();
      }
    })
    .catch(function(res) {
      console.log(res);
    })
  }

  render () {
    return (
      <div className="register">
        <h4>Register</h4>
        <ul id="errors"></ul>
        <form onSubmit={this.handleSubmit} noValidate>
            <div>
                <label>Username:</label>
                <input type="text" name="username" required/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" />
            </div>
            <div>
                <input type="submit" value="Register"/>
            </div>
        </form>
      </div>
    )
  }
}


export default Register;