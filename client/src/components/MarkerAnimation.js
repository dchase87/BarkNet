/* global google */
import React from 'react'
import { Polyline } from 'react-google-maps'
import bulldog from '../assets/images/bulldog.svg'
import woof from '../assets/sounds/woof.mp3'

export default class MarkerAnimation extends React.Component {
  state = {
    offset: '100%',
    path: []
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {
    this.getPath(this.props.directions)
    console.log('hi', this.props.directions.routes)
    this.moveIcon()
    this.woof()
 }

 componentWillReceiveProps = (nextProps) => {
   this.getPath(nextProps.directions)
 }

 moveIcon = () => {
   var count = 0;
   var self = this
   var interval = setInterval(function() {
    count = (count + 1) % 200;

    self.setState({
      offset: (count / 2) + '%'
    })
  }, 40)
 }

 woof = () => {
   var audio = new Audio(woof)
   if (this.state.offset === '100%') {
     audio.play()
   }
 }

 getPath = (directions) => {
   const fullPath = []
  //  if (this.props.directions) {
     const legs = directions.routes[0].legs
     for (let i = 0; i < legs.length; i++) {
       const steps = legs[i].steps
       console.log('steps', steps)
       for (let j = 0; j < steps.length; j++) {
         const nextSegment = steps[j].path
         console.log('nextSegment', nextSegment)
         for (let k = 0; k < nextSegment.length; k++) {
           fullPath.push(nextSegment[k])
           console.log('step', nextSegment[k])
         }
       }
    //  }
     this.setState({
       path: fullPath
     })
   }
 }

  render () {
    return (
      <Polyline
        path={this.state.path}
        options={{
          icons: [{
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: 'white',
              fillOpacity: 1,
              strokeColor: 'saddleBrown',
              strokeWeight: 14
            },
            offset: this.state.offset
          }],
          geodesic: false,
          strokeOpacity: 1
          }}
      />
    )
  }
}
