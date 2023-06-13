import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

const initialState = createInitialState()

const options = {
    error: {
        type: toast.TYPE.ERROR,
    },
    message: {
        type: toast.TYPE.SUCCESS,
    },
}

function createInitialState() {}

const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        toastCreated(state, action) {
            if (action.payload.toast) {
                return {
                    message: action.payload.toast,
                    options: options[action.payload.type],
                }
            }
            if (action.payload.data && action.payload.data.error) {
                return {
                    message: action.payload.data.error,
                    options: options.error,
                }
            } else if (action.payload.message) {
                return {
                    message: action.payload.message,
                    options: options.message,
                }
            }
        },
    },
})

export const userActions = { ...toastSlice.actions }
export const usersReducer = toastSlice.reducer
