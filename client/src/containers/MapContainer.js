/* global google */
import {
  default as React,
  Component,
} from "react"

import { Card, Icon, Segment, Button } from 'semantic-ui-react'
import Poop from '../assets/images/Poop-512.png'
import GoogleDirectionsMap from '../components/GoogleMap'
import MarkersAdapter from '../adapters/MarkersAdapter'
/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class MapContainer extends Component {

  state = {
    origin: new google.maps.LatLng(40.728087, -73.995669), // NEED TO PASS IN START ADDRESS HERE THROUGH FORM
    waypoints: [],
    markers: [],
    destination: null,
    directions: null,
    zoom: 13,
    error: false,
    placeName: '',
    events: {
      poo: false,
      pee: false
    },
    go: false
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.mapData.lat !== this.props.mapData.lat) {
      this.setState({
        origin: new google.maps.LatLng(nextProps.mapData.lat, nextProps.mapData.long),
        destination: new google.maps.LatLng(nextProps.mapData.lat, nextProps.mapData.long),
        zoom: nextProps.mapData.zoom,
        markers: [],
        waypoints: [],
        directions: null,
        error: false,
        placeName: '',
        go: false
      })
      MarkersAdapter.getMarkers(nextProps, this.setMarkers)
    } else if (nextProps.placeName !== this.props.placeName) {
      this.setState({
        placeName: nextProps.placeName
      })
    }
}

  setMarkers = (results, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var markerList = results.map(result => {
          return {
            lat: result.geometry.viewport.f.f,
            long: result.geometry.viewport.b.f,
            name: result.name,
            location: result.vicinity,
            showInfo: false,
            added: false
          }
        })
        this.setState({
          markers: markerList
        })
    } else {
        this.setState({
          error: true
        })
      console.error(`error fetching places ${results}`)
    }
    this.sendPlaceData(results)
    console.log('here are results of place service fetch', results, status)
  }

  sendPlaceData = (placeData) => {
    this.props.passUpPlaces(placeData)
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true
          }
        } else {
          return {
          ...marker,
          showInfo: false
        }
        }
      })
    })
  }

  handleAddClick = (targetMarker) => {
    const waypoint = {
      location: new google.maps.LatLng(targetMarker.lat, targetMarker.long),
      stopover: true
    }
      this.setState({
        ...this.state,
        waypoints: [...this.state.waypoints, waypoint],
        markers: this.state.markers.map(marker => {
          if (marker === targetMarker) {
            return {
              ...marker,
              added: true
            }
          }
          return marker
        })
      })
    setTimeout(this.setDirections, 1000)
  }

  handleRemoveClick = (targetMarker) => {
    this.setState({
      ...this.state,
      waypoints: this.state.waypoints.filter(waypoint => {
        return waypoint.location.lat() !== targetMarker.lat
      }),
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            added: false
          }
        }
        return marker
      })
    })
    setTimeout(this.setDirections, 1000)
}

  handleCloseClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: false
          }
        }
        return marker
      })
    })
  }

  setDirections = () => {
    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route({
    origin: this.state.origin,
    destination: this.state.origin,
    waypoints: this.state.waypoints,
    travelMode: google.maps.TravelMode.WALKING,
    optimizeWaypoints: true
  }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result
          })
          console.log('directions result', result)
      } else {
        console.error(`error fetching directions ${result}`)
      }
    })
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

  getMinutes = () => {
    const totalMinutes = this.state.directions.routes[0].legs.map(leg => {
      return leg.duration.text.split(' ')[0] * 1})
      .reduce((acc, val) => acc + val)
    const minutes = totalMinutes % 60
    const hour = Math.floor(totalMinutes / 60)

    switch (true) {
      case (hour > 1 && minutes !== 0):
        return `${hour} Hours ${minutes} Minutes`
      case (hour > 1 && minutes === 1):
        return `${hour} Hours ${minutes} Minute`
      case (hour === 1 && minutes !== 0):
        return `${hour} Hour ${minutes} Minutes`
      case (hour === 1 && minutes === 1):
        return `${hour} Hour ${minutes} Minute`
      case (hour === 1 && minutes === 0):
        return `${hour} Hour`
      case (hour > 1 && minutes === 0):
        return `${hour} Hours`
      default:
        return `${totalMinutes} Minutes`
    }
  }

  getMiles = () => {
    return this.state.directions.routes[0].legs.map(leg => {
      return leg.distance.text.split(' ')[0] * 1})
      .reduce((acc, val) => acc + val).toFixed(1)
  }

  render() {
    console.log(this.state.events.poo)
    return (
      <div>
        <GoogleDirectionsMap
          containerElement={
            <div style={{ height: `500px` }} />
          }
          mapElement={
            <div style={{ height: `500px` }} />
          }
          zoom={this.state.zoom}
          center={this.state.origin}
          // onMarkerClick={}
          waypoints={this.state.waypoints}
          markers={this.state.markers}
          onMarkerClick={this.handleMarkerClick}
          onCloseClick={this.handleCloseClick}
          onAddClick={this.handleAddClick}
          onRemoveClick={this.handleRemoveClick}
          directions={this.state.directions}
          placeName={this.state.placeName}
          poo={this.state.events.poo}
          pee={this.state.events.pee}
          go={this.state.go}
        />
        {this.state.directions &&
          <Segment padded>
            <Card.Group itemsPerRow={2}>
              <Card raised fluid>
                <Icon size='large' name='paw'/>
                <Card.Header>
                  {this.getMiles()} Miles
                </Card.Header>
              </Card>
              <Card raised fluid>
                <Icon size='large' name='time' />
                  <Card.Header>
                    {this.getMinutes()}
                </Card.Header>
              </Card>
              <Button onClick={this.handlePoo} color='brown'>Add a Poo</Button>
              <Button onClick={this.handlePee} color='yellow'>Add a Pee</Button>
              {!this.state.go ? <Button onClick={this.handleGo} color='green'>Go!</Button> :
              <Button onClick={this.handleStop} color='red'>Stop!</Button>}
            </Card.Group>
          </Segment>
        }
      </div>
    );
  }
}
