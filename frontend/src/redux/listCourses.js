import * as types from './action_types'

const INITIAL_STATE = {
  templateInstances: [],
  instances: [],
  courses: [],
  selectedCourse: null,
  selectedInstance: null,
}

const listCoursesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.COURSELIST_GET_TEMPLATE_INSTANCES:
      return {
        ...state,
        templateInstances: action.response,
      }
    case types.COURSELIST_GET_COURSES:
      return {
        ...state,
        courses: action.response,
      }
    case types.COURSELIST_GET_INSTANCES:
      return {
        ...state,
        instances: action.response,
      }
    case types.COURSELIST_COURSE_SELECT:
      return {
        ...state,
        selectedCourse: state.courses.find((course) => course.id === action.id),
      }
    case types.COURSELIST_INSTANCE_SELECT:
      return {
        ...state,
        selectedInstance: state.instances.find((instance) => instance.id === action.id),
      }
    case types.COURSELIST_INSTANCE_CREATE:
      return {
        ...state,
        instances: [...state.instances, action.response.created],
        selectedInstance: action.response.created,
      }
    case types.COURSELIST_INSTANCE_EDIT:
      return {
        ...state,
        instances: state.instances.map((instance) =>
          instance.id === action.response.edited.id
            ? {
                ...instance,
                name: action.response.edited.name,
              }
            : instance
        ),
        selectedInstance:
          state.selectedInstance.id === action.response.edited.id
            ? {
                ...state.selectedInstance,
                name: action.response.edited.name,
              }
            : state.selectedInstance,
      }
    case types.COURSELIST_REGISTER:
      return {
        ...state,
        instances: state.instances.map((instance) => {
          if (instance.id === action.response.created.course_instance_id) {
            return {
              ...instance,
              registered: 'STUDENT',
            }
          }
          return instance
        }),
        selectedInstance: { ...state.selectedInstance, registered: 'STUDENT' },
      }
    case types.COURSELIST_UNREGISTER:
      return {
        ...state,
        instances: state.instances.map((instance) => {
          if (instance.id === action.response.deleted.course_instance_id) {
            return {
              ...instance,
              registered: null,
            }
          }
          return instance
        }),
        selectedInstance: { ...state.selectedInstance, registered: null },
      }
    case types.COURSE_CREATE:
      return {
        ...state,
        courses: [...state.courses, action.response.created],
        selectedCourse: action.response.created,
        instances: [],
        selectedInstance: null,
      }
    default:
      return state
  }
}

export default listCoursesReducer
