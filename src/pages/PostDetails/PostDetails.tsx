import axios from "axios"
import Loader from "../../component/loader/Loader";
import { useQuery } from "@tanstack/react-query";
import Post from "../Home/post";
import { useParams } from "react-router-dom";
 
 

export default function PostDetails() {
const {id} = useParams()
 

function getPostDetails (){

    return axios.get(`https://route-posts.routemisr.com/posts/${id}` , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    
}


const {isError , isLoading , error ,isFetching , data} = useQuery({
    queryKey : ["getSinglePost" , id],
    queryFn : getPostDetails
})

console.log("isFetcing" , isFetching);
 


  if (isLoading){
    return <Loader/>
  }

  
  if (isError){
    return <p>{error.message}</p>
  }


  return (
    <>
   { data?.data.data.post && <Post  post={data?.data.data.post} isPostDetails={true}/> }
    </>
  )
}
