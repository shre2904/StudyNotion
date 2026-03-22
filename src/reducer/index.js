import {combineReducers} from "@reduxjs/toolkit" 
import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartSlice from "../slices/cartSlice"
import courseSlice from "../slices/courseSlice"
import viewCourseReducer from "../slices/viewCourseSlice"


const rootReducer = combineReducers({

        auth:authReducer,
        profile:profileReducer,
        cart:cartSlice,
        course:courseSlice,
        viewCourse:viewCourseReducer,

})

export default rootReducer