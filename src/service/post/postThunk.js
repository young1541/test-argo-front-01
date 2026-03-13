import { createAsyncThunk } from "@reduxjs/toolkit";
import { service_path } from "../service_ip_port";

const path = service_path;

export const postThunk = createAsyncThunk(
  "postThunk", 
  async ( ) => { 
    const token = sessionStorage.getItem("token");
    let res;
    if( token )
      res = await fetch(path + "/post" , {
              headers : { "Authorization" : `Bearer ${token}`}
            } )
    else
      res = await fetch(path + "/post" )

    if( res.ok )
        return res.json();
    if( res.status === 404 )
        throw new Error("저장된 데이터가 없습니다")
  }
);
export const postOneThunk = createAsyncThunk(
  "postOneThunk",

  async ( post ) => { //{ id : postId }
    const token = sessionStorage.getItem("token");
    const res = await fetch(path + "/post/"+post.id , {
      headers : { "Authorization" : `Bearer ${token}`}
    } )
    if( res.ok )
        return res.json();
    if( res.status === 404 )
        throw new Error("저장된 데이터가 없습니다")
    if( res.status === 401 )
      throw new Error("로그인 먼저 하세요")
  }
);

export const postDeleteThunk = createAsyncThunk(
  "postDeleteThunk",
  async ( post ) => { //{ id : postId }
    const token = sessionStorage.getItem("token");
    const res = await fetch(path + "/post/"+post.id , {
      method : "delete", 
      headers : { "Authorization" : `Bearer ${token}`}
    } )
    if( res.ok )
        return res.ok;
    if( res.status === 404 )
        throw new Error("저장된 데이터가 없습니다")
    if( res.status === 401 )
      throw new Error("로그인 먼저 하세요")
    if( res.status === 403 )
      throw new Error("작성자와 로그인 사용자가 일치하지 않음. 권한 없음")
  }
);

export const postRegisterThunk = createAsyncThunk(
  "postRegisterThunk",
  async ( post ) => { // post : formData
    const token = sessionStorage.getItem("token");
    const res = await fetch(path + "/post" , {
      method : "post", 
      headers : { "Authorization" : `Bearer ${token}`},
      body : post
    } )
    if( res.ok )
        return res.ok; //res.json();
    if( res.status === 404 )
        throw new Error("회원만 글 등록 가능합니다")
    if( res.status === 401 )
      throw new Error("로그인 먼저 하세요")
  }
);
export const postModifyThunk = createAsyncThunk(
  "postModifyThunk",
  async ( {id, formData} ) => { 
    const token = sessionStorage.getItem("token");
    const res = await fetch(path + "/post/"+id , {
      method : "put", 
      headers : { "Authorization" : `Bearer ${token}`},
      body : formData
    } )
    if( res.ok )
        return res.ok;
    if( res.status === 404 )
        throw new Error("게시글 없음")
    if( res.status === 401 )
      throw new Error("로그인 먼저 하세요")
    if( res.status === 403 )
      throw new Error("수정 권한 없음")
  }
);
export const postLikedThunk = createAsyncThunk(
  "postLikedThunk",
  async ( like ) => { //{ postId : 번호, liked : boolean }
    const token = sessionStorage.getItem("token");
    let res;
    if( like.liked ){ // true 좋아요 삭제
        res = await fetch(`${path}/post/${like.postId}/like`, {
              method : "delete", headers : { "Authorization" : `Bearer ${token}`},
            } )
    }else{ // 좋아요 추가
        res = await fetch(`${path}/post/${like.postId}/like`, {
              method : "post", headers : { "Authorization" : `Bearer ${token}`},
          } )
    }
    if( res.ok )
        return {liked : !like.liked, postId : like.postId };
    throw new Error("좋아요 중 문제 발생...")
  }
);