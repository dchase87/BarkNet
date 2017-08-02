import React from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import doggo from '../assets/images/doggif.gif'

export default class NavBarContainer extends React.Component {

  render () {
    return (
      <Menu compact>
        <Menu.Item header as={NavLink} exact to='/'>
          <div className='title'>BarkNet</div>
          <Image spaced id='doggo' src={doggo} />
        </Menu.Item>
      </Menu>
    )
  }
}
