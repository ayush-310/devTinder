import axios from "axios";
import { BASE_URL } from './../utils/constants';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/ConnectionSlice";
import UserCard from "./UserCard";

const Connections = () => {

    const connections = useSelector((store) => store.connection);

    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {

            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });

            dispatch(addConnection(res.data.data))
            console.log(res.data.data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);


    if (!connections) return;

    if (connections.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="text-bold text-2xl" >No Connections Found</h1>
            </div>
        )
    }

    return (
        <div className="text-center my-10">
            <h1 className="text-bold text-2xl" >Connections</h1>


            {connections.map((connection) => {

                const { firstName, lastName, photoUrl, age, gender, about } = connection;


                return (
                    <div key={connection._id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
                        {/* <UserCard user={connection} /> */}
                        <div>
                            <img src={photoUrl}
                                alt="photo"
                                className="rounded-full h-20 w-20" />
                        </div>
                        <div className="text-left flex flex-col justify-center mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + ' ' + gender}</p>}
                            <p>{about}</p>
                        </div>
                    </div>
                )
            })}


        </div>
    )
}

export default Connections
