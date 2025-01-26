import { Outlet, useNavigate } from "react-router"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userdata = useSelector((state) => state.user)


    const fetchUser = async () => {
        if (userdata) return;
        try {
            const res = await axios.get(BASE_URL + "/profile/view", {
                withCredentials: true
            });
            dispatch(addUser(res.data))

        } catch (error) {
            if (error.status === 401) {
                navigate("/login")
            }
            // console.log("Error fetching user: ", error)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    return (
        <div>
            <NavBar />
            {/* /* In JavaScript React, the `<Outlet />` component is used in React Router to render the
           child routes of the current route. It acts as a placeholder where the child routes will
           be rendered based on the route configuration defined in the parent component. This allows
           for nested routing in React applications. */ }
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body
