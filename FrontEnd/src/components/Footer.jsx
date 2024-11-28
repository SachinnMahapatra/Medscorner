import React from 'react'

const Footer = () => {
  return <>
    <footer className='lg:p-20 mt-11 p-2 bg-stone-700 text-white'>
      <div className="top mt-9">
        <svg className='h-[55px] w-[144px] m-auto' width="55" height="21" viewBox="0 0 55 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2_24927)">
            <path d="M12.9603 0C10.828 0 8.78311 0.847035 7.27538 2.35477L2.35477 7.27538C0.847035 8.78311 0 10.828 0 12.9603C0 17.4005 3.5995 21 8.03971 21C10.172 21 12.2169 20.1529 13.7246 18.6452L17.1282 15.2416C17.1282 15.2415 17.1283 15.2417 17.1282 15.2416L27.0452 5.32462C27.7653 4.60454 28.7419 4.2 29.7603 4.2C31.4652 4.2 32.9106 5.31119 33.4118 6.84885L36.5415 3.71907C35.1138 1.48284 32.6102 0 29.7603 0C27.628 0 25.5831 0.847035 24.0754 2.35477L10.7548 15.6754C10.0347 16.3955 9.05807 16.8 8.03971 16.8C5.91909 16.8 4.2 15.0809 4.2 12.9603C4.2 11.9419 4.60454 10.9653 5.32462 10.2452L10.2452 5.32462C10.9653 4.60454 11.9419 4.2 12.9603 4.2C14.6653 4.2 16.1106 5.31124 16.6118 6.84895L19.7416 3.71915C18.3138 1.48288 15.8103 0 12.9603 0Z" fill="white" />
            <path d="M27.5566 15.6754C26.8365 16.3955 25.8599 16.8 24.8415 16.8C23.1368 16.8 21.6915 15.6891 21.1902 14.1517L18.0605 17.2814C19.4884 19.5173 21.9918 21 24.8415 21C26.9738 21 29.0187 20.1529 30.5264 18.6452L43.847 5.32462C44.5671 4.60454 45.5437 4.2 46.5621 4.2C48.6827 4.2 50.4018 5.91909 50.4018 8.03971C50.4018 9.05807 49.9973 10.0347 49.2772 10.7548L44.3566 15.6754C43.6365 16.3955 42.6599 16.8 41.6415 16.8C39.9367 16.8 38.4913 15.6889 37.9901 14.1513L34.8604 17.2811C36.2882 19.5173 38.7917 21 41.6415 21C43.7738 21 45.8187 20.1529 47.3264 18.6452L52.247 13.7246C53.7547 12.2169 54.6018 10.172 54.6018 8.03971C54.6018 3.5995 51.0023 0 46.5621 0C44.4298 0 42.3849 0.847035 40.8772 2.35477L27.5566 15.6754Z" fill="white" />
          </g>
          <defs>
            <clipPath id="clip0_2_24927">
              <rect width="54.6" height="21" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <h1 className="m-auto my-9 text-center text-5xl max-w-[780px] leading-tight">Subscribe To Your Newsletter to Stay Updated About Discounts</h1>

        <label className="flex items-center w-fit m-auto input input-bordered rounded-full  border-2 px-2 py-1 mt-7 bg-stone-800 mb-28">
          <input type="email" className="inline max-w-72 w-[30vw] border-none bg-stone-800 " placeholder="Enter Your Email" />
          <svg className='inline bg-black rounded-full p-3' width="50" height="50" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2_24472)">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.22013 19.5455C7.78079 19.1062 7.78079 18.3938 8.22013 17.9545L14.1746 12L8.22013 6.04549C7.78079 5.60616 7.78079 4.89384 8.22013 4.45451C8.65947 4.01517 9.37178 4.01517 9.81112 4.45451L16.5611 11.2045C17.0005 11.6438 17.0005 12.3562 16.5611 12.7955L9.81112 19.5455C9.37178 19.9848 8.65947 19.9848 8.22013 19.5455Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_2_24472">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
              </clipPath>
            </defs>
          </svg>


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