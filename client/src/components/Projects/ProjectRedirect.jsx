import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class ProjectRedirect extends Component {
  render() {
    return (
      <Redirect to={`/users/${this.props.userID}`} />
    )
  }
}
