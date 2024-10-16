import React from 'react'

const Footer = () => {
  return <>
    <footer className='lg:p-20 mt-11 p-2 bg-stone-700 text-white'>
    <div className="top mt-9">
        <img src="./src/assets/logoWhite.svg" alt="" className='h-[55px] w-[144px] m-auto'/>
        <h1 className="m-auto my-9 text-center text-5xl max-w-[780px] leading-tight">Subscribe To Your Newsletter to Stay Updated About Discounts</h1>

        <label className="flex items-center w-fit m-auto input input-bordered rounded-full  border-2 px-2 py-1 mt-7 bg-stone-800 mb-28">
        <input type="email" className="inline max-w-72 w-[30vw] border-none bg-stone-800 " placeholder="Enter Your Email" />
        <img src="./src/assets/right.svg" alt="oo" className='inline bg-black rounded-full p-3' />
      </label>
    </div>





    <div className="container mx-auto  px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">PRODUCTS</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Prescription Medications</a>
              </li>
              <li>
                <a href="#">Over-the-Counter Medications</a>
              </li>
              <li>
                <a href="#">Vitamins & Supplements</a>
              </li>
              <li>
                <a href="#">Health & Wellness Products</a>
              </li>
              <li>
                <a href="#">Beauty & Personal Care</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">SERVICES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Pharmacy Services</a>
              </li>
              <li>
                <a href="#">Immunizations</a>
              </li>
              <li>
                <a href="#">Health Clinics</a>
              </li>
              <li>
                <a href="#">Medication Therapy Management</a>
              </li>
              <li>
                <a href="#">Transfer Prescriptions</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Health Tips & Advice</a>
              </li>
              <li>
                <a href="#">Medication Information</a>
              </li>
              <li>
                <a href="#">Disease Management</a>
              </li>
              <li>
                <a href="#">Healthy Living</a>
              </li>
              <li>
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">ABOUT US</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Our Mission</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Store Locator</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">LEGAL</h3>
            <ul className="space-y-2">
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Return Policy</a>
              </li>
              <li>
                <a href="#">Accessibility Statement</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm">
            Copyright 2023 MedsCorner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </>
}

export default Footer