import { useDispatch, useSelector } from "react-redux";
import RegCom from "../components/RegCom";
import HeaderCom from "../components/common/HeaderCom";
import {changeInput} from "../redux/inputSlice"
import { registerThunk } from "../service/authThunk";
import { useNavigate } from "react-router-dom";
import { initState } from "../redux/authSlice";
import { useEffect } from "react";
const RegCon = () => {
    const {username, password, role} = 
                        useSelector(state => state.input.register);
    
    const {error, loading} = useSelector( state => {
        console.log("reg con state => ", state)
        return state.auth;
    });

    const dispatch = useDispatch();
        
    useEffect( ()=>{
        dispatch( initState() )
    },[dispatch])

    const onChange = (e) => {
        console.log("reg con onchange : ", e.target)
        const {name, value} = e.target
        dispatch( changeInput({name, value, form:"register"}) )
    }
    const navigate = useNavigate()
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        //formData.append("id", 1000)

        const {payload} = await dispatch( registerThunk(formData) )
        // payload = { result : 0 }
        console.log( "payload => ", payload )
        if( payload?.result === 0 )
            navigate("/login")
    }
    return (<>
        <RegCom error={error} loading={loading}
        onChange={onChange} onSubmit={onSubmit}
            username={username} password={password} role={role} />
    </>)    
}
export default RegCon;