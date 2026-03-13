import { createSlice } from "@reduxjs/toolkit"
import { postDeleteThunk, postLikedThunk, postModifyThunk, postOneThunk, postRegisterThunk, postThunk } from "../../service/post/postThunk"
import { createLoadingReducers } from "../commonLoadingHandlers"

const initialState = { data : null, dataOne : null, loading : false, error : null , result : false }
const postDataSlice = createSlice({
    name : "postDataSlice",
    initialState : initialState,
    reducers : {
        clearResult : (state) => {
            state.result = false;
        }
    },
    extraReducers : ( builder ) =>{
        builder
        .addCase( postThunk.fulfilled , (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        createLoadingReducers(builder , postThunk );

        builder
        .addCase( postOneThunk.fulfilled , (state, action) => {
            state.loading = false;
            state.dataOne = action.payload;
        })
        createLoadingReducers(builder , postOneThunk );

        builder
        .addCase( postDeleteThunk.fulfilled , (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        createLoadingReducers(builder , postDeleteThunk );

        builder
        .addCase( postRegisterThunk.fulfilled , (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        createLoadingReducers(builder , postRegisterThunk );

        builder
        .addCase( postModifyThunk.fulfilled , (state, action) => {
            state.loading = false;
            state.result = action.payload;
        })
        createLoadingReducers(builder , postModifyThunk );

        builder
        .addCase( postLikedThunk.fulfilled , (state, action) => {
            state.loading = false;
            const {postId, liked } = action.payload
            const post = state.data.find( post => post.id === postId)
            if(post){
                post.liked = liked;
                post.likedCount += liked ? 1 : -1;
            }
        })
        createLoadingReducers(builder , postLikedThunk );
    }
})
export const {clearResult} = postDataSlice.actions;
export default postDataSlice;