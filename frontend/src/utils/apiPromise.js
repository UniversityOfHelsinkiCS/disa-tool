export const defaultSuccess = 'APIPROMISE_GENERIC_SUCCESS'
export const defaultFailure = 'APIPROMISE_GENERIC_FAILURE'

const success = (resolve, action) => (response) =>
  resolve({
    ...action,
    response: response.data,
  })

const failure = (resolve, action) => (error) => {
  if (error.response) {
    return resolve({
      ...action,
      response: error.response.data,
    })
  } else if (error.request) {
    return resolve({
      ...action,
      response: error.request,
    })
  } else {
    return resolve({
      ...action,
      response: error.message,
    })
  }
}

const successToast = (resolve) => success(resolve, { type: defaultSuccess })

const failureToast = (resolve) => failure(resolve, { type: defaultFailure })

const apiPromise = (apiCall, param, actions = {}) =>
  new Promise((resolve) =>
    apiCall(param)
      .then(actions.success ? success(resolve, actions.success) : successToast(resolve))
      .catch(actions.failure ? failure(resolve, actions.failure) : failureToast(resolve))
  )

export default apiPromise
