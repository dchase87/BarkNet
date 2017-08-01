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
    showPlaces: false,
    placeName: ''
  }

  setNewMap = (locationData) => {
    this.setState({
      location: {
        lat: locationData.location.lat,
        long: locationData.location.long,
        address: locationData.address,
        zoom: 14
      }
    })
  }

  setPlaces = (places) => {
    this.setState({
      ...this.state,
      places: places,
      showPlaces: true
    })
  }

  passDownPlaceData = (placeName) => {
    this.setState({
      placeName: placeName
    })
  }

  render () {
    return (
        <Grid padded>
          <Grid.Column width={4}>
            <Grid.Row>
              <AddressForm passUpLocation={this.setNewMap} />
            </Grid.Row>
              <Grid.Row>
                {this.state.places && <Container>
                  <PlacesListContainer
                    places={this.state.places}
                    location={this.state.location}
                    passUpPlaceData={this.passDownPlaceData}
                  />
                </Container>}
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer
              mapData={this.state.location}
              passUpPlaces={this.setPlaces}
              placeName={this.state.placeName}
            />
          </Grid.Column>
        </Grid>
    )
  }
}
