import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import thunkPromiseHandler from "../../scripts/thunkPromiseHandler"
import protectedRequest from "../../scripts/protectedRequest"

export const thunks = {
    fetchTodos : createAsyncThunk("todos/fetchTodos", async (_, thunkAPI) => (
        thunkPromiseHandler(protectedRequest().get("/api/todos/me"), thunkAPI)
    )),
    createTodo : createAsyncThunk("todos/createTodo", async (todo, thunkAPI) => (
        thunkPromiseHandler(protectedRequest().post("/api/todos", todo), thunkAPI)
    )),
    updateTodo : createAsyncThunk("todos/updateTodo", async (todo, thunkAPI) => (
        thunkPromiseHandler(protectedRequest().put(`/api/todos/${todo._id}`, todo), thunkAPI)
    )),
    deleteTodo : createAsyncThunk("todos/deleteTodo", async (todo, thunkAPI) => (
        thunkPromiseHandler(protectedRequest().delete(`/api/todos/${todo._id}`), thunkAPI)
    )),
    deleteAll : createAsyncThunk("todos/deleteAll", async (_, thunkAPI) => (
        thunkPromiseHandler(protectedRequest().delete("/api/todos/me"), thunkAPI)
    )),
}

export const { reducer, actions } = createSlice({
    name: "todos", 
    initialState : {
        isLoading : false, 
        todos : [],
        numDispatches : 0
    },
    reducers : {
        clearTodos (state) {
            state.todos = []
            state.numDispatches = 0
        }
     },
    extraReducers({addCase}) {
        addCase(thunks.fetchTodos.pending, (state) => {
            state.isLoading = true
        })
        addCase(thunks.fetchTodos.fulfilled, (state, { payload:todos }) => {
            state.isLoading = false
            state.todos = todos
        })
        addCase(thunks.fetchTodos.rejected, (state, { payload:errorMessage}) => {
            state.isLoading = false
            alert(errorMessage)
        })
        //add cases to all the thunks except fetchtodos
        helper.methods.forEach((n) => {
            addCase(thunks[n].pending, helper.pending)
            addCase(thunks[n].fulfilled, helper.fulfilled)
            addCase(thunks[n].rejected, helper.rejected)
        })
    }
})

const helper = {
    methods : ["createTodo", "updateTodo", "deleteTodo", "deleteAll" ],
    pending (state) {
        state.isLoading = true
    },
    fulfilled (state) {
        state.numDispatches++
        state.isLoading = false
    },
    rejected (state, { payload:errorMessage }) {
        state.isLoading = false
        alert(errorMessage)
    }
}


