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
          {
            this.props.userID === this.props.match.params.id ? <section>
              <p>Welcome, {this.props.username}!</p>
              <p>
                Here, you can add project sites that you are working on. Then go to these project sites and add journal entries. You can even add images to your journal entries!
              </p>
            </section> : <section>
                <p>Welcome to {this.state.user.username}'s projects list!</p>
              <p>
                Here, you can see which projects this user is currently writing entries for and view them in the list below.
              </p>
            </section>
          }

          {
            this.props.userID === this.props.match.params.id ? <Link to="/addProject"><button>Add A Project</button></Link>: null 
          }
          
          <ul>
          <li className="listTitle">List Of {this.state.user.username}'s Project</li>
          { this.state.projects.length > 0 ? this.state.projects.map((proj, ind) => {
            return <li key={ind}><Link to={`/projects/${proj._id}`}>
              <div className="toProject">
                <h3>Go to Project: </h3>
                <h2>{proj.name}</h2>
              </div>
            </Link></li>
            }) : <h3>You have no projects yet.</h3>
            }
          </ul>
          
        </div>
      )
    } else {
      return (
        <div className="Page">
          <h1>User Info not found</h1>
        </div>
      )
    }
  }
}

export default withRouter(Index)

