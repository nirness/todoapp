import axios from "axios";

export default function protectedRequest () {
    const user = JSON.parse(window.localStorage.getItem("user"))
    return axios.create({
        headers : {
            "Authorization" : `Bearer ${user?.token}`
        }
    })
}