import React from 'react'
import AddressForm from '../components/AddressForm'
import MapContainer from './MapContainer'
import PlacesListContainer from './PlacesListContainer'
import { Grid, Container, Card } from 'semantic-ui-react'

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
    placeName: '',
    error: false
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
    if (places.length !== 0) {
      this.setState({
        ...this.state,
        error: false,
        places: places,
        showPlaces: true
      })
      this.props.sendState(this.state)
    } else {
      this.setState({
        ...this.state,
        error: true,
        places: [],
        showPlaces: false
      })
    }
    console.log('error', places)
    console.log(this.state.error)
  }

  passDownPlaceData = (placeName) => {
    this.setState({
      placeName: placeName
    })
  }

  sendDirections = (directions) => {
    this.props.sendDirections(directions)
  }

  sendMarkers = (markers) => {
    this.props.sendMarkers(markers)
  }

  renderErrorMessage = () => {
    return (
      <Card fluid>
        <Card.Content>
          <Card.Header>
            Sorry, no dog parks found nearby.
          </Card.Header>
          <Card.Header>
            Try again!
          </Card.Header>
        </Card.Content>
      </Card>
    )
  }

  render () {
    console.log('render', this.state.error)
    return (
        <Grid padded>
          <Grid.Column width={4}>
            <Grid.Row>
              <AddressForm passUpLocation={this.setNewMap} placeName={this.state.location.address}/>
            </Grid.Row>
              <Grid.Row>
                {this.state.places.length > 0 &&
                  <Container>
                    <PlacesListContainer
                      places={this.state.places}
                      location={this.state.location}
                      passUpPlaceData={this.passDownPlaceData}
                      showPlaces={this.state.showPlaces}
                    />
                </Container>}
                {this.state.error && this.renderErrorMessage()}
              </Grid.Row>
          </Grid.Column>
          <Grid.Column width={12}>
            <MapContainer
              mapData={this.state.location}
              passUpPlaces={this.setPlaces}
              placeName={this.state.placeName}
              sendDirections={this.sendDirections}
              sendMarkers={this.sendMarkers}
            />
          </Grid.Column>
        </Grid>
    )
  }
}
