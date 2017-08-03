import React from 'react'
import { Card, Segment, Icon, Header } from 'semantic-ui-react'
import DestinationContainer from './DestinationContainer'

export default class DestinationsListContainer extends React.Component {

  renderPlaces = () => {
    const destinations = this.props.places.filter(place => place.added === true)
    return destinations.map((place, index) => {
      return <DestinationContainer
        key={index}
        place={place}
        location={this.props.location}
        directions={this.props.directions}
      />
    })
  }

  render () {
    console.log('markers', this.props.places)
    return (
      <Segment padded raised>
        <Header>
          Your Dog Stops: <Icon size='tiny' name='arrow right' />
        </Header>
        <Card.Group>
          {this.renderPlaces()}
        </Card.Group>
      </Segment>
    )
  }
}
