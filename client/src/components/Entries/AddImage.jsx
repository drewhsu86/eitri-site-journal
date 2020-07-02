import React, { Component } from 'react'
import FileBase64 from 'react-file-base64'
import { addImage, imgurImage } from '../../services/apiCalls'

const IMGUR_BUTTON = 'Upload Using Imgur Or Image URL'
const IMGUR_LOADING = 'Uploading...'

export default class AddImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      imgFile: null,
      inputURL: '',
      errMsg: '',
      imgurBtn: IMGUR_BUTTON
    }
  }

  handleChange = (e, stateName) => {
    // sets e.target.value to whatever state is named
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleImgur = async (file) => {
    if (this.state.imgurBtn === IMGUR_BUTTON) {
      // change the button state and then api call 
      this.setState({
        imgurBtn: IMGUR_LOADING,
        imgFile: file 
      })
      try {
        const response = await imgurImage({
          base64: file.base64.split(',')[1],
          name: file.file.name 
        })

        console.log(response)

        const addResponse = await addImage(this.props.entryID, response.link)

        console.log(addResponse)

        this.setState({
          imgFile: null,
          errMsg: 'Imgur Upload Successful',
          imgurBtn: IMGUR_BUTTON,
          inputURL: ''
        })

        this.props.entryReset()
      } catch (error) {
        console.log(error.message)
        this.setState({
          imgFile: null,
          errMsg: error.message,
          imgurBtn: IMGUR_BUTTON
        })
      }
    }
  }

  handleAddImage = async () => {
    try {
      const response = await addImage(this.props.entryID, this.state.inputURL)

      console.log(response) 

    } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message
        })
      }
  }

  render() {
    return (
      <div className="AddImage">
        <h3>{this.state.imgurBtn}</h3>

        {
          this.state.errMsg ? <h4>{this.state.errMsg}</h4> : null 
        }

        <FileBase64
          multiple={false}
          onDone={this.handleImgur}
        />

        <label htmlFor="inputURL">Enter Or Edit Image URL</label>
        <input 
          type="text"
          value={this.state.inputURL}
          onChange={e => this.handleChange(e, 'inputURL')}
        />
        
        {
          this.state.inputURL ? <button onClick={this.handleAddImage}>Add Image URL To Entry</button> : null 
        }
      </div>
    )
  }
}
