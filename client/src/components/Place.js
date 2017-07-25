import React from 'react'
import { Segment } from 'semantic-ui-react'

export default class Place extends React.Component {
  render () {
    return (
      <Segment>{this.props.place.name}</Segment>
    )
  }
}
