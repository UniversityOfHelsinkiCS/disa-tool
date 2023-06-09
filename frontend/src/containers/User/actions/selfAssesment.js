import apiPromise from '../../../utils/apiPromise'
import types from '../../../redux/action_types'
import { remove } from '../../../api/selfassesment'

// eslint-disable-next-line import/prefer-default-export
export const removeSelfAssesment = (id) => apiPromise(remove, id, {
  success: { type: types.SELF_ASSESMENT_DELETE },
})
