import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Appointment = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "",
    age: "",
    gender: "",
    slot: "",
    contactNumber: "",
    email: "",
  });
  
    const [config, setConfig] = useState(null)

  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "Cardiologist",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      availableDates: ["Mon, June 5 - 10:00 AM", "Wed, June 7 - 2:30 PM", "Fri, June 9 - 4:00 PM"],
      fees: "₹120",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialization: "Neurologist",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      availableDates: ["Tue, June 6 - 9:00 AM", "Thu, June 8 - 11:30 AM", "Sat, June 10 - 3:00 PM"],
      fees: "₹150",
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      specialization: "Dermatologist",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      availableDates: ["Mon, June 5 - 1:00 PM", "Wed, June 7 - 10:00 AM", "Fri, June 9 - 11:00 AM"],
      fees: "₹90",
    },
    {
      id: 4,
      name: "Dr. Robert Williams",
      specialization: "Pediatrician",
      photo: "https://randomuser.me/api/portraits/men/75.jpg",
      availableDates: ["Tue, June 6 - 2:00 PM", "Thu, June 8 - 4:30 PM", "Sat, June 10 - 9:30 AM"],
      fees: "₹110",
    },
  ];

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      ...formData,
      slot: doctor.availableDates[0] // Set first available slot as default
    });
    setIsFormOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
useEffect(() => {
    const checkConfig = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const config = {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          };
          // console.log(config)
          setConfig(config)
        }
      } catch (error) {
        console.error(error)
        setConfig(null)
      }
    }

    checkConfig()
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Booking submitted:", { doctor: selectedDoctor, ...formData });
    if(config){

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/appointment/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              ...config.headers, // Include other headers like Authorization if needed
                  },
                }
              );
              
    setIsConfirmationOpen(true);

            } catch (error) {
              console.error(error)
              e.target.disabled = false
            }
          }
          else{
            console.log("please login first")
          }

        
    setIsFormOpen(false);
    // setIsConfirmationOpen(true);
  };

  return ( <>
    <NavBar/>
  
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Book an Appointment</h1>
          <p className="mt-3 text-xl text-gray-500">
            Select from our expert doctors and available time slots
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    className="h-16 w-16 rounded-full object-cover mr-4"
                    src={doctor.photo}
                    alt={doctor.name}
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${doctor.name.replace(/\s+/g, '+')}&background=random`;
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-blue-600">{doctor.specialization}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Available Slots</h4>
                  <ul className="space-y-2">
                    {doctor.availableDates.map((date, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {date}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-lg font-bold text-gray-900">{doctor.fees}</span>
                  <button 
                    onClick={() => handleBookNow(doctor)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Book Appointment with {selectedDoctor?.name}</h2>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
                      Patient Name
                    </label>
                    <input
                      type="text"
                      id="patientName"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        required
                        min="1"
                        max="120"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="slot" className="block text-sm font-medium text-gray-700">
                      Time Slot
                    </label>
                    <select
                      id="slot"
                      name="slot"
                      value={formData.slot}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {selectedDoctor?.availableDates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup */}
      {isConfirmationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-sm w-full">
            <div className="p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Booking Confirmed!</h3>
              <div className="mt-4 text-sm text-gray-500">
                <p>Your appointment with {selectedDoctor?.name} is confirmed for:</p>
                <p className="font-medium mt-1">{formData.slot}</p>
                <p className="mt-2">A confirmation has been sent to {formData.email}</p>
              </div>
              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => {
                    setIsConfirmationOpen(false);
                    setFormData({
                      patientName: "",
                      age: "",
                      gender: "",
                      slot: selectedDoctor?.availableDates[0] || "",
                      contactNumber: "",
                      email: "",
                    });
                  }}
                  className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Appointment;