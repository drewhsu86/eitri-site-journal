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
          <h1>Project Site: {project.name}</h1>
  
          <h4>Location: {project.location ? project.location : 'Not given'}</h4> 
          {
            project.description ? <div><h4>Description</h4><section>{project.description}</section></div> : null  
          }

          <Link to={`/users/${project.user}`}>
            <button>Back To Projects List</button>
          </Link>

          {
          this.props.userID === project.user ? (
            <Link to={`/projects/${this.props.match.params.id}/editproject`}><button>Edit Project Info</button></Link>
            ) : null 
          }

          { this.props.userID === project.user ? <Link to={`/projects/${this.props.match.params.id}/addentry`}><button>Create An Entry</button></Link> : null }

          <ul>
            <li className="listTitle">Entries For {project.name} Site</li>
            {
              project.entries.map((entry, ind) => {
                return (<li key={ind}>
                  <Link to={`/entries/${entry._id}`}>
                    <div className="toEntry">
                      <p>{entry.notes}</p>
                      <p>Created At: {entry.createdAt.slice(0, 10)}</p>
                    </div>
                  </Link>
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
