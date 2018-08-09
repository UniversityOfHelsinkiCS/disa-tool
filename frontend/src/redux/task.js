const INITIAL_STATE = {
  tasks: [],
  active: null
}

const detachObjectiveFromMany = (state, action) => {
  const deleteFrom = []
  action.response.deleted.task_ids.forEach((taskId) => {
    deleteFrom[taskId] = true
  })
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (deleteFrom[task.id]) {
        return {
          ...task,
          objectives: task.objectives.filter(objective => objective.id !== action.response.deleted.id)
        }
      }
      return task
    })
  }
}

const detachTypeFromMany = (state, action) => {
  const deleteFrom = []
  action.response.deleted.task_ids.forEach((taskId) => {
    deleteFrom[taskId] = true
  })
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      if (deleteFrom[task.id]) {
        return {
          ...task,
          types: task.types.filter(type => type !== action.response.deleted.id)
        }
      }
      return task
    })
  }
}

const detachManyObjectives = (state, action) => ({
  ...state,
  tasks: state.tasks.map((task) => {
    const deletionTask = action.response.deleted.tasks.find(delTask => delTask.id === task.id)
    if (!deletionTask) {
      return task
    }
    const toDelete = {}
    deletionTask.objective_ids.forEach((id) => {
      toDelete[id] = true
    })
    return {
      ...task,
      objectives: task.objectives.filter(objective => !toDelete[objective.id])
    }
  })
})

const detachOneObjective = (state, action) => ({
  ...state,
  tasks: state.tasks.map((task) => {
    if (task.id === action.response.deleted.task_id) {
      return {
        ...task,
        objectives: task.objectives.filter(objective => (
          objective.id !== action.response.deleted.objective_id
        ))
      }
    }
    return task
  })
})

const attachObjective = (state, action) => ({
  ...state,
  tasks: state.tasks.map((task) => {
    if (task.id === action.response.created.task_id) {
      return {
        ...task,
        objectives: [
          ...task.objectives,
          {
            id: action.response.created.objective_id,
            multiplier: 1
          }
        ]
      }
    }
    return task
  })
})

const detachOneType = (state, action) => ({
  ...state,
  tasks: state.tasks.map((task) => {
    if (task.id === action.response.deleted.task_id) {
      return {
        ...task,
        types: task.types.filter(type => (
          type !== action.response.deleted.type_id
        ))
      }
    }
    return task
  })
})

const attachType = (state, action) => ({
  ...state,
  tasks: state.tasks.map((task) => {
    if (task.id === action.response.created.task_id) {
      return {
        ...task,
        defaultMultiplier: action.response.created.multiplier,
        types: [
          ...task.types,
          action.response.created.type_id
        ]
      }
    }
    return task
  })
})

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'COURSE_GET_DATA':
      return {
        ...state,
        tasks: action.response.data.tasks
      }
    case 'TASK_CHANGE_ACTIVE':
      return {
        ...state,
        active: state.active === action.id ? null : action.id
      }
    case 'TASK_CREATE':
      return {
        ...state,
        tasks: [...state.tasks, action.response.created]
      }
    case 'TASK_DELETE':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.response.deleted.id)
      }
    case 'TASK_ATTACH_OBJECTIVE':
      return attachObjective(state, action)
    case 'TASK_DETACH_OBJECTIVE':
      return detachOneObjective(state, action)
    case 'TASK_ATTACH_TYPE':
      return attachType(state, action)
    case 'TASK_DETACH_TYPE':
      return detachOneType(state, action)
    case 'OBJECTIVE_DELETE':
      return detachObjectiveFromMany(state, action, 'objectives')
    case 'TYPE_DELETE':
      return detachTypeFromMany(state, action, 'types')
    case 'CATEGORY_DELETE':
      return detachManyObjectives(state, action)
    case 'LEVEL_DELETE':
      return detachManyObjectives(state, action)
    case 'TASK_EDIT':
      return {
        ...state,
        tasks: state.tasks.map(task => (task.id === action.response.edited.id ? {
          ...action.response.edited,
          types: task.types,
          objectives: task.objectives
        } : task))
      }
    default:
      return state
  }
}

export default taskReducer
