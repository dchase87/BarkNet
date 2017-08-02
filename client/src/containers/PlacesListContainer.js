import React from 'react'
import PlaceContainer from '../containers/PlaceContainer'
import { Segment, Header, Card } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {

  toggleBounce = (placeName) => {
    this.props.passUpPlaceData(placeName)
  }

  renderPlaces = () => {
    return this.props.places.map((place, index) => {
      return <PlaceContainer
        key={index}
        place={place}
        location={this.props.location}
        toggleBounce={this.toggleBounce}
      />
    })
  }

  renderErrorMessage = () => {
    return (
      <Card link>
        <Card.Content>
          <Card.Header>
            Sorry, no dog parks found nearby. Try again!
          </Card.Header>
        </Card.Content>
      </Card>
    )
  }

  render () {
    console.log('places', this.props.places)
    return (
      <Segment padded raised>
        <Header>
          Here are Some Nearby Dog Parks:
        </Header>
        <Card.Group>
          {this.renderPlaces()}
        </Card.Group>
      </Segment>
    )
  }
}
