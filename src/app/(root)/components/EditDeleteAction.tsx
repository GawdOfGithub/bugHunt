"use client"
import Image from "next/image"
interface Props{
    type:string
    itemId:string
}
const EditDeleteAction = ({type,itemId}:Props)=>
{
    const handleDelete = ()=>
    {
        if(type=="Question")
        {

        }
        else if(type=="Answer")
        {
            
        }
    

    }
    const handleEdit = ()=>
    {

    }

    return (
        <div className="flex items-center justify-end gap-3 max-sm:full ">
            {type=='Question' &&
          (  <Image
            src=""
            alt="Edit"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
            onClick={handleEdit}/>)
    }

<Image
            src=""
            alt="Edit"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
            onClick={handleDelete}/>)
        </div>
    )
}
