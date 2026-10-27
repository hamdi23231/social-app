 
import type { PostType } from "../../Types/Post.type";
import Post from "./post";
import Loader from "../../component/loader/Loader";
 
import PostCreation from  "../../component/PostCreation/PostCreation"
  import {Helmet} from "react-helmet";
import usePost from "../../Hooks/usePost";

 


export default function Home() {

 const {data , isLoading , isError ,  error } = usePost()


  if (isLoading){
    return <Loader/>
  }

  
  if (isError){
    return <p>{error.message}</p>
  }

 return (
    <div className="my-8">

    <Helmet>
<title>Home</title>
  

    </Helmet>
      
<div className="">
   <PostCreation/>
</div>

      {data?.data.data.posts.map((post: PostType) => (
        <Post post={post} key={post._id} />
      ))}
       
    </div>
  );
}