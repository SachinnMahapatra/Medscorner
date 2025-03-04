import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Details = () => {
    const [details, setDetails] = useState({})
    const [showEditForm, setShowEditForm] = useState(false);
    const [username, setUsername] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                // console.log(token)
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    console.log("logged in")
                    const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
                    setLoggedIn(true)
                    setDetails(response.data)
                    console.log(response.data)
                    setUsername(response.data.username)
                }
                else {
                    setLoggedIn(false);
                    setUsername("");
                }
            }
            catch (error) {
                setLoggedIn(false);
                setUsername("");
            }
        };
        checkLoggedInUser()
    },[])



    const handleSaveDetails = async () => {
        console.log('Inside of handleSaveDetails')
        try {
            const accessToken = localStorage.getItem('accessToken');

            // Example API call to update user details
            const response = await axios.put(
                'http://127.0.0.1:8000/api/users/details/',
                {
                    name: details.name,
                    email: details.email,
                    phone: details.phone,
                    address: details.address,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            // Update state with the new data from API response
            const updatedDetails = response.data;
            setDetails({
                name: updatedDetails.name,
                email: updatedDetails.email,
                number: updatedDetails.phone,
                address: updatedDetails.address,
            });

            setShowEditForm(false); // Close the form after saving
            console.log('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update profile', error.response?.data || error.message);
        }
    };





    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
            {
                !showEditForm ? (
                    <div>
                        <div className="mb-4">
                            {/* {console.log('dwtal',details)} */}
                            <span className="font-medium">First Name:</span>
                            <p>{details.name || "First Name not Saved"}</p>
                        </div>
                        
                        <div className="mb-4">
                            <span className="font-medium">Email Address:</span>
                            <p>{details.email}</p>
                        </div>

                        <div className="mb-4">
                            <span className="font-medium">Mobile Number:</span>
                            <p>{details.number || "Number not Saved"}</p>
                        </div>

                        <div className="mb-4">
                            <span className="font-medium">Address:</span>
                            <p>{details.address || "Address not Saved"}</p>
                        </div>

                        <button
                            onClick={() => setShowEditForm(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mt-4"
                        >
                            Change Details
                        </button>
                    </div>
                )
                    :
                    (
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium">First Name</label>
                                    <input
                                        type="text"
                                        value={details.name || ''}
                                        onChange={(e) =>
                                            setDetails({ ...details, name: e.target.value })
                                        }
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                
                                
                                <div>
                                    <label className="block text-sm font-medium">Email Address</label>
                                    <input
                                        type="email"
                                        value={details.email || ''}
                                        onChange={(e) =>
                                            setDetails({ ...details, email: e.target.value })
                                        }
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium">Mobile Number</label>
                                    <input
                                        type="number"
                                        value={details.number || ''}
                                        onChange={(e) =>
                                            setDetails({ ...details, number: e.target.value })
                                        }
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium">Address</label>
                                    <textarea
                                        value={details.address || ''}
                                        onChange={(e) =>
                                            setDetails({ ...details, address: e.target.value })
                                        }
                                        className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setShowEditForm(false)}
                                className="px-4 py-2 bg-gray-300 text-black rounded-lg shadow hover:bg-gray-400 mt-4 mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleSaveDetails()} // Add your save handler logic here
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 mt-4"
                            >
                                Save Changes
                            </button>
                        </div>
                    )}
        </div>
    );

}

export default Details