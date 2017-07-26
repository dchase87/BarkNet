/* global google */
import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

export default class PlacesContainer extends React.Component {
  state = {
    placeData: {},
    clicked: false,
  }

  componentWillMount = nextProps => {
      this.fetchPlaceInfo()
  }

  fetchPlaceInfo = () => {
    var loc = new google.maps.LatLng(this.props.location.lat, this.props.location.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    })
    const service = new google.maps.places.PlacesService(map)
    service.getDetails({ placeId: this.props.place.place_id }, this.gatherUpResponses)
  }

  gatherUpResponses = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.storePlace(place)
      console.log('fetch works', place)
    } else {
      console.error(`error fetching places ${status}`)
    }
  }

  storePlace = (place) => {
    this.setState({
      placeData: place
    })
  }

  handleClick = (e) => {
    this.props.toggleBounce(this.state.placeData.vicinity)
  }

  render () {
    console.log('place', this.state.placeData)
    return (
      <Card.Group>
        <Card
          link
          // href={this.state.placeData.website}
          onClick={this.handleClick}
          >
          <Card.Content>
            <Card.Header>
              {this.props.place.name}
            </Card.Header>
            <Card.Meta>
              {this.props.place.vicinity}
            </Card.Meta>
          </Card.Content>

        </Card>
      </Card.Group>
    )
  }
}
