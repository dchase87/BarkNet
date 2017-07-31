/* global google */
import React from 'react'

import image from '../assets/images/paw_print.png'
import poop from '../assets/images/poop.png'
import pee from '../assets/images/pee.png'

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
    {props.directions && props.poo && <DrawingManager
      drawingMode= {google.maps.drawing.OverlayType.MARKER}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.TOP_CENTER,
          drawingModes: ['marker']
      },
        markerOptions: {
          icon: poop,
          animation: google.maps.Animation.DROP,
          draggable: true
        }
    }}
  />
  }
  {props.directions && props.pee && <DrawingManager
    drawingMode= {google.maps.drawing.OverlayType.MARKER}
    defaultOptions={{
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['marker']
    },
      markerOptions: {
        icon: pee,
        animation: google.maps.Animation.DROP,
        draggable: true
      }
  }}
/>
}

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
        switch(props.placeName) {
          case '':
            return google.maps.Animation.DROP
          case marker.name:
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


    {props.waypoints.length > 0 && <DirectionsRenderer directions={props.directions} draggable={true} />}
  </GoogleMap>
))

export default GoogleDirectionsMap
