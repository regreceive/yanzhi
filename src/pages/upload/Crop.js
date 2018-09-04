import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import Cropper from 'react-cropper'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { hide } from '../../modules/crop'
import 'cropperjs/dist/cropper.css'
import s from './Upload.css'

class Crop extends Component {
  static propTypes = {
    onCropped: PropTypes.func.isRequired,
    dataURL: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
  }

  handleClose = () => {
    this.props.hide()
  }

  setCropperRef = ref => {
    this.cropper = ref
  }

  handleCrop = () => {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return
    }
    this.props.onCropped(
      this.cropper.getCroppedCanvas({ width: 484, height: 484, fillColor: 'rgb(0, 36, 95' }).toDataURL('image/jpeg'),
    )
  }

  render() {
    const { dataURL, show } = this.props
    return (
      <Modal show={show} onHide={this.handleClose}>
        <Modal.Header className={s.modalHeader}>
          <Button onClick={this.handleClose}>取消</Button>
          <Button onClick={this.handleCrop} bsStyle="primary">
            确认
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Cropper
            src={dataURL}
            dragMode="move"
            aspectRatio={1}
            guides={false}
            ref={this.setCropperRef}
            className={s['img-container']}
          />
        </Modal.Body>
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  show: state.crop.show,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      hide,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Crop)
