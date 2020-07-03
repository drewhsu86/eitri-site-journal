import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { getEntry, updateEntry, deleteEntry } from '../../services/apiCalls'

const confirm = window.confirm 

class EditEntry extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inputNotes: '',
      projectID: '',
      errMsg: ''
    }
  }

  async componentDidMount() {
    try {
      const response = await getEntry(this.props.match.params.id)
      this.setState({
        inputNotes: response.notes,
        projectID: response.project._id 
      })
    } catch (error) {
      console.log(error.message)
      this.setState({
        errMsg: error.message 
      })
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
        const response = await updateEntry(this.props.match.params.id,{
          notes: this.state.inputNotes
        })

        this.props.history.push(`/entries/${this.props.match.params.id}`)
      } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message 
        })
      }
    }
  }

  handleDelete = async () => {
    const confirm1 = confirm('Do you want to delete this entry? WARNING: PERMANENT!!!')
    
    if (confirm1) {
      const confirm2 = confirm('FINAL WARNING: DELETION PERMANENT! PROCEED?!?')

      if (confirm2) {
        try {
          const response = await deleteEntry(this.props.match.params.id)

          console.log(response)

          this.props.history.push(`/projects/${this.state.projectID}`)
        } catch (error) {
          console.log(error.message) 
          this.setState({
            errMsg: error.message 
          })
        }
      }
    }
  }

  render() {
    return (
      <div className="Page">
        <h1>Edit the note for this entry</h1>
        <form className="UpdateForm" onSubmit={this.handleSubmit}>
          <label htmlFor="entryName">Entry Notes</label>
          <textarea value={this.state.inputNotes} onChange={e => this.handleChange(e, 'inputNotes')} name="entryName" />

          <button>Edit Entry</button>
        </form>

        <h1> Delete this entry? </h1>
        <button onClick={this.handleDelete}>Delete (PERMANENT)</button>
      </div>
    )
  }
}

export default withRouter(EditEntry)