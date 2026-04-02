import { apiConnector } from "../apiConnector";
import { studentEndpoints } from "../apis";
import {toast} from "react-hot-toast";
import rzplogo from '../../assets/Logo/Logo-Full-Light.png'
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
 
const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;      

 function loadScript(src){
    return new Promise((resolve) => {
        const script= document.createElement("script");
        script.src = src;
        script.onload= () => {
            resolve(true);
        }
        script.onerror=() => {
            resolve(false)
        }
        document.body.appendChild(script);
    })
 }

 export async function buyCourse(token, courses,userDetails,navigate,dispatch) {
    const toastId = toast.loading("loading...");
    try {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }
        //initiate the order
        const orderResponse = await apiConnector("POST",COURSE_PAYMENT_API,
                                                {courses},
                                            {
                                                Authorization:`Bearer ${token}`,
                                            })
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        //options 
        const order = orderResponse.data.data;

const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    currency: order.currency,
    amount: order.amount,
    order_id: order.id,
    name: "Studynotion",
    description: "Thank You For Purchasing the Course",
    image: rzplogo,
    prefill: {
        name: userDetails.firstName,
        email: userDetails.email
    },
    handler: function(response){
        sendPaymentSuccessEmail(response, order.amount, token);
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
    }
}
        //paymeny utility 
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("opps, payment failed");
            console.log(response.error);
        })

    } catch (error) {
        console.log("payment api error",error);
        toast.error("could not make payment");
    }
    toast.dismiss(toastId);
 }

 async function sendPaymentSuccessEmail(response,amount,token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })

    } catch (error) {
        console.log("payment Success Email Error....",error);
    }
 }
 async function verifyPayment(bodyData,token,navigate,dispatch){
    const toastId= toast.loading("verify payment...");
    dispatch(setPaymentLoading(true));
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("payment successfull,you are added to the course ")
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment verify error",error);
        toast.error("could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
 }