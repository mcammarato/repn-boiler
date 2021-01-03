import React from 'react';
import Axios from 'axios';
import '../../../scss/components/addresses/addresses.scss';

class Addresses extends React.Component {
  constructor() {
    super ()
    this.state = {
      addresses: []
    }
    this.addresses = this.getAddresses.bind(this)
  }

  getAddresses() {
    Axios.get('api/v1/aw/getAddresses')
    .then(res => {
      const addresses = res.data
      this.setState({ addresses })
    })
  }

componentDidMount() {
  this.getAddresses()
}

render() {
  return (
    <div className="addresses">
      <h4>Addresses:</h4>
      <ul>
        {this.state.addresses.map(address =>
          <li key={address.addressid}>{address.addressline1}</li>
        )}
      </ul>
    </div>
    )
  }
}

export default Addresses;