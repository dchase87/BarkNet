/* global google */
import {
  default as React,
  Component,
} from "react"

import { Card, Icon, Segment, Button, Header } from 'semantic-ui-react'
import GoogleDirectionsMap from '../components/GoogleMap'
import MarkersAdapter from '../adapters/MarkersAdapter'
import RouteDetails from '../components/RouteDetails'
import { NavLink } from 'react-router-dom'

export default class MapContainer extends Component {

  state = {
    origin: new google.maps.LatLng(40.728087, -73.995669),
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
        this.props.sendDirections(result)
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
          // poo={this.state.events.poo}
          // pee={this.state.events.pee}
          // go={this.state.go}
        />
        {this.state.directions &&
          <Segment padded>
            <RouteDetails directions={this.state.directions} />
            <Button id='save-button' as={NavLink} exact to='/map/edit' color='green'>Save your route</Button>
          </Segment>
        }
      </div>
    )
  }
}
