/* global google */
export default class PlaceDetailsAdapter {
  static getPlaceDetails = (placeId, location, callback) => {
    var loc = new google.maps.LatLng(location.lat, location.long)
    var map = new google.maps.Map(document.getElementById('map'), {
      center: loc,
      zoom: 15
    })
    const service = new google.maps.places.PlacesService(map)
    service.getDetails({ placeId: placeId }, callback)
  }
}
