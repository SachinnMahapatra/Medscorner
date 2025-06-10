import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Details = () => {
    const [details, setDetails] = useState({})
    const [showEditForm, setShowEditForm] = useState(false);
    const [username, setUsername] = useState("")
    const [isLoggedIn, setLoggedIn] = useState(false)
    // New state for address fields
    const [addressFields, setAddressFields] = useState({
        name: '',
        phone: '',
        street: '',
        city: '',
        postcode: ''
    });

    useEffect(() => {
        const checkLoggedInUser = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (token) {
                    const config = {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    };
                    const response = await axios.get("http://127.0.0.1:8000/api/users/details/", config)
                    setLoggedIn(true)
                    setDetails(response.data)
                    setUsername(response.data.username)
                    // Parse address into fields if possible
                    if (response.data.address) {
                        const addr = response.data.address;
                        const nameMatch = addr.match(/NAME: ([^P]*)/);
                        const phoneMatch = addr.match(/PHONE: ([^S]*)/);
                        const streetMatch = addr.match(/STREET: ([^C]*)/);
                        const cityMatch = addr.match(/CITY: ([^P]*)/);
                        const postcodeMatch = addr.match(/POSTCODE: (\d+)/);
                        setAddressFields({
                            name: nameMatch ? nameMatch[1].trim() : response.data.name || '',
                            phone: phoneMatch ? phoneMatch[1].trim() : response.data.number || '',
                            street: streetMatch ? streetMatch[1].trim() : '',
                            city: cityMatch ? cityMatch[1].trim() : '',
                            postcode: postcodeMatch ? postcodeMatch[1].trim() : ''
                        });
                    } else {
                        setAddressFields({
                            name: response.data.name || '',
                            phone: response.data.number || '',
                            street: '',
                            city: '',
                            postcode: ''
                        });
                    }
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
        try {
            const accessToken = localStorage.getItem('accessToken');
            // Combine address fields into the required format
            const combinedAddress = `NAME: ${addressFields.name} PHONE: ${addressFields.phone} STREET: ${addressFields.street} CITY: ${addressFields.city} POSTCODE: ${addressFields.postcode}`;
            // Example API call to update user details
            const response = await axios.put(
                'http://127.0.0.1:8000/api/users/details/',
                {
                    name: addressFields.name,
                    email: details.email,
                    phone: addressFields.phone,
                    address: combinedAddress,
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
                            <span className="font-medium">First Name:</span>
                            <p>{details.name || "First Name not Saved"}</p>
                        </div>
                        <div className="mb-4">
                            <span className="font-medium">Email Address:</span>
                            <p>{details.email}</p>
                        </div>
                        <div className="mb-4">
                            <span className="font-medium">Mobile Number:</span>
                            <p>{details.number || details.phone || "Number not Saved"}</p>
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
                                <label className="block text-sm font-medium">Name</label>
                                <input
                                    type="text"
                                    value={addressFields.name}
                                    onChange={(e) => setAddressFields({ ...addressFields, name: e.target.value })}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Phone</label>
                                <input
                                    type="text"
                                    value={addressFields.phone}
                                    onChange={(e) => setAddressFields({ ...addressFields, phone: e.target.value })}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Street</label>
                                <input
                                    type="text"
                                    value={addressFields.street}
                                    onChange={(e) => setAddressFields({ ...addressFields, street: e.target.value })}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">City</label>
                                <input
                                    type="text"
                                    value={addressFields.city}
                                    onChange={(e) => setAddressFields({ ...addressFields, city: e.target.value })}
                                    className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Postcode</label>
                                <input
                                    type="text"
                                    value={addressFields.postcode}
                                    onChange={(e) => setAddressFields({ ...addressFields, postcode: e.target.value })}
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
                            onClick={handleSaveDetails}
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