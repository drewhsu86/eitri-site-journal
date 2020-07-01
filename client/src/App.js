import React, { Component } from 'react'
import './App.css'
import { Route, withRouter } from 'react-router-dom'
import { verifyuser } from './services/apiUsers'

import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Logout from './components/User/Logout'

class App extends Component {
  constructor() {
    super()

    // token will be stored in local storage 
    // but username should be stored in state 
    // to indicate if you are logged in 
    this.state = {
      username: null,
      userID: null 
    }
  }

  componentDidMount() {
    this.setUser()
  }

  setUser = async () => {
    try {
      const response = verifyuser()
      console.log(response)
      this.setState({
        username: response.username,
        userID: response.id 
      })
      return true 
    } catch (error) {
      console.log(error.message)
      return false
    }
  }

  logOut = async () => {
    try {
      localStorage.removeItem('token')
      this.setState({
        username: null,
        userID: null 
      })
      this.props.history.push('/')
    } catch (error) {
      console.log(error.message)
      return error
    }
  }

  render() {
    return (
      <div className="App">
        
        <nav>Nav Bar</nav>

        <Route path="/" exact>
          {this.state.username !== null && this.state.userID !== null ? <Logout logOut={this.logOut} /> : <Signin setUser={this.setUser} />}
        </Route>

        <Route path="/signup" exact>
          <Signup setUser={this.setUser} />
        </Route>

        <Route path="/dashboard">
          <h1>Dashboard</h1>
        </Route>

      </div>
    )
  }
}

export default withRouter(App)