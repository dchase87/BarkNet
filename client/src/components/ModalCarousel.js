import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import { Carousel } from 'react-responsive-carousel'
import '../carousel.css'

export default class ModalCarousel extends React.Component {

  // componentWillUnmount = () => {
  //
  // }

  createPhotoArray = () => {
    const photos = this.props.placeData.photos
      return photos.map(photo => {
        if (photos) {
          return (
            <div key={photo.html_attributions}>
              <img src={photo.getUrl({'maxWidth': photo.width, 'maxHeight': photo.height})} alt={this.props.name} />
              <p className="legend">{this.props.placeData.name}</p>
            </div>
          )
        }
      })
    }

    renderCarousel = () => {
      if (this.props.placeData.photos) {
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
      <Modal trigger={<Button>See Photos</Button>} size='mini'>
        <Modal.Header>{this.props.placeData.name}</Modal.Header>
        <Modal.Content>
          {this.renderCarousel()}
        </Modal.Content>
      </Modal>
    )
  }
}
