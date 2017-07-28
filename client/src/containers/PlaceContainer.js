/* global google */
import React from 'react'
import ModalCarousel from '../components/ModalCarousel'
import { Card, Icon } from 'semantic-ui-react'

export default class PlaceContainer extends React.Component {
  state = {
    placeData: {},
    clicked: false,
    place: {}
  }

  componentWillMount = () => {
    this.setState({
      place: this.props.place
    })
  }

  componentDidMount = () => {
    this.fetchPlaceInfo()
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      place: nextProps.place
    })
  }

  componentDidUpdate = () => {
    this.fetchPlaceInfo()
  }

  fetchPlaceInfo = () => {
    var loc = new google.maps.LatLng(this.props.location.lat, this.props.location.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    })
    const service = new google.maps.places.PlacesService(map)
    service.getDetails({ placeId: this.state.place.place_id }, this.gatherUpResponses)
  }

  gatherUpResponses = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.storePlace(place)
    } else {
      console.error(`error fetching places ${status}`)
    }
  }

  storePlace = (place) => {
    this.setState({
      placeData: place
    })
    console.log('storing fetched placeData', place)
  }

  handleClick = (e) => {
    this.props.toggleBounce(this.props.place.vicinity)
  }

  render () {
    console.log('big jimmy', this.state.placeData)
    return (
      <Card
        link
        >
        <Card.Content onClick={this.handleClick}>
          <Card.Header>
            {this.props.place.name}<div></div><Icon size='small' name='search' />
          </Card.Header>
          <Card.Meta>
            {this.props.place.vicinity}
          </Card.Meta>
          <Card.Meta>
            <a href={this.state.placeData.website} target="_blank" >{this.state.placeData.website}</a>
          </Card.Meta>
        </Card.Content>
        <ModalCarousel placeData={this.state.placeData} location={this.props.location}/>
      </Card>
    )
  }
}
