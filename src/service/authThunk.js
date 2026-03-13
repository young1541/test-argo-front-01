import { createAsyncThunk } from "@reduxjs/toolkit";
import { service_path } from "./service_ip_port";
let data_set = [
    {username:"aaa",password :"react-aaa", role : "USER"},
    {username:"bbb",password :"bbb", role : "USER"},
    {username:"ccc",password :"ccc", role : "USER"},
]
const path = service_path;

export const loginThunk = createAsyncThunk(
  "loginThunk", 
  async ( user ) => {
    const res = await fetch(path + "/auth/login",{
      method : "post",
      headers : {"Content-Type" : "application/json"},
      body : JSON.stringify( user )
    } )
    //const resResult = await res.json();
    //console.log( "resResult : ", resResult)
    return {result:await res.json(), username:user.username};
    
    //return (await res.json())
                    //?{result:0, username:user.username}:
                    //{result:1, username:user.username}; //성공 0, 실패 1

    /*
    const data = data_set.filter(data => data.username === user.username )[0]
    let result = 1;
    if(data?.password === user.password ){
      result = 0;
    }
    return {result, username:user.username}; //성공 0, 실패 1
    */
  }
);

export const registerThunk = createAsyncThunk(
  "registerThunk", 
  async ( user ) => {
    console.log("실행")
    const res = await fetch(path+"/members", {
      method : "post",
      //headers : {contenttype : application/json }
      body : user
    })  
    if( res.ok )
      return { result : 0 }
    const errorMsg = await res.text();
    throw new Error( errorMsg );

    //if( res.status === 409 ){}
    //if( res.status === 401 ){}
    //data_set = data_set.concat( user )
    //return { result : 0 }
  }
);

export const memberThunk = createAsyncThunk(
  "memberThunk", 
  async ( start ) => {
    const res = await fetch(path + "/members?start="+( start-1), {method:"get"} );
    console.log( res )
    if( res.ok )
      return await res.json();
    return null;
    //throw new Error();
    //return data_set;
  }
);
export const memberOneThunk = createAsyncThunk(
  "memberOneThunk", 
  async ( user ) => { //{username : aaa}
    const token = sessionStorage.getItem("token");
    //console.log("token : "+token)
    const res = await fetch(path + "/members/"+user.username , {
      headers : { 
        "Authorization":`Bearer ${token}` 
      }
    } )
    return await res.json();
    /*
    console.log("one thunk : ", user )
    const data = data_set.filter(d => d.username === user.username)[0]
    console.log("one thunk data : ", data )
    return data
    */
  }
);
export const memberDeleteThunk = createAsyncThunk(
  "memberDeleteThunk", 
  async ( user ) => { //{username : aaa}
    const token = sessionStorage.getItem("token");
    const res = await fetch(path+"/members/"+user.username, {
      method : "delete",
      headers : { 
        "Authorization":`Bearer ${token}` 
      },
      body : user.fileName
    } )
    if( res.ok )
      return 1;
    //console.log( "res : ", res )
    //data_set = data_set.filter( d => d.username !== user.username)
    //return 1;
  }
);
export const memberModifyThunk = createAsyncThunk(
  "memberModifyThunk", 
  async ( {id, formData} ) => { //{username : aaa}
    const token = sessionStorage.getItem("token");
    const res = await fetch(path+"/members/"+id, {
      method : "put",
      headers : { 
        "Authorization":`Bearer ${token}` 
      },
      body : formData
    })
    //data_set = data_set.filter( d => d.username !== user.username)
    //data_set = data_set.concat( user )
    if(res.ok)
      return 1;
    throw new Error("수정 중 문제 발생");
  }
);