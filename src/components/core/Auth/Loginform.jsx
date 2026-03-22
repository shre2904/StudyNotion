import  { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'


import { Link,useNavigate } from 'react-router-dom'
import { login } from '../../../services/operations/authAPI'

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })


const [showPassword, setShowpassword] = useState(false);
const {email, password} = formData

const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }   


const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email,password,navigate))
}


  return (
    <form
         onSubmit={handleOnSubmit}
         className='mt-6 flex flex-col gap-y-4'
    >
        <label className='w-full' >
            <p className='mb-1 text-[0.875] text-richblack-5'>
                Email address  <sup className='text-pink-200'>*</sup>
            </p>
            <input 
                required
                type ="text"
                name="email"
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email address"
                style={{
                    boxShadow: " inset 0px -1px 0px rgba(255,255,255,0.18)",
                }}
                className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
            />
        </label>
        <label className='relative'>
            <p className='text-richblack-5 mb-1 test-[0.875]'>Password <sup className='text-pink-200'>*</sup></p>
            <input
             type={showPassword ? "text" : "password"} 
             required
             name="password"
             value={password}
             onChange={handleOnChange}
             placeholder='Enter Password'
             style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
             }}
             className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
             />
             <span
                onClick={() => setShowpassword((prev)=> ! prev)}
                className='absolute right-3 top-[38px] z-[10px] cursor-pointer'
             >{showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>
             ): (
                <AiOutlineEye fontSize={24} fontFamily='#AFB2BF'/>
             )}
                
             </span>
             <Link to="/forgot-password">
                <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
                    forget Password
                </p>
             </Link>
        </label>
        <button
                type="submit"
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
            Sign In
        </button>

    </form>
  )
}


export default LoginForm
