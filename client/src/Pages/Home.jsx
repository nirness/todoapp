import { useEffect } from "react"
import Form from "../components/Form"
import List from "../components/List"
import { useDispatch, useSelector } from "react-redux"
import { thunks as todosThunks } from "../global/slices/todosSlice"

export default function Home () {
    const dispatch = useDispatch()
    const {numDispatches} = useSelector(state => state.todos)
    useEffect(() => { dispatch(todosThunks.fetchTodos()) }, [dispatch, numDispatches])

    return (
        <div className="row">
            <div className="col-12 col-lg-8 col-xl-6 mx-auto mt-5 p-5 border border-secondery rounded">
                <Form/>
                <List/>
            </div>
        </div>
    )
}