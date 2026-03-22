import toast from "react-hot-toast"
import { setLoading , setToken} from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"
import { resetCart } from "../../slices/cartSlice"



const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
 RESETPASSWORD_API,
 RESETPASSTOKEN_API,
  
} = endpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent: true,
      })
      console.log("SENDOTP API RESPONSE............", response)

      console.log(response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email")
    } catch (error) {
      console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function signUp (
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
){
    return async (dispatch) => {
        const toastId = toast.loading("loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SIGNUP_API,{
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            })
            console.log("SIGNP API RESPONSE.......", response)
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup SuccessFul")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })

      console.log("LOGIN API RESPONSE............", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      toast.success("Login Successful")
      dispatch(setToken(response.data.token))
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))
      
      localStorage.setItem("token", JSON.stringify(response.data.token))
      const userData = { ...response.data.user, image: userImage }

dispatch(setUser(userData))
localStorage.setItem("user", JSON.stringify(userData))

      navigate("/dashboard/my-profile")
    } catch (error) {
      console.log("LOGIN API ERROR............", error)
      const message =
        error?.response?.data?.message ? error.response.data.message : "Login Failed"
      toast.error(message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}


export function logout(navigate){
  return(dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    // Do not clear cart here so it persists across logout/login
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("logged out")
    navigate("/")
  }
}

export function getPasswordResetToken (email,setEmailSent) {
        return async(dispatch) => {
            try {
                const response = await apiConnector("POST", RESETPASSTOKEN_API,{email})
                console.log("reset password token response...", response)
                if(!response.data.success){
                    throw new Error(response.message);
                }

                toast.success("reset email sent");
                setEmailSent(true);
            } catch (error) {
                console.log("reset password token error",error)
                toast.error("Failed to send email for resetting password")
            }
                dispatch(setLoading(false));
        }
}

export function resetPassword(password, confirmPassword,token) {
  return async(dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST",RESETPASSWORD_API, {password,confirmPassword,token});
      console.log("RESET PASSWORD RESPONSE ...",response);

      if(!response.data.success) {
        throw new Error (response(response.data.message));
      }
      toast.success("Password has been reset successfully")

    } catch (error) {
      console.log("reset password token error",error)
      toast.error("unavle to reset  password")
    }
  }
}





