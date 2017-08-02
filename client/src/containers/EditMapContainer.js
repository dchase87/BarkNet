/* global google */
import React from 'react'
import { Card, Icon, Segment, Button, Header } from 'semantic-ui-react'
import GoogleDirectionsMap from '../components/GoogleMap'
import MarkersAdapter from '../adapters/MarkersAdapter'
import RouteDetails from '../components/RouteDetails'
import EditMap from '../components/EditMap'

export default class EditMapContainer extends React.Component {
  state = {
    events: {
      poo: false,
      pee: false
    },
    go: false
  }

  handlePoo = () => {
    this.setState({
      events: {
        poo: true,
        pee: false
      }
    })
  }

  handlePee = () => {
    this.setState({
      events: {
        pee: true,
        poo: false
      }
    })
  }

  handleGo = () => {
    this.setState({
      go: true
    })
  }

  handleStop = () => {
    this.setState({
      go: false
    })
  }

  render() {
    console.log(this.state.events.poo)
    return (
      <div>
        <EditMap
          containerElement={
            <div style={{ height: `500px` }} />
          }
          mapElement={
            <div style={{ height: `500px` }} />
          }
          zoom={14}
          center={new google.maps.LatLng(this.props.placeData.location.lat, this.props.placeData.location.long)}
          directions={this.props.directions}
          placeData={this.props.placeData}
          poo={this.state.events.poo}
          pee={this.state.events.pee}
          go={this.state.go}
        />
        <Segment padded>
          <RouteDetails directions={this.props.directions} />
          <Button id='buttons' onClick={this.handlePoo} color='brown'>Add a Poo</Button>
          <Button id='buttons' onClick={this.handlePee} color='yellow'>Add a Pee</Button>
          {!this.state.go ? <Button id='buttons' onClick={this.handleGo} color='green'>Go!</Button> :
          <Button id='buttons' onClick={this.handleStop} color='red'>Stop!</Button>}
        </Segment>
      </div>
    )
  }
}
