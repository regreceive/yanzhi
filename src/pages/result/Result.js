import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push, replace } from 'react-router-redux'

import { draw } from './roundRect'
import splash from './assets/chatu.png'
import tpl from './assets/bczpq.png'

import './Result.css'

const canvas = document.createElement('canvas')
canvas.setAttribute('width', '658')
canvas.setAttribute('height', '880')
let cxt

const tplImg = new Image()
const avatar = new Image()

function fillTPL() {
  return new Promise(resolve => {
    tplImg.onload = () => {
      cxt.fillStyle = 'rgba(255, 255, 255, 0)'
      cxt.drawImage(tplImg, 0, 0)
      let offset = drawText(sessionStorage.getItem('name') + '的颜值值', 70, 615, '#fff')
      offset = drawText(Math.floor(Math.random() * 9000) + 1000, offset, 615, '#0C1D55')
      drawText('ECHO', offset, 615, '#fff')
      resolve()
    }
  })
}

function drawText(text, x, y, color = '#333') {
  cxt.fillStyle = color
  cxt.font = '32px Arial'
  cxt.fillText(text, x, y)
  return cxt.measureText(text).width + x + 10
}

class Result extends Component {
  state = {
    waiting: true,
    hybrid: '',
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ waiting: false })
    }, 2000)

    cxt = canvas.getContext('2d')
    tplImg.src = ''
    fillTPL().then(() => {
      avatar.src = ''
      avatar.onload = () => {
        draw(cxt, avatar, 85, 75, 10)
        this.setState({ hybrid: canvas.toDataURL('image/png') })
      }
      if (!sessionStorage.getItem('avatar')) {
        this.props.back()
        return
      }
      avatar.src = sessionStorage.getItem('avatar')
    })
    tplImg.src = tpl
  }

  render() {
    const { waiting, hybrid } = this.state
    return (
      <div styleName="container">
        {waiting ? <Waiting /> : <Main hybrid={hybrid} changePage={this.props.changePage} back={this.props.back} />}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: () => push('/group'),
      back: () => replace('/home'),
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(Result)

function Waiting() {
  return (
    <div styleName="splash">
      <img src={splash} alt="" />
      <p>正在为您分析，请稍后...</p>
    </div>
  )
}

function Main({ hybrid, changePage, back }) {
  return (
    <div>
      <div styleName="tpl">
        <img src={hybrid} alt="" />
      </div>
      <div styleName="qun">
        <div styleName="row">
          <button styleName="back" onClick={back}>
            重新分析
          </button>
          <span styleName="text">长按保存图片</span>
        </div>
        <button styleName="btn" onClick={changePage} />
      </div>
    </div>
  )
}
