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

  render () {
    return (
      <Segment padded raised>
        <Header>
          Places:
        </Header>
        <Card.Group>
          {this.props.places ? this.renderPlaces() : <h3>Something Went Wrong! Refresh the page!</h3>}
        </Card.Group>
      </Segment>
    )
  }
}
