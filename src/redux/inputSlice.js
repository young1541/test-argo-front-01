import {createSlice} from "@reduxjs/toolkit"

const initialState = {
        login : {username:"", password:""},
        register : {username:"", password:"", role:"", file:null},
        modify : {username:"", password:"", role:"", fileName:""},
    }
const inputSlice = createSlice({
    name : "input",
    initialState : initialState,
    reducers : {
        initInput : (state) => initialState,

        changeInput : (state, action) => {
            const {form, name, value} = action.payload
            state[form][name] = value
        },
        setModifyData : (state, action) => {
            console.log("action : ", action)
            state.modify = action.payload;
        }
    }
})
//inputSlice.actions.changeInput()
//changeInput()
export const {initInput, changeInput, setModifyData} = inputSlice.actions;
export default inputSlice;