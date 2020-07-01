import React, { Component } from 'react'
import './App.css'
import { Route, withRouter } from 'react-router-dom'
import { verifyuser } from './services/apiUsers'

import Nav from './components/Nav'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Projects from './components/Projects'
import ProjectRedirect from './components/Projects/ProjectRedirect'

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
      const response = await verifyuser()

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
        
        <Nav username={this.state.username} logOut={this.logOut} />

        <Route path="/" exact>
          {this.state.username !== null && this.state.userID !== null ? <ProjectRedirect userID={this.state.userID} /> : <Signin setUser={this.setUser} />}
        </Route>

        <Route path="/signup" exact>
          <Signup setUser={this.setUser} />
        </Route>

        <Route path="/users/:id">
          <Projects />
        </Route>

      </div>
    )
  }
}

export default withRouter(App)