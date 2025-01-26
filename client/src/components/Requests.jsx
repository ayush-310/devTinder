import axios from "axios";
import { BASE_URL } from "./../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/RequestSlice";
import { useEffect } from "react";

const Requests = () => {
    const requests = useSelector((store) => store.request);
    const dispatch = useDispatch();


    const reviewRequest = async (status, _id) => {
        try {

            const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, {
                withCredentials: true,
            });

            dispatch(removeRequests(_id));

        } catch (error) {
            console.error(error);

        }

    }


    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {
                withCredentials: true,
            });
            console.log("API Response:", res.data.data); // Debug log
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error(err + "Failed to fetch requests.");
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);



    if (!requests) return;

    if (requests.length === 0) {
        return (
            <div className="flex justify-center my-10">
                <h1 className="font-bold text-2xl">No Requests Found</h1>
            </div>
        );
    }

    return (
        <div className="text-center my-10">
            <h1 className="font-bold text-2xl">Requests</h1>

            {requests.map((request) => {
                const { firstName, lastName, photoUrl, age, gender, about } =
                    request.fromUserId;

                return (
                    <div
                        key={request._id}
                        className="flex justify-around m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto shadow-lg"
                    >
                        <div>
                            <img
                                src={photoUrl}
                                alt="photo"
                                className="rounded-full h-20 w-20"
                            />
                        </div>
                        <div className="text-left flex flex-col justify-center mx-4">
                            <h2 className="font-bold text-xl">
                                {firstName + " " + lastName}
                            </h2>
                            {age && gender && <p>{age + " " + gender}</p>}
                            <p>{about}</p>
                        </div>
                        <div className="flex  justify-center items-center">
                            <button
                                className="btn btn-primary mx-2"
                                onClick={() => reviewRequest("rejected", request._id)}>
                                Reject
                            </button>
                            <button
                                className="btn btn-secondary mx-2"
                                onClick={() => reviewRequest("accepted", request._id)}>
                                Accept
                            </button>
                        </div>


                    </div>
                );
            })}
        </div>
    );
};

export default Requests;
