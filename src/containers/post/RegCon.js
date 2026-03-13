import { useDispatch, useSelector } from "react-redux";
import RegCom from "../../components/post/RegCom";
import { changeInput, initInput } from "../../redux/post/postInputSlice";
import { postRegisterThunk } from "../../service/post/postThunk";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearResult } from "../../redux/post/postDataSlice";


function PostRegCon(){
    const { title, content } = useSelector( state => {
        //console.log("reg con : ", {...state})
        return state.postInput.register
    } );
    const dispatch = useDispatch();
    const onChange = ( e ) => {
        const {name, value} = e.target;
        dispatch( changeInput({name, value, form:"register"}))
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData( e.target );
        dispatch( postRegisterThunk(formData) )
    }
    const navigate = useNavigate();
    const {loading, error, result} = useSelector( state=>state.postData);
    useEffect(()=>{
        if(result){
            navigate("/post/list")
            dispatch( clearResult() )
        }
    },[navigate, dispatch, result])

    useEffect(()=>{
        dispatch( initInput() )
    },[dispatch])

    return <><RegCom loading={loading} error={error} title={title} content={content}
                     onChange={onChange} onSubmit={onSubmit}/></>
}
export default PostRegCon;