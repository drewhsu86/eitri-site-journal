import React, { Component } from 'react'
import { addImage, imgurImage } from '../../services/apiCalls'
import ToggleSwitch from './ToggleSwitch'

const IMGUR_BUTTON = 'Upload Using Imgur Or Image URL'
const IMGUR_LOADING = 'Uploading...'

export default class AddImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputURL: '',
      errMsg: '',
      imgurBtn: IMGUR_BUTTON,
      camFile: null,
      capture: false 
    }
  }

  handleChange = (e, stateName) => {
    // sets e.target.value to whatever state is named
    this.setState({
      [stateName]: e.target.value 
    })
  }

  handleToggleCapture = () => {
    const capture = !this.state.capture 
    this.setState({
      capture 
    })
  }

  // convert file to base64 
  // from: https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  handleImgur = async (e) => {
    if (this.state.imgurBtn === IMGUR_BUTTON) {
      // change the button state and then api call 
      this.setState({
        imgurBtn: IMGUR_LOADING 
      })
      try {
        const file = e.target.files[0]
        const fileBase64 = await this.toBase64(file)

        const response = await imgurImage({
          base64: fileBase64.split(',')[1],
          name: file.name 
        })

        console.log(response)

        const addResponse = await addImage(this.props.entryID, response.link)

        console.log(addResponse)

        this.setState({
          errMsg: 'Imgur Upload Successful',
          imgurBtn: IMGUR_BUTTON,
          inputURL: ''
        })

        this.props.entryReset()
      } catch (error) {
        console.log(error.message)
        this.setState({
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

      this.props.entryReset()
    } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message
        })
      }
  }

  render() {
    let captureOption = {}
    if (this.state.capture) {
      captureOption.capture = "camera"
    }
    return (
      <div className="AddImage">
        <section>
        <h3>{this.state.imgurBtn}</h3>

        {
          this.state.errMsg ? <h4>{this.state.errMsg}</h4> : null 
        }

        <label htmlFor="inputFile">From Files Or Camera</label>
        <div>
          <ToggleSwitch isOn={this.state.capture} onClick={this.handleToggleCapture} /> &nbsp;
          {this.state.capture ? 'From Camera' : 'From File'}
        </div>
         
        <br/>
        <input type="file" accept="image/*" {...captureOption} onChange={this.handleImgur} name="inputFile" />

        <br/>
        <label htmlFor="inputURL">Enter Or Edit Image URL</label>
        <input 
          type="text"
          value={this.state.inputURL}
          onChange={e => this.handleChange(e, 'inputURL')}
        />
        
        {
          this.state.inputURL ? <button onClick={this.handleAddImage}>Add Image URL To Entry</button> : null 
        }
        </section>
      </div>
    )
  }
}
