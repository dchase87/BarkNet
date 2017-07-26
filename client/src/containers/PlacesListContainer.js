/* global google */
import React from 'react'
import Place from '../components/Place'
import { Segment, Container, Header } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {
  state = {
    placeIds: [],
    places: []
  }

  // sendWaypoint = (placeData) => {
  //   this.props.passUpWaypoint(placeData)
  // }

  render () {
    return (
      <Segment padded>
        <Header dividing>
          Places:
        </Header>
        {this.props.places ? this.props.places.map((place, index) => {
          return <Place
            place={place}
            location={this.props.location}
            // addToRoute={this.sendWaypoint}
          />
        })
        : <h3>Enter an address to see cool dog spots!</h3>}
      </Segment>
    )
  }
}
