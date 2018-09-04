import React, { Component } from 'react'

import qrc from './assets/qrc.png'
import './Group.css'

class Group extends Component {
  render() {
    return (
      <main styleName="container">
        <p styleName="title">ECHO交流群</p>
        <p styleName="qrc">
          <img src={qrc} alt="" />
        </p>
        <p styleName="agreement">该二维码7天内有效，重新进入将更新</p>
      </main>
    )
  }
}

export default Group
