/* global google */
import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel'
import PlaceDetailsAdapter from '../adapters/PlaceDetailsAdapter'
import '../carousel.css'

export default class ModalCarousel extends React.Component {
  state = {
    placeData: {}
  }
  // constructor(props){
  //   super(props)
  //   console.log(this.props, "hi from carosel")
  //   debugger
  // }
  // state = {
  //   photoArray: []
  // }


  handleClick = () => {
    PlaceDetailsAdapter.getPlaceDetails(this.props.place.place_id, this.props.location, this.gatherUpResponses)
  }

  // componentWillReceiveProps = (nextProps) => {
  //   PlaceDetailsAdapter.getPlaceDetails(nextProps.place.place_id, nextProps.location, this.gatherUpResponses)
  // }

  gatherUpResponses = (place, status) => {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      this.storePlace(place)
    } else {
      console.error(`error fetching places ${status}`)
    }
  }

  storePlace = (place) => {
    this.setState({
      placeData: place
    })
  }

  createPhotoArray = () => {
    const photos = this.state.placeData.photos
      return photos.map(photo => {
        if (photos) {
          return (
            <div key={photo.html_attributions}>
              <img src={photo.getUrl({'maxWidth': photo.width, 'maxHeight': photo.height})} alt={this.props.place.name} />
              <p className="legend">{this.state.placeData.name}</p>
            </div>
          )
        }
      })
    }

    renderCarousel = () => {
      if (this.state.placeData.photos) {
        return (
          <Carousel useKeyboardArrows infiniteLoop dynamicHeight swipeScrollTolerance={1} interval={3000} autoPlay showThumbs={false}>
            {this.createPhotoArray()}
          </Carousel>
        )
      } else {
        return (
          <Carousel showStatus={false} useKeyboardArrows infiniteLoop dynamicHeight swipeScrollTolerance={1} interval={3000} autoPlay showThumbs={false}>
            <div key='1'>
              <img src='http://janfennellthedoglistener.com/static/cms/ConfusedDog.png' alt='Confused Dog' />
              <p className="legend">Woof, there are no photos for this place. Sorry!</p>
            </div>
          </Carousel>
        )
      }
    }


  render () {
    return (
      <Modal trigger={<Button onClick={this.handleClick}>See Photos</Button>}>
        <Modal.Header>{this.props.place.name}</Modal.Header>
        <Modal.Content>
          {this.renderCarousel()}
        </Modal.Content>
      </Modal>
    )
  }
}
