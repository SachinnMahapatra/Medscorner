import React from 'react'
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import { HelpCircle, ChevronDown, ChevronUp, MessageSquare, ShieldCheck, Truck, CreditCard, RefreshCw, Clock, Package } from 'lucide-react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(-1);
    
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const faqCategories = [
        {
            name: "Orders & Shipping",
            icon: <Truck size={24} className="text-blue-600" />,
            questions: [
                {
                    question: 'How do I track my order?',
                    answer: "Once your order has shipped, you will receive an email with tracking information. You can use this to track the status of your order on the shipping carrier's website. If you have any questions or concerns about your order, please contact our customer service team."
                },
                {
                    question: 'How long does shipping take?',
                    answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for an additional fee and typically delivers within 1-2 business days. Delivery times may vary based on your location and availability of products."
                },
                {
                    question: 'Do you ship internationally?',
                    answer: "Currently, we only ship within the country. We are working on expanding our shipping capabilities to serve international customers in the future."
                }
            ]
        },
        {
            name: "Returns & Refunds",
            icon: <RefreshCw size={24} className="text-blue-600" />,
            questions: [
                {
                    question: 'What is your return policy?',
                    answer: 'At MedsCorner, we want to ensure that you are completely satisfied with your purchase. If for any reason you are not satisfied, you can return your order within 14 days of delivery for a full refund. Please see our full return policy for details.'
                },
                {
                    question: 'How do I initiate a return?',
                    answer: 'To initiate a return, please log into your account, go to your order history, and select the order you wish to return. Follow the prompts to generate a return label. Once we receive your return, we will process your refund within 5-7 business days.'
                },
                {
                    question: 'Are prescription medications returnable?',
                    answer: 'For safety and quality control reasons, prescription medications cannot be returned once they have left our facility. If you have concerns about your prescription, please contact our pharmacist directly.'
                }
            ]
        },
        {
            name: "Medication & Safety",
            icon: <ShieldCheck size={24} className="text-blue-600" />,
            questions: [
                {
                    question: 'Is it safe to order medication online?',
                    answer: 'Yes, it is safe to order medication online from MedsCorner. We are a licensed pharmacy and follow all applicable laws and regulations. We use secure encryption to protect your personal and payment information, and we only dispense medication from licensed pharmacists.'
                },
                {
                    question: 'How do you ensure medication quality?',
                    answer: 'All medications sold through MedsCorner are sourced from licensed manufacturers and distributors. We maintain strict quality control measures, including temperature-controlled storage and regular inspections, to ensure all products meet regulatory standards.'
                },
                {
                    question: 'Do I need a prescription to order medication?',
                    answer: 'Yes, prescription medications require a valid prescription from a licensed healthcare provider. You can upload your prescription during checkout or have your doctor send it directly to us.'
                }
            ]
        },
        {
            name: "Account & Payment",
            icon: <CreditCard size={24} className="text-blue-600" />,
            questions: [
                {
                    question: 'How do I create an account?',
                    answer: 'Creating an account is easy! Click on the "Register" button in the top right corner of our website. Fill in your personal details, create a password, and verify your email address. Once your account is created, you can start shopping and tracking your orders.'
                },
                {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards, debit cards, and digital payment methods like PayPal. For your security, all payment information is encrypted and processed through secure payment gateways.'
                },
                {
                    question: 'Is my personal information secure?',
                    answer: 'Yes, protecting your personal information is our top priority. We use industry-standard encryption and security measures to protect your data. We never share your information with third parties without your consent.'
                }
            ]
        },
        {
            name: "Customer Service",
            icon: <MessageSquare size={24} className="text-blue-600" />,
            questions: [
                {
                    question: 'How do I contact customer service?',
                    answer: "Our customer service team is available to assist you Monday through Saturday, 8AM to 10PM. You can reach us by phone at +911234567890, by email at support@medscorner.com, or through our website's contact form."
                },
                {
                    question: 'Do you offer consultations with pharmacists?',
                    answer: 'Yes, our licensed pharmacists are available for consultations during business hours. You can schedule a consultation through your account or contact our customer service team to arrange a time.'
                },
                {
                    question: 'How can I provide feedback about my experience?',
                    answer: 'We value your feedback! You can share your experience by leaving a review on our website, responding to our post-purchase survey, or contacting our customer service team directly. Your input helps us improve our services.'
                }
            ]
        }
    ];

    const [activeCategory, setActiveCategory] = useState(0);

    const toggleQuestion = (index) => {
        setActiveIndex(index === activeIndex ? -1 : index);
    };

    const changeCategory = (index) => {
        setActiveCategory(index);
        setActiveIndex(-1); // Reset active question when changing category
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-white">
            <NavBar />
            
            <div className="flex-grow container mx-auto px-4 py-12 max-w-6xl">
                <div className="mb-12 text-center">
                    <div className="flex justify-center mb-4">
                        <HelpCircle size={40} className="text-blue-600" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Find answers to common questions about our products, services, and policies. Can't find what you're looking for? Feel free to contact us.
                    </p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Categories Sidebar */}
                    <div className="lg:w-1/4">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                            <div className="bg-blue-600 py-4 px-6">
                                <h2 className="text-white font-bold">Categories</h2>
                            </div>
                            <div className="divide-y divide-gray-200">
                                {faqCategories.map((category, index) => (
                                    <button
                                        key={index}
                                        className={`w-full text-left py-3 px-6 flex items-center space-x-3 hover:bg-blue-50 transition-colors ${
                                            activeCategory === index ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700'
                                        }`}
                                        onClick={() => changeCategory(index)}
                                    >
                                        <span className="flex-shrink-0">{category.icon}</span>
                                        <span>{category.name}</span>
                </button>
                                ))}
                            </div>
                            
                            <div className="p-6 bg-blue-50">
                                <h3 className="font-medium text-gray-800 mb-2">Need More Help?</h3>
                                <p className="text-gray-600 text-sm mb-4">
                                    Can't find the answer you're looking for? Please contact our support team.
                                </p>
                                <NavLink
                                    to="/Contact"
                                    className="flex items-center justify-center w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <MessageSquare size={16} className="mr-2" />
                                    Contact Us
                </NavLink>
            </div>
                        </div>
                    </div>
                    
                    {/* FAQ Questions */}
                    <div className="lg:w-3/4">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden">
                            <div className="bg-blue-600 py-4 px-6 flex items-center space-x-3">
                                {faqCategories[activeCategory].icon}
                                <h2 className="text-white font-bold">{faqCategories[activeCategory].name}</h2>
                            </div>
                            
                            <div className="divide-y divide-gray-200">
                                {faqCategories[activeCategory].questions.map((faq, index) => (
                                    <div key={index} className="border-b border-gray-200 last:border-b-0">
                        <button
                                            className="w-full text-left py-4 px-6 flex justify-between items-center hover:bg-gray-50 transition-colors"
                                            onClick={() => toggleQuestion(index)}
                                        >
                                            <span className="font-medium text-gray-800">{faq.question}</span>
                                            {activeIndex === index ? (
                                                <ChevronUp size={20} className="text-blue-600 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
                                            )}
                        </button>
                                        
                                        {activeIndex === index && (
                                            <div className="px-6 py-4 bg-blue-50">
                                                <p className="text-gray-700">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Help Box */}
                        <div className="mt-8 bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <Clock size={24} className="text-blue-600" />
                                </div>
                                <div className="ml-4">
                                    <h3 className="font-medium text-gray-800">Our Support Hours</h3>
                                    <p className="text-gray-600 mt-1">
                                        Monday - Saturday: 8AM - 10PM<br />
                                        Sunday: 9AM - 6PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default Faq;