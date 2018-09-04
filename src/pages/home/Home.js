import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Image from 'react-bootstrap/lib/Image'

import biaoti from './assets/biaoti.png'
import qrc from './assets/qrc.jpg'
import touxiang from './assets/touxiang.png'
import './Home.css'

class Home extends Component {
  render() {
    const { changePage } = this.props
    return (
      <main styleName="container">
        <div styleName="title">
          <Image src={biaoti} responsive alt="" />
        </div>
        <div styleName="pc">
          <img src={touxiang} alt="" />
        </div>
        <div styleName="bottom-wrap">
          <div styleName="btn-wrap">
            <button onClick={() => changePage()} styleName="button" />
            <img src={qrc} styleName="qrc" alt="" />
          </div>
        </div>
      </main>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/upload'),
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(Home)
