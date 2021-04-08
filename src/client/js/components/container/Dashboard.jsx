import React from 'react';
import Axios from 'axios';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null };
    this.getData = this.getData.bind(this);
  }

  getData() {
    Axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/api/dashdata'
    })
    .then((res) => {
      this.setState({user: res.data.username})
    })
  }

  componentDidMount() {
    this.getData(); 
  }

  render () {
    return (
      <div className="dashboard">
        <h1>Hello, {this.state.user}</h1>
        <p>stufffff</p>
      </div>
    )
  }
}

export default Dashboard;