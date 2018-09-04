import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Toast from 'react-simple-toast'

import Crop from './Crop'
import { show, hide } from '../../modules/crop'
import spacer from './assets/spacer.png'
import './Upload.css'

const reader = new FileReader()

class Upload extends Component {
  state = {
    preview: '',
    dataURL: '',
  }

  componentDidMount() {
    reader.addEventListener('load', ({ target }) => {
      this.setState({ dataURL: target.result })
    })
  }

  handleFileChange = ({ target }) => {
    if (target.files.length > 0) {
      reader.readAsDataURL(target.files[0])
      this.props.showCropper()
      this.refs.file.value = ''
    }
  }

  handleCropped = preview => {
    this.setState({ preview })
    sessionStorage.setItem('avatar', preview)
    this.props.hideCropper()
  }

  handleSubmit = () => {
    if (this.state.preview === '') {
      Toast({
        type: 'fail',
        msg: '请上传图片',
      })
      return
    }

    if (this.refs.name.value === '') {
      Toast({
        type: 'fail',
        msg: '请填写姓名',
      })
      return
    }
    sessionStorage.setItem('name', this.refs.name.value)
    this.props.changePage()
  }

  render() {
    const { preview, dataURL } = this.state
    return (
      <main styleName="container">
        <div styleName="preview">
          <div styleName="photo">
            <label htmlFor="photo">
              <img src={preview} alt="" />
            </label>

            <input ref="file" type="file" id="photo" accept="image/*" onChange={this.handleFileChange} />
          </div>
          <input ref="name" maxLength="6" styleName="input" type="text" placeholder="请输入姓名" />
          <button styleName="button" onClick={this.handleSubmit} />
        </div>
        <Crop dataURL={dataURL} onCropped={this.handleCropped} />
      </main>
    )
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      showCropper: show,
      hideCropper: hide,
      changePage: () => push('/result'),
    },
    dispatch,
  )

export default connect(
  null,
  mapDispatchToProps,
)(Upload)
