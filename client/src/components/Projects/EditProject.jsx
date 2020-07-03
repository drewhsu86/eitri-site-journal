import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getProject, updateProject, deleteProject } from '../../services/apiCalls'

const confirm = window.confirm

class EditProject extends Component {
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
  async componentDidMount() {
    try {
      const response = await getProject(this.props.match.params.id)
      this.setState({
        inputName: response.name,
        inputLocation: response.location,
        inputDescription: response.description 
      })
    } catch (error) {
      console.log(error.message)
      this.setState({
        errMsg: error.message 
      })
    }
  }

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
        const response = await updateProject(this.props.match.params.id,{
          name: this.state.inputName,
          location: this.state.inputLocation,
          description: this.state.inputDescription 
        })

        this.props.history.push(`/projects/${this.props.match.params.id}`)
      } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message 
        })
      }
    }
  }

  handleDelete = async () => {
    const confirm1 = confirm('Do you want to delete this project? WARNING: PERMANENT!!!')
    
    if (confirm1) {
      const confirm2 = confirm('FINAL WARNING: DELETION PERMANENT! PROCEED?!?')

      if (confirm2) {
        try {
          const response = await deleteProject(this.props.match.params.id)

          console.log(response)

          this.props.history.push('/')
        } catch (error) {
          console.log(error.message) 
          this.setState({
            errMsg: error.message 
          })
        }
      }
    }
  }

  render() {
    return (
      <div className="Page">
        <section>
        <h1> Edit Project Info </h1>
        <form className="UpdateForm" onSubmit={this.handleSubmit}>
          <label htmlFor="projectName">Project Name</label>
          <input type="text" value={this.state.inputName} onChange={e => this.handleChange(e, 'inputName')} name="projectName" />

          <label htmlFor="location">Location</label>
          <input type="text" value={this.state.inputLocation} onChange={e => this.handleChange(e, 'inputLocation')} name="location" />

          <label htmlFor="description">Description</label>
          <textarea value={this.state.inputDescription} onChange={e => this.handleChange(e, 'inputDescription')} name="description" />

            <button>Submit</button>
            <Link to={`/projects/${this.props.match.params.id}`}><button>Cancel</button></Link>

        </form>
        </section>
          
        <section>
          <h1> Delete this project?</h1>
          <button className="deleteButton" onClick={this.handleDelete}>Delete (PERMANENT)</button>
        </section>
      </div>
    )
  }
}

export default withRouter(EditProject)