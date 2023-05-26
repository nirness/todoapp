import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { actions as userActions } from "../global/slices/usersSlice"
import { actions as todoActions } from "../global/slices/todosSlice"



export default function LogoutButton () {
    const nav = useNavigate()
    const dispach = useDispatch()
    const { user } = useSelector(state => state.users)

    const logout = () => {
        dispach(userActions.logout())
        dispach(todoActions.clearTodos())
        nav("/login")
    }
    if (!user) return <></>
    return (
        <button 
        className="btn text-success fw-bolder"
        onClick={logout}
        title={`Logged in as ${user.email}`}
        >
            Logout
        </button>
    )
}