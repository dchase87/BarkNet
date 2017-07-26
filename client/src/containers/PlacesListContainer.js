/* global google */
import React from 'react'
import PlacesContainer from '../containers/PlacesContainer'
import { Segment, Container, Header } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {
  state = {
    placeIds: [],
    places: []
  }

  toggleBounce = (placeData) => {
    this.props.passUpPlaceData(placeData)
  }

  render () {
    return (
      <Segment padded raised>
        <Header dividing>
          Places:
        </Header>
        {this.props.places ? this.props.places.map((place, index) => {
          return <PlacesContainer
            place={place}
            location={this.props.location}
            toggleBounce={this.toggleBounce}
          />
        })
        : <h3>Enter an address to see cool dog spots!</h3>}
      </Segment>
    )
  }
}
