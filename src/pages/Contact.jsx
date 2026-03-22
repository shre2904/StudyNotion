import React from 'react'
import ContactUsForm from '../components/ContactPage/ContactUsForm'
import ContactForm from '../components/ContactPage/ContactForm'
import Footer from '../components/common/Footer'
import ContactDetails from '../components/ContactPage/ContactDetails'
import ReviewSlider from '../components/common/ReviewSlider'
const Contact = () => {
  return (
    <div className='mt-[70px]'>
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col lg:flex-row justify-content gap-10 text-white'>
        {/* contact details */}
        <div className='lg:w-[40%]'> 
            <ContactDetails/>
        </div>

        {/* contact from  */}
        <div className='lg:w-[60%]'>
            <ContactForm/>
        </div>
        
      </div>
      <div className='relative mx-auto w-11/12 flex flex-col max-w-maxContent my-20 text-white bg-richblack-900 gap-8'>
                <h1 className='text-center text-4xl font-semibold mt-8'>Reviews from other learners</h1>
                <ReviewSlider/>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact
