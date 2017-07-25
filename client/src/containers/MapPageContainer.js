import React from 'react'
import AddressForm from '../components/AddressForm'
import MapContainer from './MapContainer'
import PlacesListContainer from './PlacesListContainer'
import { Grid, Container } from 'semantic-ui-react'

export default class MapPageContainer extends React.Component {
  state = {
    location: {
      lat: '',
      long: '',
      address: '',
      zoom: 13
    },
    places: [],
    showPlaces: false
  }

  setNewMap = (locationData) => {
    this.setState({
      location: {
        lat: locationData.location.lat,
        long: locationData.location.long,
        address: locationData.address,
        zoom: 15
      }
    })
  }

  setPlaces = (placeData) => {
    this.setState({
      ...this.state,
      places: placeData,
      showPlaces: true
    })
    console.log('dave', this.state.places)
  }

  render () {
    return (
      <Container>
        <Grid divided celled>
          <Grid.Column width={4}>
            <Grid.Row>
              <AddressForm passUpLocation={this.setNewMap} />
            </Grid.Row>
              <Grid.Row>
                <Container>
                  <PlacesListContainer places={this.state.places} location={this.state.location} />
                </Container>
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer mapData={this.state.location} passUpPlaces={this.setPlaces} />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
