/* global google */
export default class MarkersAdapter {
  static getMarkers = (location, callback) => {
    var loc = new google.maps.LatLng(location.mapData.lat, location.mapData.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 13
    })
    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch({
      location: loc,
      radius: '1000',
      keyword: 'dog run park',
      type: 'park'
    }, callback)
  }
}
