import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import ListCom from "../components/ListCom";
import { memberThunk } from "../service/authThunk";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListCon = () => {
    const [start, setStart] = useState(1);
    const onClick = ( start ) => { setStart(start) }
    const dispatch = useDispatch();
    const {data} = useSelector(state=>{
        console.log( {...state} )
        return state.memberData;
    })
    useEffect(()=>{
        dispatch( memberThunk(start) )
    },[dispatch, start])
    
    //const sessionAuth = sessionStorage.getItem("auth")
    //console.log( sessionAuth )
    const { isLoggedIn } = useSelector( state => state.auth )
    const navigate = useNavigate()
    const onInfo = ( uId ) => {
        //data_set.filter( uId === 저장.id )
        console.log( uId )
        if( isLoggedIn ){
            navigate("/info/"+uId);
        }else{ //로그인페이지 이동
            navigate("/login")
        }
    }
    return (<>
       
        <ListCom onClick={onClick} data={data} onInfo={onInfo}/>
    </>)
}
export default ListCon;