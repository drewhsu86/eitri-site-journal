import React, { Component } from 'react'
import FileBase64 from 'react-file-base64'
import axios from 'axios'

export default class Upload extends Component {
  constructor() {
    super()

    this.state = {
      file: null,
      errMsg: '',
      images: []
    }
  }

  setFile = (file) => {
    this.setState({
      file
    })
  }

  uploadFile = async () => {
    try {
      const file = this.state.file
      const base64 = file.base64.split(',')[1]
      const name = file.file.name

      const response = await axios.post("http://localhost:3000/api/imgur/upload", { base64, name })

      console.log(response)

      const images = this.state.images 
      images.push(response.data.link)
      this.setState({
        images
      })
    } catch (er) {
      this.setState({
        errMsg: er.message
      })
    }
  }

  render() {
    return (
      <div className="Upload">
        <FileBase64
          multiple={false}
          onDone={this.setFile}
        />
        {
          this.state.file === null ? null : <div>
            <button onClick={this.uploadFile}>Upload to Imgur</button>
            <span>{this.state.errMsg}</span>
            </div>
        }
        {
          <ul>
            {this.state.images.map(imageURL => {
              return <li><a href={imageURL} target="_blank">{imageURL}</a></li>
            })}
          </ul>
        }
      </div>
    )
  }
}
