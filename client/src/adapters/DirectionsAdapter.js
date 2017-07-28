/* global google */
export default class DirectionsAdapter {
  static getDirections = (location, callback) => {
    const DirectionsService = new google.maps.DirectionsService()

    DirectionsService.route({
      origin: this.state.origin,
      destination: this.state.origin,
      waypoints: this.state.waypoints,
      travelMode: google.maps.TravelMode.WALKING,
      optimizeWaypoints: true
    },
  }
