import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import type { PostType } from "../../Types/Post.type";
import Comment from "../../component/comment/Comment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../component/loader/Loader";
import type { CommentType } from "../../Types/Comment.Type";
import CommentCreation from "../../component/CommentCreation/CommentCreation";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
 import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast from "react-hot-toast";

export default function Post({ 
  post ,isPostDetails = false}:
   { post: PostType ,isPostDetails? : boolean}) {
  
  
  
  const { body, image, user, createdAt, topComment , _id} = post;
  const { name, photo , _id: userId} = user;
const {userId : loginUserId} = useContext(AuthContext )

const query = useQueryClient()
const navigate =useNavigate()

const [isOpen, setisOpen] = useState(false)
const [isEditing, setIsEditing] = useState(false)
const [newBody, setNewBody] = useState(body ?? "")
 

  
  function handleDeletePost(){
      return axios.delete(`https://route-posts.routemisr.com/posts/${_id}`,{
      headers :{Authorization:`Bearer ${localStorage.getItem("userToken")}`}
     })}
      
const  { isPending:isDeleting , mutate:deletePost} = useMutation({
  mutationFn:handleDeletePost,
  onSuccess:(res) => { 
    toast.success(res.data.message)
    query.invalidateQueries({queryKey : ["getAllPosts"]});
    query.invalidateQueries({queryKey : ["getUserPosts"]}); // جديد
    navigate("/")
  },
  onError:(err) => {
    toast.error(err.message)
   },
  onSettled: () => {},
})









  function handleUpdatePost(updatedBody: string){
  return axios.put(
    `https://route-posts.routemisr.com/posts/${_id}`,
    { body: updatedBody },
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  )
}
      
const  { isPending:isUpdating , mutate:updatePost} = useMutation({
  mutationFn:handleUpdatePost,
  onSuccess:(res) => { 
    toast.success(res.data.message)
    query.invalidateQueries({queryKey : ["getAllPosts"]});
    query.invalidateQueries({queryKey : ["getUserPosts"]}); // جديد
    query.invalidateQueries({queryKey : ["postComments", _id]});
    setIsEditing(false)
    setisOpen(false)
  },
  onError:(err) => {
    toast.error(err.message)
   },
  onSettled: () => {},
})



function getPostComments() {
  return axios.get(
    `https://route-posts.routemisr.com/posts/${_id}/comments?page=1&limit=10`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );
}

   const { data, isError, isLoading, error } = useQuery({
  queryKey: ["postComments", _id],
  queryFn: getPostComments,
  enabled : isPostDetails,
});
   
 
  
  
    if (isLoading){
      return <Loader/>
    }
  
    
    if (isError){
      return <p>{error.message}</p>
    }

    
    

  return (
    <div className="w-[600px] mx-auto bg-slate-300 p-4 rounded-lg my-6">
      <div className="flex items-center gap-3 justify-between">
       <div className="flex gap-4 items-center">
      
         <img
          src={photo}
          className="w-10 h-10 rounded-full border-2 border-white"
          alt={name}
        />
        <div>
          <p className="font-bold">{name}</p>
          <p className="text-sm text-slate-500">
            {createdAt}
          </p>
        </div>
       </div>
<div className="relative">

  {
    loginUserId===userId &&
    <HiDotsVertical onClick={() => setisOpen(!isOpen)} className="font-bold text-2xl cursor-pointer"/>
  }

{isOpen && (
<div className="bg-white p-2 rounded-lg absolute top-[120%] end-[-80px] shadow-2xl border-slate-400 border-2">
  <ul className="flex flex-col gap-3">
    <li>
       <button
     onClick={() => { setNewBody(body ?? ""); setIsEditing(true); setisOpen(false) }} className="flex gap-2 items-center cursor-pointer bg-slate-100 p-2">
      
       Edit
        <FaEdit/>

     
    </button>
    </li>
    <li>
     
     <button 
     disabled={isDeleting}
     onClick={() => deletePost()} className="disabled:text-white disabled:bg-slate-900  disabled:cursor-not-allowed flex gap-2 w-full items-center cursor-pointer justify-center   bg-slate-100 p-2">
       {isDeleting ? (<AiOutlineLoading3Quarters className="animate-spin"/> ):( <>
       Delete
      <MdDelete /></>)}
     
     </button>
    </li>
  </ul>
</div>

)}

</div>

      </div>

      <div className="p-4">
       {isEditing ? (
         <div className="mb-4">
           <textarea
             value={newBody}
             onChange={(e) => setNewBody(e.target.value)}
             className="w-full p-2 rounded-lg border-2 border-slate-400 bg-white"
             rows={4}
           />
           <div className="flex gap-2 mt-2">
             <button
               disabled={isUpdating || !newBody.trim()}
               onClick={() => updatePost(newBody)}
               className="flex gap-2 items-center justify-center bg-slate-900 text-white p-2 rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
               {isUpdating ? <AiOutlineLoading3Quarters className="animate-spin"/> : "Save"}
             </button>
             <button
               disabled={isUpdating}
               onClick={() => setIsEditing(false)}
               className="bg-slate-100 p-2 rounded-lg cursor-pointer">
               Cancel
             </button>
           </div>
         </div>
       ) : (
         body && <p className="mb-4">{body}</p>
       )}
        {image && <img src={image} className="rounded-xl w-full" alt="" />}
      </div>

      <div className="p-4 flex justify-between bg-slate-200 rounded-sm">
        <div className="font-bold cursor-pointer flex gap-2 items-center">
          Like <AiFillLike />
        </div>
       <Link to={`/PostDetails/${_id}`}>
        <div className="font-bold cursor-pointer flex gap-2 items-center">
          Comments <FaCommentAlt />
        </div>
       </Link>
        <div className="font-bold cursor-pointer flex gap-2 items-center">
          Shares <IoIosShareAlt />
        </div>
      </div>


<CommentCreation postId={_id} queryKey={isPostDetails ? ["postComments", _id] : ["getAllPosts"]}/>

      {!isPostDetails && topComment && <Comment comment={topComment} />}


{isPostDetails && 
data?.data.data.comments &&
data?.data.data.comments.map((comment: CommentType)=>
(<Comment key={comment._id} comment={comment}/>)
)
}



    </div>
  );
}