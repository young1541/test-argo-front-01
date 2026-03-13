import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "../service/authThunk";
import { createLoadingReducers } from "./commonLoadingHandlers";


const saveAuth = sessionStorage.getItem("auth");
const initialState = {
    isLoggedIn:false, username:null,loading:false, 
    error:null, result : 0 , role : null
}
const authSlice = createSlice({
    name : "auth", 
    initialState : saveAuth? JSON.parse(saveAuth) :initialState,
    reducers : {
        logout : (state) => {
            sessionStorage.clear();
            return initialState;   
        },
        initState : (state) => initialState
    },
        extraReducers : (builder) => {
        builder
        .addCase(loginThunk.fulfilled,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.result =  action.payload.result;
            //console.log( "로그인 성공 result : ", {...state} )
            if( action.payload.result.token ){
                state.isLoggedIn = true;
                state.username = action.payload.username
                state.role = JSON.parse(
                                    atob( action.payload.result.token.split(".")[1]) )["role"]
                sessionStorage.setItem("auth", JSON.stringify({...state}))
                sessionStorage.setItem("token", action.payload.result.token)
                
                const exp = JSON.parse(
                                    atob( action.payload.result.token.split(".")[1]) )["exp"]
                state.exp = exp
                
            }
        })
        createLoadingReducers(builder, loginThunk)

        builder
        .addCase(registerThunk.fulfilled,(state, action)=>{
            state.loading = false;
            state.error = null;
            state.result = action.payload.result;
        })
        createLoadingReducers(builder, registerThunk)
    }
})
export const {logout, initState} = authSlice.actions

export default authSlice;