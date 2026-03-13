import { useDispatch, useSelector } from "react-redux";
import ListCom from "../../components/post/ListCom";
import { useEffect } from "react";
import { postLikedThunk, postThunk } from "../../service/post/postThunk";
import { useNavigate } from "react-router-dom";
function PostListCon(){
    const dispatch = useDispatch();
    const {data} = useSelector( state => {
        return state.postData;
    })
    useEffect(() => {
        dispatch(postThunk());
    }, [dispatch])
    const {isLoggedIn} = useSelector( state => state.auth )
    const navigate = useNavigate()
    const onInfo = ( postId ) => {
        if(isLoggedIn)
            navigate("/post/info/"+postId);
        else
            navigate("/login");
    }

    const onLiked = ( like ) => {
        dispatch( postLikedThunk( like ) )
    }

    return <><ListCom onLiked={onLiked} onInfo={onInfo} data={data}/></>
}
export default PostListCon;