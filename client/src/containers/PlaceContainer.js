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
        </Card.Content>
        <ModalCarousel place={this.props.place} location={this.props.location} />
      </Card>
    )
  }
}
