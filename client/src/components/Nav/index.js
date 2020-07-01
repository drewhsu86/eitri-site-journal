import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Index extends Component {
  render() {
    const username = this.props.username

    return (
      <nav>
        <div className="navTop"></div>
        <div className="navBot">
          {!localStorage.getItem('token') ? <button onClick={() => this.props.history.push('/')}>Login</button> : <button onClick={this.props.logOut}>Logout</button>}
        </div>
      </nav>
    )
  }
}

export default withRouter(Index)