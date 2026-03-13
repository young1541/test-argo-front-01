import { useNavigate, useParams } from "react-router-dom";
import HeaderCom from "../components/common/HeaderCom";
import InfoCom from "../components/InfoCom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { memberDeleteThunk, memberOneThunk } from "../service/authThunk";

import { service_path } from "../service/service_ip_port";

const path = service_path;

const InfoCon = () => {
    const dispatch = useDispatch();
    
    const {username} = useParams();
    const {dataOne} = useSelector(state => {
        //console.log("state : ", {...state})
        return state.memberData;
    })
    const [imageUrl , setImageUrl ] = useState();
    useEffect(()=>{
        const getData = async () => {
            const memberData = await dispatch( memberOneThunk({username}) ).unwrap();
            //console.log("memberData : ", memberData)
            if(memberData?.fileName){
                //console.log( memberData.fileName )
                const res = await fetch(`${path}/members/${memberData.fileName}/image`)
                setImageUrl(URL.createObjectURL( await res.blob() ))
            }
        }
        getData();
        

    }, [dispatch, username])
    const navigate = useNavigate();
    const onDelete = async () => {
        //console.log("dataOne : ", dataOne)
        await dispatch( memberDeleteThunk({ 
            username : dataOne.id,
            fileName : dataOne.fileName
        }) );
        navigate("/list")
    }
    const onModifyForm = () => {
        navigate("/modify/"+username)
    }
    return (<>
        
        <InfoCom  imageUrl={imageUrl} onModifyForm={onModifyForm} data={dataOne} onDelete={onDelete} />
    </>)
}
export default InfoCon;