import { configureStore } from "@reduxjs/toolkit";
import inputSlice from "./inputSlice";
import authSlice from "./authSlice";
import memberDataSlice from "./memberDataSlice";
import postDataSlice from "./post/postDataSlice";
import postInputSlice from "./post/postInputSlice";


const store = configureStore({
    reducer : {
        //state.input = { login : {username:"", password:""} }
        input : inputSlice.reducer,
        auth : authSlice.reducer,
        memberData : memberDataSlice.reducer, 
        postData : postDataSlice.reducer, 
        postInput : postInputSlice.reducer
    }
})
export default store;