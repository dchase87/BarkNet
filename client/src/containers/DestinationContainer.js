import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import ModalCarousel from '../components/ModalCarousel'

export default class DestinationContainer extends React.Component {
  render () {
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
