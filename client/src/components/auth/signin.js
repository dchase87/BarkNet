import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import * as actions from '../../actions'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class Signin extends Component {
  //add the router object to this.context to allow for redirects
  static contextTypes = {
    router: PropTypes.object
  }
  componentWillUpdate(nextProps) {
    console.log("updating signin", nextProps, this.context)
    if (nextProps.authenticated) {
      this.context.router.history.push('/feature')
    }
  }
  handleFormSubmit ({ email, password }) {
    // action creator dispatching creditionals to validate on server
    this.props.signinUser({ email, password })
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render () {
    const { handleSubmit, fields: { email, password }} = this.props
    return (
      <div>
        <Link to='/'>Home</Link>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className='form-group'>
            <label>Email:</label>
            <input {...email} className='form-control' />
          </fieldset>
          <fieldset className='form-group'>
            <label>Password:</label>
            <input {...password} type='password' className='form-control' />
          </fieldset>
          {this.renderAlert()}
          <button action='submit' className='btn btn-primary'>Sign in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { errorMessage: state.auth.error, authenticated: state.auth.authenticated }
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin)
