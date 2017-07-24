/* global google */
import {
  default as React,
  Component,
} from "react"

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow
} from 'react-google-maps'

const GoogleDirectionsMap = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoom}
    center={props.center}
  >
    {props.center.lat() !== 40.728087 && <Marker
      position={{ lat: props.center.lat(), lng: props.center.lng()}}
      animation={google.maps.Animation.DROP}
    />}

    {props.markers.length > 0 && props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker)
      const onCloseClick = () => props.onCloseClick(marker)
      const onAddClick = () => props.onAddClick(marker)
      const onRemoveClick = () => props.onRemoveClick(marker)

      return (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.long }}
          animation={google.maps.Animation.DROP}
          onClick={onClick}
        >
          {marker.showInfo && (
            <InfoWindow onCloseClick={onCloseClick}>
              <div>
                <strong>{marker.name}</strong>
                <br />
                <p>{marker.location}</p>
                {!marker.added ? <button onClick={onAddClick}>Click Here to Add To Route!</button>
                : <button onClick={onRemoveClick}>Remove From Route</button>}
              </div>
            </InfoWindow>
            )}
          </Marker>
      )
    })}


    {props.waypoints.length > 0 && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
))

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class Map extends Component {

  state = {
    origin: new google.maps.LatLng(40.728087, -73.995669), // NEED TO PASS IN START ADDRESS HERE THROUGH FORM
    waypoints: [],
    markers: [],
    destination: null,
    directions: null,
    zoom: 13,
    error: false
  }

  componentWillReceiveProps = nextProps => {
    this.setState({
      origin: new google.maps.LatLng(nextProps.mapData.lat, nextProps.mapData.long),
      destination: new google.maps.LatLng(nextProps.mapData.lat, nextProps.mapData.long),
      zoom: nextProps.mapData.zoom,
      markers: [],
      directions: null,
      error: false
    })
    this.fetchPlaces(nextProps)
    console.log('receiving props')
  }

  fetchPlaces = locationData => {
    var loc = new google.maps.LatLng(locationData.mapData.lat, locationData.mapData.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    })
    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch({
      location: loc,
      radius: '500',
      keyword: 'dog'
    }, this.setMarkers)
    // this.setHomeMarker(map)
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
        console.log('setState: markers')
    } else {
        this.setState({
          error: true
        })
      console.error(`error fetching places ${results}`)
    }
  }

  handleMarkerClick = (targetMarker) => {
    this.setState({
      markers: this.state.markers.map(marker => {
        if (marker === targetMarker) {
          return {
            ...marker,
            showInfo: true
          }
        }
        return marker
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
  // componentShouldUpdate = (nextProps, nextState) => {
  //
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
        console.log(result)
        // console.log(result.routes[0].legs)
      } else {
        console.error(`error fetching directions ${result}`)
      }
  })
}

  render() {
    console.log('render', this.state.waypoints)
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
      />
      {this.state.error === true && <h3>No Cool Dog Stuff in this area :(</h3>}
      </div>
    );
  }
}
