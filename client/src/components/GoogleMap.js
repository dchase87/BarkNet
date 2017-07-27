/* global google */
import React from 'react'

import image from '../assets/images/paw_print.png'
import poop from '../assets/images/Poop-512.png'

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoWindow
} from 'react-google-maps'

import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager'

const GoogleDirectionsMap = withGoogleMap(props => (
  <GoogleMap
    zoom={props.zoom}
    center={props.center}
  >
    <DrawingManager
      drawingMode= {google.maps.drawing.OverlayType.MARKER}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['marker'],
          markerOptions: {icon: 'https://cdn0.iconfinder.com/data/icons/crime-and-protection-icons/110/Poop-512.png'}
      }
    }}
    />

    {props.center.lat() !== 40.728087 && <Marker
      position={{ lat: props.center.lat(), lng: props.center.lng() }}
      animation={google.maps.Animation.DROP}
    />}

    {props.markers.length > 0 && props.markers.map((marker, index) => {
      const onClick = () => props.onMarkerClick(marker)
      const onCloseClick = () => props.onCloseClick(marker)
      const onAddClick = () => props.onAddClick(marker)
      const onRemoveClick = () => props.onRemoveClick(marker)
      const toggleBounce = () => {
        switch(props.placeData) {
          case '':
            return google.maps.Animation.DROP
          case marker.location:
            return google.maps.Animation.BOUNCE
          default:
          return null
        }
      }

      return (
        <Marker
          key={index}
          position={{ lat: marker.lat, lng: marker.long }}
          animation={toggleBounce()}
          onClick={onClick}
          icon={image}
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
