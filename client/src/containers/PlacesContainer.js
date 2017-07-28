/* global google */
import React from 'react'
import ModalCarousel from '../components/ModalCarousel'
import { Card, Icon } from 'semantic-ui-react'
import PlaceDetailsAdapter from '../adapters/PlaceDetailsAdapter'

export default class PlacesContainer extends React.Component {
  state = {
    placeData: {},
    clicked: false,
  }

  componentDidMount = () => {
    PlaceDetailsAdapter.getPlaceDetails(this.props.place.place_id, this.props.location, this.gatherUpResponses)
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
  }

  handleClick = (e) => {
    this.props.toggleBounce(this.props.place.name)
  }

  render () {
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
        <ModalCarousel placeData={this.state.placeData} />
      </Card>
    )
  }
}
