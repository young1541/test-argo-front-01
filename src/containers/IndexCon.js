import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import IndexCom from "../components/IndexCom";
import authSlice from "../redux/authSlice";
import { useEffect } from "react";
const IndexCon = () => {
    const dispatch = useDispatch();
    const {exp} = useSelector(state => state.auth )
    const currnetTime = Date.now();
    
    const timeout = exp*1000 - currnetTime;
    /*
    useEffect(()=>{
        setTimeout( ()=> {
            alert("로그아웃 됨")
            dispatch( authSlice.actions.logout() );
        }, timeout)
    },[ dispatch, timeout ])
    */
    return (<>
       
        <IndexCom />
    </>)
}
export default IndexCon;