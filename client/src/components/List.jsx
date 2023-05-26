import { useSelector, useDispatch } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"
import Icon from "./Icon"
import TodoText from "./TodoText"
import Empty from "./Empty"



export default function List () {

    const dispatch = useDispatch()
    const { isLoading, todos } = useSelector(state => state.todos)

    const funcs = {
        deleteTodo(todo) {
            if(window.confirm(`Delete "${todo.text}"?`)){ dispatch(todosThunks.deleteTodo(todo)) } 
        },
        updateTodoText(todo) {
            const text = window.prompt("Update Text:", todo.text)
            if (text) dispatch(todosThunks.updateTodo({ ...todo, text }))
        },
        updateTodoIsComplete(todo) {
            dispatch(todosThunks.updateTodo({ ...todo, isComplete : !todo.isComplete }))
        }
    }

    if ((todos.length === 0) && !isLoading) return <Empty/>
    return (
        <ul id="list" className="list-group rounded-0 pb-3">
            {todos.slice(0).reverse().map((todo) => (
                    <li 
                        key={todo._id}
                        className="list-group-item d-flex justify-content-between align-items-center">
                        <TodoText todo={todo} updateTodoIsComplete={() => funcs.updateTodoIsComplete(todo)}/>
                        <div>
                            <Icon 
                                onClick={() => funcs.updateTodoText(todo)} 
                                type="pencil-square"
                                color="warning"
                                classes={["me-3"]}
                            />
                            <Icon 
                                onClick={() => funcs.deleteTodo(todo)}
                                type="trash"
                                color="danger"
                            />
                        </div>
                </li>
            ))}
        </ul>
    )
}