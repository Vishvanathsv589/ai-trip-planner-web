import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center w-[90%] mx-auto gap-9 animate-fadeIn'>
      
      {/* Transparent Container for Heading, Paragraph, and Button */}
      <div className="bg-white bg-opacity-20 backdrop-blur-md px-10 py-6 rounded-lg shadow-lg mt-16 text-center animate-slideUp">
        <h1 className='font-extrabold text-[50px] animate-fadeIn delay-100'>
          <span className="text-[#38B2AC]">Discover Your Next Adventure with AI: </span> 
          Personalized Itineraries at Your Fingertips
        </h1>

        <p className='text-xl text-gray-100 mt-4 animate-slideUp delay-200'>
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

        <Link to={'/create-trip'}>
          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition mt-6 animate-fadeIn delay-300">
            Get Started, It's Free
          </button>
        </Link>
      </div>

    </div>
  )
}

export default Hero
