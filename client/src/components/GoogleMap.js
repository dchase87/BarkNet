/* global google */
import {
  default as React,
  Component
} from 'react'

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
      const toggleBounce = () => {
        if (props.placeData === '') {
          return google.maps.Animation.DROP
        } else if (marker.location === props.placeData) {
          return google.maps.Animation.BOUNCE
        } else {
          return null
        }
      }

      return (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.long }}
          animation={toggleBounce()}
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


    {props.waypoints.length > 0 && <DirectionsRenderer directions={props.directions} draggable />}
  </GoogleMap>
))

export default GoogleDirectionsMap
