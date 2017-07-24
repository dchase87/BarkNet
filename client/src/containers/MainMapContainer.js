import React from 'react'
import AddressForm from '../components/AddressForm'
import Map from '../components/Map'
import { Grid } from 'semantic-ui-react'

export default class MainMapContainer extends React.Component {
  state = {
    lat: '',
    long: '',
    address: '',
    zoom: 13
  }

  setNewMap = (locationData) => {
    this.setState({
      lat: locationData.location.lat,
      long: locationData.location.long,
      address: locationData.address,
      zoom: 15
    })
  }

  render () {
    return (
      <Grid divided padded>
        <Grid.Column width={4}>
          <AddressForm passUpLocation={this.setNewMap}/>
        </Grid.Column>
        <Grid.Column width={12}>
          <Map mapData={this.state} />
        </Grid.Column>
      </Grid>
    )
  }
}
