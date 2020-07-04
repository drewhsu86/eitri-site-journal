import React from 'react'

export default function ToggleSwitch(props) {
  const isOn = props.isOn 
  const bordRad = props.bordRad || 10
  let divStyle = {
    display: 'inline-flex',
    justifyContent: (isOn ? 'flex-end' : 'flex-start'),
    alignItems: 'center',
    border: (isOn? '2px solid blue' : '2px solid grey'),
    borderRadius: `${bordRad}px`,
    width: `${4 * bordRad}px`,
    height: `${2 * bordRad}px`,
    backgroundColor: (isOn ? 'blue' : 'lightgrey')
  }

  let switchStyle = {
    width: `${2 * bordRad}px`,
    height: `${2 * bordRad}px`,
    borderRadius: `${bordRad}px`,
    backgroundColor: 'white'
  }

  return (
    <div style={divStyle} onClick={props.onClick}>
      <div style={switchStyle}></div>
    </div>
  )
}
