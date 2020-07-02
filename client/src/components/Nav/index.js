import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class Index extends Component {
  render() {
    const username = this.props.username

    return (
      <nav>
        <div className="navTop">
          <h1> Eitri Foundry - Site Journal </h1>
        </div>
        <div className="navMed">
          <Link to="/"><button>Home</button></Link>
        </div>
        <div className="navBot">
          {
            username ? `Welcome, ${username}!` : null
          }
          {!localStorage.getItem('token') ? <button onClick={() => this.props.history.push('/')}>Login</button> : <button onClick={this.props.logOut}>Logout</button>}
        </div>
      </nav>
    )
  }
}

export default withRouter(Index)