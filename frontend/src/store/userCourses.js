import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUsersCourses } from '../api/courses'
// create slice

const initialState = createInitialState()

const fetchUserCourses = createAsyncThunk('/courses/user', async () => {
    const response = await getUsersCourses()
    return response.data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserCourses.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchUserCourses.fulfilled, (state, action) => {
            return state
        })
        builder.addCase(fetchUserCourses.rejected, (state) => {
            state.loading = false
        })
    },
})

dispatch({
    type: types.USER_GET_COURSES_ATTEMPT,
    payload: '',
})
try {
    const { data } = await getUsersCourses()
    dispatch({
        type: types.USER_GET_COURSES_SUCCESS,
        payload: data,
    })
} catch (e) {
    dispatch({
        type: types.USER_GET_COURSES_FAILURE,
        payload: e.response,
    })
}

function createInitialState() {
    return {
        user: {},
        loading: false,
    }
}

export const userActions = { ...userSlice.actions }
export const usersReducer = userSlice.reducer
