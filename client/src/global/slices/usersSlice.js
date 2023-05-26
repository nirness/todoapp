import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import  axios from "axios"
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler"

export const thunks = {
    register: createAsyncThunk("users/register", async (form, thunkAPI) => (
        thunkPromiseHandler(axios.post("/api/users/register", form), thunkAPI)
    )),
    login: createAsyncThunk("users/login", async (form, thunkAPI) => (
        thunkPromiseHandler(axios.post("/api/users/login", form), thunkAPI)
    ))
}

export const { reducer, actions } = createSlice({
    name: "users", 
    initialState : {
        isLoading : false, 
        user : JSON.parse(window.localStorage.getItem("user"))
    },
    reducers : {
        logout(state) {
            state.user = null
            window.localStorage.clear()
        }
    },
    extraReducers({ addCase }) {
        helper.methods.forEach((n) => {
            addCase(thunks[n].pending, helper.registerAndLoginPending)
            addCase(thunks[n].fulfilled, helper.registerAndLoginFulfilled)
            addCase(thunks[n].rejected, helper.registerAndLoginRejected)
        })
    }
})

const helper = {
    methods : ["login", "register"],
    registerAndLoginPending (state) {
        state.isLoading = true
    },
    registerAndLoginFulfilled (state, { payload:user }) {
        state.isLoading = false
        state.user = user
        window.localStorage.setItem("user", JSON.stringify(user))
    },
    registerAndLoginRejected (state, { payload:errorMessage }) {
        state.isLoading = false
        alert(errorMessage || "Auth Rejected")
    },
}