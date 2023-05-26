import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { thunks as usersThunk } from "../global/slices/usersSlice"
import Overlay from "../components/Overlay"

export default function Register () {

    const nav = useNavigate()
    const dispach = useDispatch()
    const { isLoading } = useSelector(state => state.users)
    const [form, setForm] = useState({ email : "", password : "", confirm : "" })
    const onFormChange = (e) => { setForm({...form, [e.target.name] : e.target.value }) }
    const submit = (e) => {
        e.preventDefault()
        const { confirm, ...rest } = form
        dispach(usersThunk.register(rest)).unwrap().then(() => nav("/"))
    }
    if (isLoading)return <Overlay text="Setting up you acount..."/>
    return (
        <div className="row text-white pt-5">
            <div className="col-12 col-lg-6 mx-auto">
                <form onSubmit={submit} className="mx-auto">
                    <h2 className="mb-4 text-center">Register</h2>
                    <div className="row gy-4">
                        <div className="col-12">
                            <label className="form-label">Email</label>
                            <input
                                onChange={onFormChange}
                                value={form.email}
                                name="email"
                                type="email"
                                className="form-control"
                                placeholder="john@gmail.com"
                            >
                            </input>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Password</label>
                            <input
                                onChange={onFormChange}
                                value={form.password}
                                name="password"
                                type="password"
                                className="form-control"
                                placeholder="*****"
                            >
                            </input>
                        </div>
                        <div className="col-12">
                            <label className="form-label">Confirm Password</label>
                            <input
                                onChange={onFormChange}
                                value={form.confirm}
                                name="confirm"
                                type="password"
                                className="form-control"
                                placeholder="*****"
                            >
                            </input>
                        </div>
                    </div>
                     <button
                        disabled={
                            form.password !== form.confirm ||
                            form.password.length < 5 || 
                            isLoading} 
                        type="submit"
                        className="w-100 btn btn-success mt-5">Submit</button>
                    <span onClick={() => nav("/login")}
                        className="text-success my-3 h6 d-block text-center pointer">
                        Already have an account? Login 
                    </span>
                </form>
            </div>
        </div>
    )
}