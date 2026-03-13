import { useDispatch, useSelector } from "react-redux";
import HeaderCom from "../components/common/HeaderCom";
import ModifyCom from "../components/ModifyCom";
import { changeInput, setModifyData } from "../redux/inputSlice";
import { useEffect } from "react";
import { memberModifyThunk, memberOneThunk } from "../service/authThunk";
import { useNavigate, useParams } from "react-router-dom";

const ModifyCon = () => {
    const params = useParams();

    const dispatch = useDispatch();
    const {username, password, role, fileName} = useSelector(state => state.input.modify )
    const {dataOne} = useSelector(state => state.memberData )
    console.log("data one : ", dataOne )
    useEffect(()=>{
        if( dataOne )
            dispatch( setModifyData(dataOne) )
        else
            dispatch(memberOneThunk({username : params.username}));
    },[dispatch, params, dataOne])

    const onChange = (e) => {
        const {name, value} = e.target
        dispatch( changeInput({name, value, form:"modify"}) )
    }
    const navigate = useNavigate()
    const onSubmit = (e) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries( formData )
        //console.log("dataOne.id : ", dataOne.id)
        //console.log("userData : ", userData)
        dispatch( memberModifyThunk( { id:dataOne.id, formData } ) );
        navigate("/info/"+dataOne.id);
    }
    return (<>
        <ModifyCom fileName={fileName} onChange={onChange} onSubmit={onSubmit}
            username={username} password={password} role={role} />
    </>)
}
export default ModifyCon;