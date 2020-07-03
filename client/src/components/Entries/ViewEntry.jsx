import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getEntry, removeImage } from '../../services/apiCalls'
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

  handleRemoveImg = async (id, ind) => {
    try {
      await removeImage(id, ind)
      await this.initialize()
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
          <h1>Entry Notes</h1>

          <p>{entry.notes}</p>

          <h4>Project: {project.name}</h4>

          <h4>Entry Created: {entry.createdAt.slice(0,10)}</h4>
          
          {
            this.props.userID === project.user ? (
              <Link to={`/entries/${this.props.match.params.id}/editentry`}><button>Edit Entry</button></Link>
            ) : null 
          }
          
          {this.props.userID === project.user ? <div>
            <button onClick={this.toggleAddImg}>{!this.state.addImg ? 'Add An Image' : 'Hide Image Adder'}</button>
            {
              !this.state.addImg ? null : (
                <AddImage
                  entryID={this.props.match.params.id}
                  entryReset={this.initialize}
                />
              )
            } </div> : null 
          }

          <ul>
            {
              entry.images.map((image, ind) => {
                return (<li key={ind}>
                  <div className="ImageHolder">
                    <a href={image} target="_blank">
                    <img className="ImagePreview"
                      src={image} alt={`This is a link to an image.`} />
                    </a>
                    <button
                      className="ImageRemoveButton"
                      onClick={() => this.handleRemoveImg(this.props.match.params.id, ind)}
                    >
                      Delete Image?
                    </button>
                  </div>
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