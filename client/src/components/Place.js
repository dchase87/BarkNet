/* global google */
import React from 'react'
import { Segment } from 'semantic-ui-react'

export default class Place extends React.Component {
  state = {
    placeData: {}
  }

  componentWillMount = nextProps => {
      this.fetchPlaceInfo()
      console.log('poop', this.props.place)
  }

  fetchPlaceInfo = () => {
    // if (this.)
    var loc = new google.maps.LatLng(this.props.location.lat, this.props.location.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    })
    console.log('dook', this.props.place.place_id)
    const service = new google.maps.places.PlacesService(map)
    service.getDetails({ placeId: this.props.place.place_id }, this.gatherUpResponses)
    console.log('fetchy')
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

  render () {
    return (
      <Segment raised>
        <a href={this.state.placeData.website}>{this.props.place.name}</a>
        <div>{this.props.place.vicinity}</div>
      </Segment>
    )
  }
}
