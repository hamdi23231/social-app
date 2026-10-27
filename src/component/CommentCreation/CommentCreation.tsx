 import { FaCommentAlt } from "react-icons/fa";
 import { CiImageOn } from "react-icons/ci";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ImSpinner2 } from "react-icons/im"


export default function CommentCreation({postId , queryKey}: {postId : string  , queryKey : string[]}){

    const form = useForm({
       defaultValues: {
        content:"",
        image:""
       } 
    })


const queryClient = useQueryClient()


    const {register , handleSubmit , reset} = form;

  
    function createComment(formdata : FormData){
        return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments` ,
            formdata ,{
            headers : {Authorization : `Bearer ${localStorage.getItem("userToken")}`}}
        )
    }
 
    const { isPending , mutate} = useMutation({
        mutationFn: createComment,
        onSuccess :() =>{
             queryClient.invalidateQueries({queryKey : ["postComments" ,postId]});
            queryClient.invalidateQueries({queryKey : queryKey })
            queryClient.invalidateQueries({ queryKey: ["getUserPosts"] })


        reset()
        },

        onError : (err) => {
            console.log(err);
            
        },


    })

   

function handleCreateComment(values: {content : string, image:string}){
 

      const file = values.image?.[0]
    if(!values.content && !file)
        return

       const formdata = new FormData()


    if (values.content){
        formdata.append("content" , values.content)
    }

    
    if (file){
        formdata.append("image" ,  file)
    }

    mutate(formdata)

}


  return (
    <div className="bg-white p-3 my-4">
 <form className="max-w-md mx-auto " onSubmit={handleSubmit(handleCreateComment)}>   
 
  <div className="relative">
    
    <input 
    {...register("content")}
    type="text" id="search" className="block rounded-lg w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder=" add Comment" required />
    <button
    disabled={isPending}
    type="submit" className="
    
    disabled:bg-slate-900 disabled:cursor-not-allowed
    absolute cursor-pointer top-[50%] end-[10px] translate-y-[-50%] text-white bg-blue-600 hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">
       {isPending ? <ImSpinner2  className="animate-spin"/> :  <FaCommentAlt />} 
        
       </button>
  </div>

<label className="block my-2 bg-blue-500  hover:bg-blue-600 p-2 flex justify-center text-white cursor-pointer">
    <CiImageOn className="size-5 "/>

    <input type="file"  hidden  {...register("image")}/>
</label>
  
</form>

    </div>
  )
}
