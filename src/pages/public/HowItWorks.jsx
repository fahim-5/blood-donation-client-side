import React from 'react';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSearch, FaHandHoldingHeart, FaHeartbeat, FaUsers, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: 'Register as Donor',
      description: 'Create your account with your details, blood type, and location. It only takes 2 minutes!',
      icon: <FaUserPlus className="text-3xl text-white" />,
      color: 'bg-red-500',
      details: 'Provide your basic information including blood group, district, and upazila to join our donor community.'
    },
    {
      id: 2,
      title: 'Find Matching Requests',
      description: 'Browse blood donation requests or get notified when your blood type is needed nearby.',
      icon: <FaSearch className="text-3xl text-white" />,
      color: 'bg-blue-500',
      details: 'Search for urgent requests based on blood type and location. Our matching algorithm helps find the closest matches.'
    },
    {
      id: 3,
      title: 'Respond to Request',
      description: 'Click "Donate" on a matching request and confirm your availability to help.',
      icon: <FaHandHoldingHeart className="text-3xl text-white" />,
      color: 'bg-green-500',
      details: 'Once you find a matching request, you can respond immediately. The requester will be notified instantly.'
    },
    {
      id: 4,
      title: 'Donate Blood',
      description: 'Visit the hospital or donation center at the scheduled time to donate blood safely.',
      icon: <FaHeartbeat className="text-3xl text-white" />,
      color: 'bg-purple-500',
      details: 'Our certified hospitals and donation centers ensure safe and hygienic blood donation processes.'
    },
    {
      id: 5,
      title: 'Save Lives',
      description: 'Your single donation can save up to 3 lives. Track your impact in your dashboard.',
      icon: <FaUsers className="text-3xl text-white" />,
      color: 'bg-orange-500',
      details: 'Each donation is tracked and you can see how many lives you\'ve helped save through your donor profile.'
    },
    {
      id: 6,
      title: 'Become Regular Donor',
      description: 'Join our community of regular donors and earn badges for your contributions.',
      icon: <FaCheckCircle className="text-3xl text-white" />,
      color: 'bg-teal-500',
      details: 'Regular donors get special recognition, priority matching, and contribute to building a sustainable blood supply.'
    }
  ];

  const bloodFacts = [
    'A single donation can save up to 3 lives',
    'Blood cannot be manufactured - it only comes from donors',
    'Every 2 seconds someone needs blood',
    'Only 3% of age-eligible people donate blood yearly',
    'Donating blood is safe and takes only 10-15 minutes',
    'You can donate blood every 56 days',
    'O-negative blood is the universal donor type'
  ];

  const eligibilityCriteria = [
    { criteria: 'Age', requirement: '18-65 years' },
    { criteria: 'Weight', requirement: 'At least 50 kg (110 lbs)' },
    { criteria: 'Health', requirement: 'Good health on donation day' },
    { criteria: 'Hemoglobin', requirement: 'At least 12.5 g/dL' },
    { criteria: 'Last Donation', requirement: 'Minimum 56 days gap' },
    { criteria: 'No tattoos/piercings', requirement: 'Within last 3 months' },
    { criteria: 'Travel', requirement: 'No malaria risk area travel' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Blood Donation Works
            </h1>
            <p className="text-xl opacity-90 mb-8">
              A simple, safe process that saves lives. Learn how you can make a difference in just a few steps.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary bg-white text-red-600 hover:bg-gray-100 font-semibold"
              >
                Become a Donor
              </Link>
              <Link
                to="/donation-requests"
                className="btn-outline border-white text-white hover:bg-white hover:text-red-600"
              >
                View Urgent Requests
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Donation Process in 6 Simple Steps
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From registration to donation, here's how you can save lives through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${step.color} w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="text-sm font-semibold text-gray-500 mr-2">STEP {step.id}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-3">{step.description}</p>
                      <p className="text-sm text-gray-500">{step.details}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Are You Eligible to Donate?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check if you meet the basic requirements to become a blood donor
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Basic Requirements</h3>
                <div className="space-y-4">
                  {eligibilityCriteria.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <span className="text-green-600 font-bold">✓</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">{item.criteria}:</span>
                        <span className="ml-2 text-gray-600">{item.requirement}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-red-50 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Important Notes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>You must be free from infectious diseases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>No alcohol consumption 24 hours before donation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Eat a healthy meal before donating</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Drink plenty of water before and after donation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>Bring valid ID proof when donating</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Facts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Did You Know?
              </h2>
              <p className="text-gray-600">
                Important facts about blood donation that highlight its impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bloodFacts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center p-4 bg-gradient-to-r from-red-50 to-white rounded-lg border border-red-100"
                >
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-red-600 font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-800 font-medium">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Measures */}
      <section className="py-16 bg-gradient-to-r from-red-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Safety is Our Priority
              </h2>
              <p className="text-gray-600">
                We ensure the highest safety standards for every donation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">🩺</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Medical Screening</h3>
                <p className="text-gray-600">
                  Every donor undergoes thorough medical screening before donation
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 text-2xl">🧼</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Sterile Equipment</h3>
                <p className="text-gray-600">
                  All equipment is sterile, single-use, and disposed after each donation
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 text-2xl">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold mb-3">Trained Staff</h3>
                <p className="text-gray-600">
                  Certified medical professionals oversee every donation process
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Save Lives?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of donors who are making a difference in their communities. 
              Your donation matters!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="btn-primary bg-white text-red-600 hover:bg-gray-100 font-semibold text-lg px-8 py-3"
              >
                Start Donating Today
              </Link>
              <Link
                to="/contact-us"
                className="btn-outline border-white text-white hover:bg-white hover:text-red-600 text-lg px-8 py-3"
              >
                Have Questions?
              </Link>
            </div>
            <p className="mt-8 text-sm opacity-80">
              Need more information? Check our <Link to="/faq" className="underline font-semibold">FAQ section</Link> or contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How often can I donate blood?</h3>
                <p className="text-gray-600">
                  You can donate whole blood every 56 days (8 weeks). Platelets can be donated every 7 days, up to 24 times per year.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">Does donating blood hurt?</h3>
                <p className="text-gray-600">
                  You may feel a slight pinch when the needle is inserted, but the donation itself is generally painless. Most donors compare it to a mild pinprick sensation.
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">How long does the process take?</h3>
                <p className="text-gray-600">
                  The entire process takes about 45-60 minutes. The actual blood donation takes only 8-10 minutes. The rest is for registration, screening, and recovery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;