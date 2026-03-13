import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ModifyCom from "../../components/post/ModifyCom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeInput, setModifyData } from "../../redux/post/postInputSlice";
import { postModifyThunk, postOneThunk } from "../../service/post/postThunk";
import { clearResult } from "../../redux/post/postDataSlice";
function PostModifyCon(){
    const {postId} = useParams();
    const dispatch = useDispatch();
    const {dataOne, result} = useSelector(state => state.postData)
    const { id, title, content } = useSelector( state => state.postInput.modify )
    
    //console.log("modify dataOne : ", dataOne )
    //console.log("id, title, content : ", id, title, content )
    useEffect(()=>{
        if(dataOne)
            dispatch( setModifyData(dataOne) )
        else
            dispatch( postOneThunk({id:postId}) )
    },[dispatch, dataOne, postId])

    const onChange = (e) =>{
        const {name, value} = e.target;
        dispatch( changeInput( {name, value, form:"modify"} ) )
    }
    const navigate = useNavigate();
    const onSubmit = (e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        dispatch( postModifyThunk({ id:postId , formData }))
    }
    useEffect(()=>{
        if(result){
            navigate("/post/info/"+postId)
            dispatch( clearResult() )
        }
    },[dispatch, postId, navigate, result])
    return <>
            <ModifyCom id={id} title={title} content={content}
                            onChange={onChange} onSubmit={onSubmit} />
         </>
}
export default PostModifyCon;