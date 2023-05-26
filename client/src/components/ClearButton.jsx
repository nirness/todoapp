import { useSelector, useDispatch } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"

export default function ClearButton () { 
    const dispatch = useDispatch()
    const { todos } = useSelector(state => state.todos)
    const clearTodos = () => {
        if(window.confirm("Delete All Todos?")) { dispatch(todosThunks.deleteAll()) }
    }
    if (todos.length === 0) return <></>
    return (
        <button 
        onClick={clearTodos}
        className="btn btn-outline-success rounded-1 text-light">
            Clear items
        </button>
            
    )
}