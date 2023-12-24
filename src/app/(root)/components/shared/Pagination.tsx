"use client"
import {Pagination as NextPagination, PaginationItem, PaginationCursor} from "@nextui-org/react";
import { useRouter,useSearchParams } from "next/navigation";
import { formUrl } from "@/lib/utils";
import { Button } from "../ui/button";
export default function Pagination({totalPages}:any) {
  console.log("kum kum");
  console.log(totalPages);

  const router = useRouter()
  const searchParams = useSearchParams()
  const handleMe = (page:any)=>
  {
 const newUrl = formUrl({
      params:searchParams.toString(),
      key:"page",
      value:page


    })
    router.push(newUrl, {scroll:false})
  }
  return (
    <>
    
    <NextPagination total={totalPages} size={"lg"}  initialPage={1} showShadow color={"primary"} variant={"bordered"} onChange={(page)=>{handleMe(page)}} />
    </>
  );
}
//  const handleTypeClick = (item:string)=>
 
     
      
//         const newUrl = formUrl({
//           params:searchParams.toString(),
//           key:'page',
//           value:item.toLocaleLowerCase()
          
//         })
//          router.push(newUrl, {scroll:false})
    
//   }
// }