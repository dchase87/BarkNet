import React from 'react'
import PlaceContainer from '../containers/PlaceContainer'
import { Segment, Header, Card } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {
  state = {
    places: []
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.places !== this.props.places) {
      this.setState({
        places: nextProps.places
      })
      console.log('receiving different props')
    }
  }

  toggleBounce = (placeData) => {
    this.props.passUpPlaceData(placeData)
  }

  render () {
    console.log('render places', this.state.places)
    return (
      <Segment padded raised>
        <Header dividing>
          Places:
        </Header>
        <Card.Group>
        {this.state.places ? this.state.places.map((place, index) => {
          return <PlaceContainer
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
