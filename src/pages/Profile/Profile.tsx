import {  useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Helmet } from "react-helmet"
 import type {  UserType } from "../../Types/ProfileUser.type"
import type { PostType } from "../../Types/Post.type"
import Post from "../Home/post"
import PostCreation from "../../component/PostCreation/PostCreation"
 

export default function Profile() {

function getMyProfile(){
return axios.get(`https://route-posts.routemisr.com/users/profile-data`, {
  headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`},
})
}
const { data , isLoading , isError , error} = useQuery({
  queryKey: ["getMyProfile"],
  queryFn: getMyProfile,
});

 

  const user: UserType | undefined=data?.data.data.user;
 
   
  
function getMyPosts(){
return axios.get(`https://route-posts.routemisr.com/users/${user?._id}/posts`,{
  headers: {Authorization: `Bearer ${localStorage.getItem("userToken")}`}
})

}

const { data:postUserData } = useQuery({
  queryKey: ["getUserPosts" , user?._id],
  queryFn: getMyPosts,
  enabled: !isLoading && !isError && !!data
});


 if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{error.message}</p>;
  }





  return (

    <>
    
      <Helmet>
        <title>Profile</title>
          </Helmet>

         
     
     {user && ( 
    <div className="w-[700px] mx-auto p-4 rounded-lg bg-slate-200 my-4 shadow-2xl border-2 border-slate-700">
    <div className="flex justify-between items-center">
  <img src={user.photo} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
        
      <div className="">
<p><span className="font-bold">Name:</span>{user.name}</p>

  <p><span className="font-bold">UserName:</span>{user.username}</p>
        <p><span className="font-bold">Gander:</span>{user.gender}</p>

        <p><span className="font-bold">Email:</span>{user.email}</p>

        <p><span className="font-bold">BirthDay:</span>{user.dateOfBirth?.split("T")[0]}</p>

      </div>

    </div>
         
    </div>
      )}
 <PostCreation/>
      {postUserData?.data.data.posts.map((currentPost:PostType) => <Post key={currentPost._id}  post={currentPost}/>)}
    </>
    
  )
}