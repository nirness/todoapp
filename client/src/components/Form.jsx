import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"

export default function Form () {
    const [text, setText] = useState("")
    const { isLoading } = useSelector(state => state.todos)
    const dispatch = useDispatch()

    const onClick = () => {
        dispatch(todosThunks.createTodo({ text, isComplete : false }))
            .unwrap().then(() => setText(""))
    }

    return (
        <form onClick={(e) => e.preventDefault()}>
            <div className="input-group mb-3">
                <input
                type="text"
                value = {text}
                onChange={(e) => setText(e.target.value)}
                className="form-control rounded-0"
                placeholder="What's on your mind?"
                disabled={isLoading && text.length > 0}
                />
                <button
                    onClick={onClick}
                    disabled={text.length === 0}
                    className="btn bg-success text-light rounded-0 fw-bold "
                >
                  Submit  
                </button>
            </div>
            <hr />
        </form>
    )
}