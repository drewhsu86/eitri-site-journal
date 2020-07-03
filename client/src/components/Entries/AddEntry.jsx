import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { createEntry } from '../../services/apiCalls'

class AddEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputNotes: '',
      errMsg: ''
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

    if (!this.state.inputNotes) {
      this.setState({
        errMsg: 'Entry name is required!'
      })
    } else {
      try {
        const response = await createEntry({
          notes: this.state.inputNotes,
          project: this.props.match.params.id 
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

  render() {
    return (
      <div className="Page">
        <section>
          <h1>Write a note for this entry</h1>
          <form className="UpdateForm" onSubmit={this.handleSubmit}>
          <label htmlFor="entryName">Entry Notes</label>
          <textarea value={this.state.inputNotes} onChange={e => this.handleChange(e, 'inputNotes')} name="entryName" />

          <button>Create Entry</button>
          </form>
        </section>
      </div>
    )
  }
}

export default withRouter(AddEntry)