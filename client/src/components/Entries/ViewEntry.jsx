import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getEntry } from '../../services/apiCalls'

class ViewEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: null 
    }
  }

  async componentDidMount() {
    try {
      const response = await getEntry(this.props.match.params.id)

      console.log(response)

      this.setState({
        entry: response 
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    const entry = this.state.entry 
    if (!entry) {
      return (
        <div className="Page">
          <h1>Entry not found!</h1>
        </div>
      )
    } else {
      const project = entry.project 
      return (
        <div className="Page">
          <h1>Project Site</h1>
          <h2>{project.name}</h2>
          <h4>Location: </h4> <p>{project.location ? project.location : 'Not given'}</p>
          {
            project.description ? <div><h4>Description</h4><p>{project.description}</p></div> : null  
          }

          { this.props.userID === project.user ? <Link to={`/projects/${this.props.match.params.id}/addentry`}><h2>Create An Entry</h2></Link> : null }

          <ul>
            {
              entry.images.map((image, ind) => {
                return (<li key={ind}>
                  <a href={image} target="_blank">
                    {image}
                  </a>
                </li>)
              })
            }
          </ul>
        </div>
      )
    }
  }
}

export default withRouter(ViewEntry)