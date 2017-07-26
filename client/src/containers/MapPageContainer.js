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
    showPlaces: false
    // waypoint: {}
  }

  setNewMap = (locationData) => {
    this.setState({
      location: {
        lat: locationData.location.lat,
        long: locationData.location.long,
        address: locationData.address,
        zoom: 14
        // waypoint: {}
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

  // passDownWaypoint = (placeData) => {
  //   var waypoint = {
  //     location: new google.maps.LatLng(placeData.geometry.location.lat(), placeData.geometry.location.lng()),
  //     stopover: true
  //   }
  //   this.setState({
  //     waypoint: waypoint
  //   })
  // }

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
                    // passUpWaypoint={this.passDownWaypoint}
                  />
                </Container>
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer
              mapData={this.state.location}
              passUpPlaces={this.setPlaces}
              // waypoint={this.state.waypoint}
            />
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}
