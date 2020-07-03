import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import eitriLogo from '../../images/eitriLogo.png'


class Index extends Component {
  render() {
    const username = this.props.username

    return (
      <nav>
        <div className="navTop">
          <img className="eitriLogo" src={eitriLogo} alt="Eitri Logo" /> <h1 className="navTitle"> Eitri Foundry - Site Journal </h1>
        </div>

        <div className="navBot">
          <Link to="/"><button>Home</button></Link>
          <span style={{display: 'flex', alignItems: 'center'}}>
            {
            username ? `Welcome, ${username}!` : null
            }
            {!localStorage.getItem('token') ? <button onClick={() => this.props.history.push('/')}>Login</button> : <button onClick={this.props.logOut}>Logout</button>}
          </span>
        </div>
      </nav>
    )
  }
}

export default withRouter(Index)