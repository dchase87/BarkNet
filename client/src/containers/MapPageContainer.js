/* global google */
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
    placeData: ''
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

  setPlaces = (placeData) => {
    this.setState({
      ...this.state,
      places: placeData,
      showPlaces: true
    })
  }

  passDownPlaceData = (placeData) => {
    this.setState({
      placeData: placeData
    })
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
                  <PlacesListContainer
                    places={this.state.places}
                    location={this.state.location}
                    passUpPlaceData={this.passDownPlaceData}
                  />
                </Container>
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer
              mapData={this.state.location}
              passUpPlaces={this.setPlaces}
              placeData={this.state.placeData}
            />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
