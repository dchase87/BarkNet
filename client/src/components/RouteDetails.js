import React from 'react'
import { Segment, Card, Icon, Header, Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class RouteDetails extends React.Component {
  getMinutes = () => {
    const totalMinutes = this.props.directions.routes[0].legs.map(leg => {
      return leg.duration.text.split(' ')[0] * 1})
      .reduce((acc, val) => acc + val)
    const minutes = totalMinutes % 60
    const hour = Math.floor(totalMinutes / 60)

    switch (true) {
      case (hour > 1 && minutes !== 0):
        return `${hour} Hours ${minutes} Minutes`
      case (hour > 1 && minutes === 1):
        return `${hour} Hours ${minutes} Minute`
      case (hour === 1 && minutes !== 0):
        return `${hour} Hour ${minutes} Minutes`
      case (hour === 1 && minutes === 1):
        return `${hour} Hour ${minutes} Minute`
      case (hour === 1 && minutes === 0):
        return `${hour} Hour`
      case (hour > 1 && minutes === 0):
        return `${hour} Hours`
      case (totalMinutes < 60):
        return `${totalMinutes} Minutes`
    }
  }

  getMiles = () => {
    return this.props.directions.routes[0].legs.map(leg => {
      return leg.distance.text.split(' ')[0] * 1})
      .reduce((acc, val) => acc + val).toFixed(1)
  }

  render () {
    return (
      <Card.Group itemsPerRow={2}>
        <Card raised fluid>
          <Icon size='large' name='paw'/>
          <Card.Header>
            {this.getMiles()} Miles
          </Card.Header>
        </Card>
        <Card raised fluid>
          <Icon size='large' name='time' />
            <Card.Header>
              {this.getMinutes()}
          </Card.Header>
        </Card>
      </Card.Group>
    )
  }
}
