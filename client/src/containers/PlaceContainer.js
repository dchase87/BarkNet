/* global google */
import React from 'react'
import ModalCarousel from '../components/ModalCarousel'
import { Card, Icon } from 'semantic-ui-react'
import PlaceDetailsAdapter from '../adapters/PlaceDetailsAdapter'

export default class PlaceContainer extends React.Component {
  state = {
    placeData: {},
    clicked: false,
  }

  // componentWillMount = () => {
  //   PlaceDetailsAdapter.getPlaceDetails(this.props.place.place_id, this.props.location, this.gatherUpResponses)
  // }
  //
  // componentWillReceiveProps = (nextProps) => {
  //   PlaceDetailsAdapter.getPlaceDetails(nextProps.place.place_id, nextProps.location, this.gatherUpResponses)
  // }
  //
  // gatherUpResponses = (place, status) => {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     this.storePlace(place)
  //   } else {
  //     console.error(`error fetching places ${status}`)
  //   }
  // }
  //
  // storePlace = (place) => {
  //   this.setState({
  //     placeData: place
  //   })
  //   console.log('resetting placdData')
  // }

  handleClick = (e) => {
    this.props.toggleBounce(this.props.place.name)
  }

  render () {
    console.log('render place container', this.props.place)
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
          {/* {this.state.placeData.website && <Card.Meta>
            <a href={this.state.placeData.website} target="_blank" ><Icon name='globe'/></a>
          </Card.Meta>} */}
        </Card.Content>
        <ModalCarousel place={this.props.place} location={this.props.location} />
      </Card>
    )
  }
}
