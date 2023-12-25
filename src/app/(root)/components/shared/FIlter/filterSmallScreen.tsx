"use client"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select"
  import {useState,useEffect} from 'react'
  import { formUrl } from "@/lib/utils";
import { useSearchParams,useRouter } from "next/navigation";
  

  type Props = {
    FilterData: Array<{ name: string }>;
  };
  const FilterSmallScreen = ({FilterData}: Props) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [active, setActive] = useState('');
    const [filter,setFilter] = useState('')
    const handleTypeClick = (item:string)=>
    {
      if(active === item){
        setActive("")
        const newUrl = formUrl({
          params:searchParams.toString(),
          key:'filter',
          value:null
          
        })
        router.push(newUrl, {scroll:false})
      }
      else{
        setActive(item)
        console.log(active);
        
          const newUrl = formUrl({
            params:searchParams.toString(),
            key:'filter',
            value:item.toLocaleLowerCase()
            
          })
           router.push(newUrl, {scroll:false})
      
    }

  }
  const dip = ()=>
  {
    console.log("dip");
  }
 
    return (
        <div className="sm:hidden w-screen relative z-10 mb-3 ">
        <Select  onValueChange={(value) => handleTypeClick(value)} defaultValue="">
         
        <SelectTrigger className="w-screen bg-gray-100 text-black">
          <SelectValue placeholder="Select a filter" />
        </SelectTrigger>
        <SelectContent className=" mb-96" >
          {
            FilterData.map((item,index)=>
            (
                <SelectItem key={index} value={item.name}>{item.name}   </SelectItem>
            ))
          }
        </SelectContent>
       
       
      </Select>
      </div>
    )
  }
 export default FilterSmallScreen