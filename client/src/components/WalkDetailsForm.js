import React from 'react'
import { Segment, Form, Header, Image } from 'semantic-ui-react'
import doge from '../assets/images/3dDoge.gif'

export default class WalkDetailsForm extends React.Component {
  state = {
    name: '',
    details: '',
    breed: '',
    phase: 0,
    personName: '',
    age: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    this.setState({
      phase: this.state.phase + 1,
      name: '',
      details: '',
      breed: '',
      personName: '',
      age: ''
    })
  }

  render () {
    return (
      <Segment padded raised>
        <Form onSubmit={this.handleSubmit}>
          {this.state.phase === 0 && <Form.Field>
            <Header>What is your dog's name?</Header>
            <input required placeholder='name' name='name' value={this.state.name} onChange={this.handleChange} />
          </Form.Field>}
          {this.state.phase === 1 && <Form.Field>
            <Header>Cool. What is your dog's breed?</Header>
            <input required placeholder='breed' name='breed' value={this.state.breed} onChange={this.handleChange} />
          </Form.Field>}
          {this.state.phase === 2 && <Form.Field>
            <Header>Almost done. What is your dog's age?</Header>
            <input required placeholder='age' name='age' value={this.state.age} onChange={this.handleChange} />
          </Form.Field>}
          {this.state.phase === 3 && <Form.Field>
            <Header>Last one. What is your name?</Header>
            <input required placeholder='human name' name='personName' value={this.state.personName} onChange={this.handleChange} />
          </Form.Field>}
          {this.state.phase === 4 && <Form.Field>
            <Header>Thank you! Now click this button.</Header>
          </Form.Field>}
          {this.state.phase < 5 ? <Form.Button content='Submit' color='black' />
          : <Image spaced id='doge' src={doge} />}
        </Form>
      </Segment>
    )
  }
}
