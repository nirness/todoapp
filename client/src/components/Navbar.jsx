import { useSelector } from "react-redux"
import Spinner from "./Spinner"
import ClearButton from "./ClearButton"

export default function Navbar ({ title }) {
    const { isLoading } = useSelector(state => state.todos)
    return (
        <nav className="navbar bg-dark px-5 py-2 border-bottom">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <span className="navbar-brand text-white pointer me-0 fw-bold">
                        <a href="/" className="navbar-brand text-white pointer me-0 fw-bold">{ title }</a>
                    </span>
                </div>
                { isLoading ? <Spinner/> : <ClearButton/> }
            </div>
        </nav>
    )
}