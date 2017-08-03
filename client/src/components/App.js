import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Signin from './auth/signin'
import Signout from './auth/signout'
import Signup from './auth/signup'
import Feature from './feature'
import RequireAuth from './auth/require_auth'
import Header from './header'
import MapPageContainer from '../containers/MapPageContainer'
import NavBarContainer from '../containers/NavBarContainer'
import HomeContainer from '../containers/HomeContainer'
import EditPageContainer from '../containers/EditPageContainer'


export default class App extends Component {
  state = {
    placeData: {},
    directions: {},
    markers: []
  }

  getState = (state) => {
    this.setState({
      placeData: state
    })
  }

  getDirections = (directions) => {
    this.setState({
      directions: directions
    })
  }

  getMarkers = (markers) => {
    this.setState({
      markers: markers
    })
  }

  render () {
    console.log('rickyjim', this.state.placeData)
    console.log('markers', this.state.markers)
    return (
      <Router>
        <div>
          <Route path='/' component={NavBarContainer} />
          <Route exact path='/' component={HomeContainer} />
          {/* <Route path='/' component={Header} />
          <Route path='/signin' component={Signin} />
          <Route path='/signout' component={Signout} />
          <Route path='/signup' component={Signup} />
          <Route path='/feature' component={RequireAuth(Feature)} /> */}
          <Route exact path='/map' render={() => <MapPageContainer sendMarkers={this.getMarkers} sendState={this.getState} sendDirections={this.getDirections} />} />
          <Route exact path='/map/edit' render={() => {
            return this.state.placeData.location ? <EditPageContainer placeData={this.state.placeData} directions={this.state.directions} markers={this.state.markers} /> : <Redirect to='/map' />
          }} />
        </div>
      </Router>
    )
  }
}
