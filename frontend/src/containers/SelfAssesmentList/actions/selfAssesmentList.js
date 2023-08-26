import * as types from '../../../redux/action_types'

export const selectResponse = (response, dispatch) => dispatch({
  type: types.SELF_ASSESMENT_LIST_SELECT_RESPONSE,
  selected: response
})

export const activateResponse = dispatch => response => dispatch({
  type: types.SELF_ASSESMENT_LIST_ACTIVATE_RESPONSE,
  activated: response
})

export const selectAll = dispatch => dispatch({
  type: types.SELF_ASSESMENT_LIST_SELECT_ALL
})

export const deselectAll = dispatch => () => dispatch({
  type: types.SELF_ASSESMENT_LIST_DESELECT_ALL
})

export const init =  ({ selfAssesmentId, selfAssesmentName, responses },dispatch) => dispatch({
  type: types.SELF_ASSESMENT_LIST_INIT,
  selfAssesmentId,
  selfAssesmentName,
  responses
})

export const regenerate = (newResponses,dispatch) => dispatch({
  type: types.SELF_ASSESMENT_LIST_REGENERATE,
  newResponses
})

export const reset = (dispatch) => dispatch({
  type: types.SELF_ASSESMENT_LIST_RESET
})
