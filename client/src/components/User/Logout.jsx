import React from 'react'

export default function Logout(props) {
  return (
    <div className="Page">
      <button onClick={props.logOut}>Logout</button>
    </div>
  )
}
