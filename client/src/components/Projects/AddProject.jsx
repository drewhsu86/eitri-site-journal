import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createProject } from '../../services/apiCalls'

class AddProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputName: '',
      inputLocation: '',
      inputDescription: '',
      errMsg: ''
    }
  }

  // name required, location and description not required 

  handleChange = (e, stateName) => {
    // sets e.target.value to whatever state is named
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    if (!this.state.inputName) {
      this.setState({
        errMsg: 'Project name is required!'
      })
    } else {
      try {
        const response = await createProject({
          name: this.state.inputName,
          location: this.state.inputLocation,
          description: this.state.inputDescription 
        })

        this.props.history.push('/')
      } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message 
        })
      }
    }
  }

  render() {
    return (
      <div className="Page">
        <form className="UpdateForm" onSubmit={this.handleSubmit}>
          <label htmlFor="projectName">Project Name</label>
          <input type="text" value={this.state.inputName} onChange={e => this.handleChange(e, 'inputName')} name="projectName" />

          <label htmlFor="location">Location</label>
          <input type="text" value={this.state.inputLocation} onChange={e => this.handleChange(e, 'inputLocation')} name="location" />

          <label htmlFor="description">Description</label>
          <input type="text" value={this.state.inputDescription} onChange={e => this.handleChange(e, 'inputDescription')} name="description" />

          <div><button>Submit</button></div>
        </form>
      </div>
    )
  }
}

export default withRouter(AddProject)