import React from 'react'
import PlacesContainer from '../containers/PlacesContainer'
import { Segment, Header, Card } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {
  state = {
    placeIds: [],
    places: []
  }

  toggleBounce = (placeName) => {
    this.props.passUpPlaceData(placeName)
  }

  render () {
    return (
      <Segment padded raised>
        <Header dividing>
          Places:
        </Header>
        <Card.Group>
        {this.props.places ? this.props.places.map((place, index) => {
          return <PlacesContainer
            key={index}
            place={place}
            location={this.props.location}
            toggleBounce={this.toggleBounce}
          />
        })
        : <h3>Enter an address to see cool dog spots!</h3>}
        </Card.Group>
      </Segment>
    )
  }
}
