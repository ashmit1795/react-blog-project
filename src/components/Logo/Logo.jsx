import React from 'react'
import logo from "../../assets/logo.png"

function Logo({width = "200px"}) {
  return (
    <img width={width} src={logo} alt="" />
  )
}

export default Logo;