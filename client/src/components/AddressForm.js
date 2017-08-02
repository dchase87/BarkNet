import React from 'react'
import { Form, Segment, Header, Modal } from 'semantic-ui-react'
const geocoder = require('google-geocoder')

export default class AddressForm extends React.Component {
  state = {
    address: '',
    location: {
      lat: '',
      long: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      address: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.getCoords(this.state)
    this.setState({
      address: ''
    })
  }

  getCoords = (state) => {
    const punctuationLessString = state.address.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    const finalString = punctuationLessString.replace(/\s{2,}/g," ")
    const geo = geocoder({ key:'AIzaSyBjlJJkNp_63CEmawR3DMj-6Rf0Lw5fbDc'})
    geo.find(finalString, (err, resp) => {
      if (resp[0] === undefined) {
        window.alert('Dang. Nothing found! Try again.')
      } else {
        let newState = {
          ...state,
          location: {
            lat: resp[0].location.lat * 1,
            long: resp[0].location.lng * 1
          }
        }
        this.props.passUpLocation(newState)
      }
    })
  }

  render () {
    return (
      <Segment padded raised>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <Header>Where does your dog live?</Header>
            <input required placeholder='address' name='address' value={this.state.address} onChange={this.handleChange} />
          </Form.Field>
          <Form.Button content='Search' color='black' />
        </Form>
      </Segment>
    )
  }
}
