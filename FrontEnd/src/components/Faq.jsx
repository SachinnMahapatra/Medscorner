import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';


const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const questions = [
        {
            question: 'What is your return policy?',
            answer:
                'At MedsCorner, we want to ensure that you are completely satisfied with your purchase. If for any reason you are not satisfied, you can return your order within 14 days of delivery for a full refund. Please see our full return policy for details.',
        },
        {
            question: 'How do I track my order?',
            answer:
                "Once your order has shipped, you will receive an email with tracking information. You can use this to track the status of your order on the shipping carrier's website. If you have any questions or concerns about your order, please contact our customer service team.",
        },
        {
            question: 'How do I contact customer service?',
            answer:
                "Our customer service team is available to assist you Monday through Friday, 9am to 5pm EST. You can reach us by phone at [phone number], by email at [email address], or through our website's contact form.",
        },
        {
            question: 'Is it safe to order medication online?',
            answer:
                'Yes, it is safe to order medication online from MedsCorner. We are a licensed pharmacy and follow all applicable laws and regulations. We use secure encryption to protect your personal and payment information, and we only dispense medication from licensed pharmacists.',
        },
    ];


    return <>
        <div className="bg-white rounded-lg shadow-lg md:flex p-2 lg:p-20 md:justify-between h-[410px]">

            <div className="left md:w-[40vw]">
                <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                <NavLink to="/Contact">

                <button className="bg-black text-white px-4 py-2 rounded-md font-medium mb-4">
                    Ask A Question <img src="./src/assets/right.svg" alt=">" className='inline' />
                </button>
                </NavLink>
            </div>

            <div className='md:w-[50vw]'>
                {questions.map((question, index) => (
                    <div key={index} className="mb-4">
                        <button
                            className="flex items-center justify-between w-full px-4 py-2 text-gray-800 rounded-md focus:outline-none"
                            onClick={() => setActiveIndex(index === activeIndex ? -1 : index)}
                        >
                            <span>{question.question}</span>
                            <svg
                                className={`h-4 w-4 transform ${index === activeIndex ? 'rotate-180' : ''}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {index === activeIndex && (
                            <div className="mt-2 px-4 py-2 bg-gray-100 rounded-md">
                                <p className="text-gray-700">{question.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

        </div>
    </>
}

export default Faq