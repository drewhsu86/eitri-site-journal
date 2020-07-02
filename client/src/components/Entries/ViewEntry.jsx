import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getEntry } from '../../services/apiCalls'
import AddImage from './AddImage'

class ViewEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      entry: null,
      addImg: false 
    }
  }

  componentDidMount() {
    this.initialize()
  }

  initialize = async () => {
    try {
      const response = await getEntry(this.props.match.params.id)

      this.setState({
        entry: response,
        addImg: false 
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  toggleAddImg = () => {
    const addImg = !this.state.addImg
    this.setState({
      addImg
    })
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
          <h1>Entry Notes</h1>

          <p>{entry.notes}</p>

          <h2>Project: {project.name}</h2>
          <h4>Location: </h4> <p>{project.location ? project.location : 'Not given'}</p>
          {
            project.description ? <div><h4>Description</h4><p>{project.description}</p></div> : null  
          }

          <button onClick={this.toggleAddImg}>{!this.state.addImg ? 'Add An Image' : 'Hide Image Adder'}</button>
          {
            !this.state.addImg ? null : (
              <AddImage
                entryID={this.props.match.params.id}
                entryReset={this.initialize}
              />
            )
          }

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