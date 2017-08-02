/* global google */
import React from 'react'
import ModalCarousel from '../components/ModalCarousel'
import { Card, Icon, Image } from 'semantic-ui-react'
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
          {this.props.place.photos &&
            <Image
              floated='right'
              size='tiny'
              src={this.props.place.photos[0].getUrl(
                {'maxWidth': this.props.place.photos[0].width,
                'maxHeight': this.props.place.photos[0].height})}
              />}
          <Card.Header>
            {this.props.place.name}
          </Card.Header>
          <Card.Meta>
            {this.props.place.vicinity}
          </Card.Meta>
        </Card.Content>
        {this.props.place.photos && <ModalCarousel place={this.props.place} location={this.props.location} />}
      </Card>
    )
  }
}
