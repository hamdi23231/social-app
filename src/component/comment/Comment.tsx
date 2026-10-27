 import axios from "axios"
import type {CommentType} from "../../Types/Comment.Type"
import toast from "react-hot-toast"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
 import { FaEdit } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { HiDotsVertical } from "react-icons/hi" 
export default function Comment({ comment }: { comment: CommentType }) {


//////////////////////////////////////////
const {  _id: userId} = comment.commentCreator;
const [isOpen, setisOpen] = useState(false)
const {userId : loginUserId} = useContext(AuthContext )
const [isEditing, setIsEditing] = useState(false)  
const [newBody, setNewBody] = useState(comment.content ?? "")  
const query = useQueryClient()
 



  function handleDeleteComment(){
      return axios.delete(`https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`,{
      headers :{Authorization:`Bearer ${localStorage.getItem("userToken")}`}
     })}
      
const { isPending:isDeleting , mutate:deleteComment} = useMutation({
  mutationFn:handleDeleteComment,
  onSuccess:(res) => { 
    toast.success(res.data.message)
    query.invalidateQueries({queryKey : ["postComments" , comment.post]});
    query.invalidateQueries({queryKey: ["getAllPosts"]})
    setisOpen(false)    
  },
  onError:(err) => {
    toast.error(err.message)
   },
  onSettled: () => {},
})
   





  function handleUpdateComment(updatedBody: string){
    const fromData = new FormData()
    fromData.append("content" , updatedBody)
    
  return axios.put(
    `https://route-posts.routemisr.com/posts/${comment.post}/comments/${comment._id}`,
   fromData, 
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  )
}
  const  { isPending:isUpdating , mutate:updateComment} = useMutation({
  mutationFn:handleUpdateComment,
  onSuccess:(res) => { 
    toast.success(res.data.message)
    query.invalidateQueries({queryKey : ["getAllPosts"]});
    query.invalidateQueries({queryKey : ["postComments",comment.post]});  
    setIsEditing(false)  
    setisOpen(false)  
  },
  onError:(err) => {
    toast.error(err.message)
   },
  onSettled: () => {},
})




//////////////////////////////////////////
  return (
    <div className="my-2 p-4 bg-slate-100 rounded-sm">
      <div className="flex items-center  gap-4 w-full">
        <img
          src={comment?.commentCreator?.photo}
          className="w-10 h-10 rounded-full border-2 border-white"
          alt={comment?.commentCreator?.name}
        />
        <div>
          <p className="font-bold">{comment?.commentCreator?.name}</p>
          <p className="text-sm text-slate-500">
            {comment?.createdAt}
          </p>
        </div>
<div className="relative ms-auto">

  {
    loginUserId===userId &&
    <HiDotsVertical onClick={() => setisOpen(!isOpen)} className="font-bold text-2xl cursor-pointer"/>
  }

{isOpen && (
<div className="bg-white p-2 rounded-lg absolute top-[120%] end-[-80px] shadow-2xl border-slate-400 border-2">
  <ul className="flex flex-col gap-3">
    <li>
       <button
     onClick={() => { setNewBody(comment.content ?? ""); setIsEditing(true); setisOpen(false) }} className="flex gap-2 items-center cursor-pointer bg-slate-100 p-2">  
       Edit
        <FaEdit/>

     
    </button>
    </li>
    <li>
     
     <button 
     disabled={isDeleting}
     onClick={() => deleteComment()} className="disabled:text-white disabled:bg-slate-900  disabled:cursor-not-allowed flex gap-2 w-full items-center cursor-pointer justify-center   bg-slate-100 p-2">
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
               onClick={() => updateComment(newBody)}
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
         comment?.content && <p className="mb-4">{  comment.content }</p>
       )}
        {comment.image && <img src={comment.image} className="rounded-xl w-full" alt="" />}
      </div>

    </div>
  );
}