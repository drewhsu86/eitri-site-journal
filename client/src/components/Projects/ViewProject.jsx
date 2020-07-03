import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getProject } from '../../services/apiCalls'

class ViewProject extends Component {
  constructor(props) {
    super(props)

    this.state = {
      project: null 
    }
  }

  async componentDidMount() {
    try {
      const response = await getProject(this.props.match.params.id)

      this.setState({
        project: response 
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const project = this.state.project 
    if (!project) {
      return (
        <div className="Page">
          <h1>No Project Info Found</h1>
        </div>
      )
    } else {
      return (
        <div className="Page">
          <h1>Project Site</h1>
          <h2>{project.name}</h2>
          <h4>Location: </h4> <p>{project.location ? project.location : 'Not given'}</p>
          {
            project.description ? <div><h4>Description</h4><p>{project.description}</p></div> : null  
          }

{
          this.props.userID === project.user ? (
            <Link to={`/projects/${this.props.match.params.id}/editproject`}><button>Edit Project Info</button></Link>
            ) : null 
          }

          { this.props.userID === project.user ? <Link to={`/projects/${this.props.match.params.id}/addentry`}><button>Create An Entry</button></Link> : null }

          <ul>
            {
              project.entries.map((entry, ind) => {
                return (<li key={ind}>
                  <Link to={`/entries/${entry._id}`}>{entry.notes}</Link>
                </li>)
              })
            }
          </ul>
        </div>
      )
    }
  }
}

export default withRouter(ViewProject)
