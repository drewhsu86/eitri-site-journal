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
    const removeConfirm = window.confirm('Really delete image? WARNING: PERMANENT!!!')
    if (removeConfirm) {
      try {
        await removeImage(id, ind)
        await this.initialize()
      } catch (error) {
        console.log(error.message)
      }
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

          <section>{entry.notes}</section>

          <h4>Project: {project.name}</h4>

          <h4>Entry Created: {entry.createdAt.slice(0,10)}</h4>
          
          <Link to={`/projects/${entry.project._id}`}>
            <button>Back To Project</button>
          </Link>

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

          <div className="imgGrid">
            {
              entry.images.map((image, ind) => {
                return (<div className="imgGridItem" key={ind}>
                  
                    <a href={image} target="_blank">
                    <img className="ImagePreview"
                      src={image} alt={`This is a link to an image.`} />
                  </a>
                  {this.props.userID === project.user ? 
                    <button
                      className="ImageRemoveButton"
                      onClick={() => this.handleRemoveImg(this.props.match.params.id, ind)}
                    >
                      Delete Image?
                    </button> : null 
                  }
                  
                </div>)
              })
            }
          </div>
        </div>
      )
    }
  }
}

export default withRouter(ViewEntry)