/* global google */
import React from 'react'
import image from '../assets/images/paw_print.png'
import poop from '../assets/images/poop.png'
import pee from '../assets/images/pee.png'
import MarkerAnimation from './MarkerAnimation'

import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker
} from 'react-google-maps'

import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager'

const EditMap = withGoogleMap(props => (
  <GoogleMap
    zoom={13}
    center={props.center}
    panControl={true}
  >
    {props.directions && props.poo && <DrawingManager
      drawingMode={google.maps.drawing.OverlayType.MARKER}
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
      drawingMode={google.maps.drawing.OverlayType.MARKER}
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

    {/* {props.center.lat() !== 40.728087 && !props.directions && <Marker
      position={{ lat: props.center.lat(), lng: props.center.lng() }}
      animation={google.maps.Animation.DROP}
    />} */}

    {props.directions && <DirectionsRenderer directions={props.directions} />}
    {props.directions && props.go && <MarkerAnimation directions={props.directions} />}
  </GoogleMap>
))

export default EditMap
