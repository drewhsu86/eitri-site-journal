import React, { Component } from 'react'
import './App.css'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { verifyuser } from './services/apiUsers'

import Nav from './components/Nav'
import Signup from './components/User/Signup'
import Signin from './components/User/Signin'
import Projects from './components/Projects'
import AddProject from './components/Projects/AddProject'
import ViewProject from './components/Projects/ViewProject'
import AddEntry from './components/Entries/AddEntry'
import ViewEntry from './components/Entries/ViewEntry'

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
          {this.state.username !== null && this.state.userID !== null ? <Redirect to={`/users/${this.state.userID}`} /> : <Signin setUser={this.setUser} />}
        </Route>

        <Route path="/signup" exact>
          <Signup setUser={this.setUser} />
        </Route>

        <Route path="/users/:id">
          <Projects userID={this.state.userID} />
        </Route>

        <Route path="/addproject">
          <AddProject />
        </Route>

        <Route path="/projects/:id" exact>
          <ViewProject userID={this.state.userID} />
        </Route>

        <Route path="/projects/:id/addentry" exact>
          <AddEntry userID={this.state.userID} />
        </Route>

        <Route path="/entries/:id" exact>
          <ViewEntry userID={this.state.userID} />
        </Route>

      </div>
    )
  }
}

export default withRouter(App)