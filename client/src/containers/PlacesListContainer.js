import React from 'react'
import Place from '../components/Place'
import { Segment, Container, Header } from 'semantic-ui-react'

export default class PlacesListContainer extends React.Component {
  render () {
    console.log('places-render', this.props.places)
    return (
      <div>
        <Container>
          <Header>
            Places:
          </Header>
          {this.props.places ? this.props.places.map((place, index) => {
            return <Place place={place} />
          })
          : <h3>Enter an address to see cool dog spots!</h3>}
        </Container>
      </div>
    )
  }
}
