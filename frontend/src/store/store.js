import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { api } from '../api/apiSlice'

import task from '../redux/task'
import level from '../redux/level'
import category from '../redux/category'
import type from '../redux/type'
import course from '../redux/course'
import selfAssesment from '../redux/selfAssesment'
import { userReducer } from '../redux/user'
import { userCoursesReducer } from '../redux/userCourses'
import { instanceReducer } from '../redux/instance'
import validation from '../redux/validation'
import listCourses from '../redux/listCourses'
import toast from '../redux/toast'
import grade from '../redux/grade'
import error from '../redux/error'
import admin from '../redux/admin'
import selfAssesmentList from '../redux/selfAssesmentList'
import { usersReducer } from './usersReducer'

const reducers = combineReducers({
    task,
    level,
    category,
    type,
    course,
    selfAssesment,
    user: userReducer,
    courses: userCoursesReducer,
    instance: instanceReducer,
    listCourses,
    toast,
    grade,
    error,
    admin,
    validation,
    selfAssesmentList,
})

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        const { toast } = state
        state = undefined
        state = { ...state, toast }
    }
    return reducers(state, action)
}

const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store
