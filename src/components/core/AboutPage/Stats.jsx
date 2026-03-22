import React from 'react'

const data= [
    {count:"5k", label:"Students"},
    {count:"10+", label:"Mentors"},
    {count:"200+", label:"Courses"},
    {count:"50+", label:"Awards"},


]

const Stats = () => {
  return (
    <div className='bg-richblack-700'> 
        
            <div className='flex flex-col gap-10 justify-between w-11/12 mx-auto max-w-maxContent text-white'>
                <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                    {
                        data.map( (element,index) => {
                            return (
                                <div key={index} className='flex flex-col py-10 '>
                                   <h1 className='text-[30px] font-bold text-richblack-5'>{element.count}</h1>
                                   <h2 className='text-[16px] font-semibold text-richblack-500'>{element.label}</h2> 
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        
      
    </div>
  )
}

export default Stats
