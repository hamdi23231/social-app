 import { FaRegImage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
 
import { IoCloseCircle } from "react-icons/io5";
import { useState , useRef } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ImSpinner11 } from "react-icons/im";
import toast from "react-hot-toast";
 
export default function PostCreation() {
const [isUploaded, setisUploaded]  = useState("");
 
const query =useQueryClient()



const textInput = useRef<HTMLTextAreaElement>(null)
const imgInput = useRef<HTMLInputElement>(null)




function createPost(formData: FormData){

     
  return axios.post("https://route-posts.routemisr.com/posts",formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })

    }
const {isPending ,mutate} = useMutation({
mutationFn : createPost,
onSuccess : (res) => {
 if (textInput.current) textInput.current.value = "";
 if (imgInput.current) imgInput.current.value="";



  setisUploaded("")
query.invalidateQueries({queryKey : ["getAllPosts"]})
query.invalidateQueries({queryKey : ["getUserPosts"]})

toast.success(res.data.message)

}

,
onError : (err) => {
  toast.error(err.message)
},
})
 






function handleCreatePost(){
  const formData = new FormData()

if(!textInput.current || !imgInput.current) return

if(textInput.current.value === "" && imgInput.current.value === "")
  return



if(textInput.current.value){
 formData.append("body" , textInput.current.value);
}

if(imgInput.current.value && imgInput.current.files?.[0]){
   formData.append("image" , imgInput.current.files[0]);
}

 
 mutate(formData);

}




function handleImagePreview(e: React.ChangeEvent<HTMLInputElement>){

   const file = e.target.files?.[0]
   if (!file) return

   const path = URL.createObjectURL(file)
    setisUploaded(path )
}

function handleRemoveImage(){
  setisUploaded("")
  if (imgInput.current) imgInput.current.value = ""
}

return (
    <div>
      <div className="mx-auto mb-6 w-full max-w-xl rounded-2xl bg-white p-4 shadow-md">
      {/* Text input */}
      <textarea
      ref={textInput}
        rows={2}
        placeholder="What's on your mind?"
        className="w-full rounded-full bg-gray-100 px-5 py-3 text-sm text-gray-800 outline-none transition focus:ring-2 focus:ring-blue-500"
      />
{isUploaded &&(<div className="relative">
    
      <img src={isUploaded} alt="" className="w-full h-auto rounded-lg" />
      <IoCloseCircle onClick={handleRemoveImage}
      className="absolute top-[10px] end-[10px] size-8 text-white cursor-pointer"/>
</div>) }
 
      <div className="mt-3 flex items-center justify-between">
        {/* Image input */}
        <input ref={imgInput} id="post-image" type="file" accept="image/*" className="hidden" onChange={handleImagePreview} />
        <label
          htmlFor="post-image"
          className="flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-green-600 transition hover:bg-green-50"
        >
          <FaRegImage size={20} />
          Add imge
        </label>
 
        <button

        disabled ={isPending}
        onClick={() => handleCreatePost()}
          type="button"
          className="disabled:bg-slate-900 disabled:cursor-not-allowed flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
{isPending ? (
 <ImSpinner11 className="animate-spin"/>
  
) : (

      <>   
          <IoSend size={16} />
  Create Post
  </>
)}

        </button>
      </div>
    </div>
    </div>
  )
}