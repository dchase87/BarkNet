import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import PlacesListContainer from './PlacesListContainer'
import EditMapContainer from '../containers/EditMapContainer'
import WalkDetailsForm from '../components/WalkDetailsForm'

export default class EditPageContainer extends React.Component {
  render () {
    console.log(this.props.placeData)
    return (
      <Grid padded>
        <Grid.Column width={4}>
          <Grid.Row>
            <WalkDetailsForm />
          </Grid.Row>
            {/* <Grid.Row>
              {this.state.places.length > 0 &&
                <Container>
                  <PlacesListContainer
                    places={this.state.places}
                    location={this.state.location}
                    passUpPlaceData={this.passDownPlaceData}
                    showPlaces={this.state.showPlaces}
                  />
              </Container>}
              {this.state.error && this.renderErrorMessage()}
            </Grid.Row> */}
        </Grid.Column>
        <Grid.Column width={12}>
          <EditMapContainer placeData={this.props.placeData} directions={this.props.directions} />
        </Grid.Column>
      </Grid>
    )
  }
}
