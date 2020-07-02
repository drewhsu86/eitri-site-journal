import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { signup } from '../../services/apiUsers'

export default class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputUsername: '',
      inputPassword: '',
      errMsg: ''
    }
  }

  // password needs at least 6 characters 
  // username and password each have a handleChange and are tied to the value of the input 

  handleChange = (e, stateName) => {
    // sets e.target.value to whatever state is named
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    // submit using the username and password in the form 

    // only allow submit if password is length 6 or greater 
    if (this.state.inputPassword.length >= 6 && this.state.inputUsername) {
      try {
        const response = await signup({
          username: this.state.inputUsername,
          password: this.state.inputPassword
        })

        console.log(response)

        // if token is successfully received, set the user data 
        await this.props.setUser()

        this.setState({
          username: '',
          password: ''
        })
      } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message 
        })
      }
    } else {
      this.setState({
        errMsg: 'Password needs to be at least 6 characters.'
      })
    }
  }

  render() {
    
      return (
        <div className="Signup">
          <form className="SignupForm" onSubmit={this.handleSubmit}>
            <h1>Register An Account</h1>
            {this.state.errMsg ? <p className="error">{this.state.errMsg}</p> : null}

            <label htmlFor="username">Username</label>
            <input type="text" value={this.state.inputUsername} onChange={e => this.handleChange(e, 'inputUsername')} name="uesrname" />

            <label htmlFor="password">Password</label>
            <input type="password" value={this.state.inputPassword} onChange={e => this.handleChange(e, 'inputPassword')} name="password" />

            <button> Submit </button>
          </form>
          <p>
            <Link to="/">Have an account? Log in here</Link>
          </p>
        </div>
      )
    
  }
}
