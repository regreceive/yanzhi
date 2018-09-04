export const SHOW_CROPPER = 'crop/SHOW'
export const HIDE_CROPPER = 'crop/HIDE'

const initialState = {
  show: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_CROPPER:
      return {
        show: true,
      }
    case HIDE_CROPPER:
      return {
        show: false,
      }
    default:
      return state
  }
}

export const show = () => {
  return dispatch => {
    dispatch({
      type: SHOW_CROPPER,
    })
  }
}

export const hide = () => {
  return dispatch => {
    dispatch({
      type: HIDE_CROPPER,
    })
  }
}
