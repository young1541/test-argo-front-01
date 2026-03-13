import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    register : {title:"", content:""} ,
    modify : {id:"", title:"", content:""},
}
const postInputSlice = createSlice({
    name : "postInput",
    initialState : initialState,
    reducers : {
        initInput : (state) => initialState,
        changeInput : ( state, action ) => {
            const { form, name, value} = action.payload
            state[form][name] = value;
        },
        setModifyData : (state, action) => {
            state.modify = action.payload
        }
    }
})
export const {initInput, changeInput, setModifyData} = postInputSlice.actions;
export default postInputSlice;