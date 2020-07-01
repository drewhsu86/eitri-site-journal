import React, { Component } from 'react' 
import { withRouter, Link } from 'react-router-dom'
import { getProjects } from '../../services/apiCalls'

class Index extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null,
      projects: null,
      errMsg: ''
    }
  }

  async componentDidMount() {
    const userID = this.props.match.params.id
    if (userID) {
      try {
        const response = await getProjects(userID)
        this.setState({
          user: response,
          projects: response.projects 
        })
      } catch (error) {
        console.log(error.message)
        this.setState({
          errMsg: error.message 
        })
      }
    }
  }

  render() {
    if (this.state.projects) {
      return (
        <div className="Page">
          <h1> List of Projects </h1>
          { this.state.projects.length > 0 ? this.state.projects.map(projID => {
              return <Link to={`/projects/${projID}`}> Go to Project </Link>
            }) : <h3>You have no projects yet.</h3>
          }
        </div>
      )
    } else {
      return (
        <div className="Page">
          <h1>User not found</h1>
        </div>
      )
    }
  }
}

export default withRouter(Index)

