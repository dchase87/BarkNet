import React from 'react'
import { Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import dog from '../assets/images/dogman.jpeg'

export default class HomeContainer extends React.Component {
  render () {
    return (
      <div>
        <p id='title-overlay'>BarkNet</p>
        <p id='text-overlay'>Use the Internet to Find Cool Walks for Your Dog</p>
        <Button id='button' as={NavLink} exact to='/map'>Get Started</Button>
      </div>
    )
  }
}
