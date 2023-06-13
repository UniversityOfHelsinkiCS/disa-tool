import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { getUser } from '../api/persons'
// create slice

const initialState = createInitialState()

const fetchCurrentUser = createAsyncThunk(`/getUser`, async () => {
    const response = await getUser()
    return response.data
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload === '' ? {} : action.payload
            state.loading = false
        })
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.loading = false
        })
    },
})

function createInitialState() {
    return {
        user: {},
        loading: false,
    }
}

export const userActions = { ...userSlice.actions }
export const usersReducer = userSlice.reducer
