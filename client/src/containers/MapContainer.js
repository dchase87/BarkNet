/* global google */
import {
  default as React,
  Component,
} from "react"

import { Card, Icon } from 'semantic-ui-react'

import GoogleDirectionsMap from '../components/GoogleMap'
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
    placeData: ''
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
        placeData: ''
      })
      this.fetchPlaces(nextProps)
    } else if (nextProps.placeData !== this.props.placeData) {
      this.setState({
        placeData: nextProps.placeData
      })
    }
}

  fetchPlaces = locationData => {
    var loc = new google.maps.LatLng(locationData.mapData.lat, locationData.mapData.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 13
    })
    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch({
      location: loc,
      radius: '1500',
      keyword: 'dog run park'
    }, this.setMarkers)
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
    console.log('adding waypoint', this.state.waypoints)
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
    console.log('removing waypoint', this.state.waypoints)
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
  //
  // shouldComponentUpdate = (nextProps) => {
  //   return nextProps.mapData.lat !== this.props.mapData.lat
  // }
  //
  // componentDidUpdate = ()

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
        console.log('hi', result)
        console.log(result.routes[0].legs[0].distance)
      } else {
        console.error(`error fetching directions ${result}`)
      }
  })
}

  render() {
    console.log('render', this.state.directions)
    console.log('placeData', this.state.placeData)
    console.log('marker', this.state.markers)
    return (
      <div>
        <GoogleDirectionsMap
          containerElement={
            <div  style={{ height: `500px` }} />
          }
          mapElement={
            <div id='dave' style={{ height: `500px` }} />
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
          placeData={this.state.placeData}
        />
        {this.state.directions &&
        <Card.Group itemsPerRow={2}>
          <Card fluid>
            <Icon size='large' name='paw'/>
            <Card.Header>{this.state.directions.routes[0].legs.map(leg => {
                return leg.distance.text.split(' ')[0] * 1}).reduce((acc, val) => acc + val)} Miles
            </Card.Header>
          </Card>
          <Card fluid>
            <Icon size='large' name='time' />
              <Card.Header>{this.state.directions.routes[0].legs.map(leg => {
                return leg.duration.text.split(' ')[0] * 1}).reduce((acc, val) => acc + val)} Minutes
            </Card.Header>
          </Card>
        </Card.Group>
        }
      </div>
    );
  }
}
