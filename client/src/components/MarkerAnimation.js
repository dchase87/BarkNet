/* global google */
import React from 'react'
import { Polyline } from 'react-google-maps'

export default class MarkerAnimation extends React.Component {
  state = {
    offset: '100%',
    path: []
  }

  componentWillMount = () => {
    this.getPath(this.props.directions)
    console.log('hi', this.props.directions.routes)
  }

  componentDidMount = () => {
    this.moveIcon()
 }

 componentWillReceiveProps = (nextProps) => {
   this.getPath(nextProps.directions)
 }

 moveIcon = () => {
   var count = 0;
   var self = this
    setInterval(function() {
      count = (count + 1) % 200;

      self.setState({
        offset: (count / 2) + '%'
      })
  }, 20)
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
              scale: 8,
              strokeColor: '#393'
            },
            offset: this.state.offset
          }],
          geodesic: true,
          strokeOpacity: 1
          }}
      />
    )
  }
}
