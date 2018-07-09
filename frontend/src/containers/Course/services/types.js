export const removeType = (data) => {
  const response = {
    message: '<removeTypeSuccess>',
    data: {
      id: data.typeId
    }
  }
  const action = {
    type: 'TYPE_REMOVE',
    response
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 100, action)
  })
}

export const addType = (data) => {
  const response = {
    message: '<addTypeSuccess>',
    data: {
      ...data,
      id: 10
    }
  }
  const action = {
    type: 'TYPE_ADD_NEW',
    response
  }
  return new Promise((resolve) => {
    setTimeout(resolve, 100, action)
  })
}
