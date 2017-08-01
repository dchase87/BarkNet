import React from 'react'
import { Menu, Container, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class NavBarContainer extends React.Component {

  render () {
    return (
      <Menu compact>
        <Menu.Item header as={NavLink} exact to='/'>
          <div className='title'>BarkNet</div>
        </Menu.Item>
      </Menu>
    )
  }
}
