import React from 'react'
import { Grid, Container } from 'semantic-ui-react'
import DestinationsListContainer from './DestinationsListContainer'
import EditMapContainer from '../containers/EditMapContainer'
import WalkDetailsForm from '../components/WalkDetailsForm'

export default class EditPageContainer extends React.Component {
  render () {
    console.log('edit directions', this.props.directions)
    console.log('edit placeData', this.props.placeData)
    console.log('markers received', this.props.markers)
    return (
      <Grid padded>
        <Grid.Column width={4}>
          <Grid.Row>
            <WalkDetailsForm />
          </Grid.Row>
            <Grid.Row>
              <Container>
                <DestinationsListContainer
                  places={this.props.markers}
                  location={this.props.placeData.location}
                  directions={this.props.directions}
                />
            </Container>
            </Grid.Row>
        </Grid.Column>
        <Grid.Column width={12}>
          <EditMapContainer placeData={this.props.placeData} directions={this.props.directions} />
        </Grid.Column>
      </Grid>
    )
  }
}
