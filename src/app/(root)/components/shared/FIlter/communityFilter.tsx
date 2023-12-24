"use client"
import {useState} from 'react';
import { Button } from '../../ui/button';
import { useSearchParams,useRouter } from 'next/navigation';
import { formUrl } from '@/lib/utils';

type Props = {
  FilterData: Array<{ name: string,value:string }>;
};

function CommunityFilter({ FilterData }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [active, setActive] = useState('');
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
  
  return (
    <>
      <div className="flex gap-5 mt-12 max-sm:hidden">
        {FilterData.map((item, index) => (
          <Button key={index} className='px-3 py-3' onClickCapture={()=> handleTypeClick(item.value)}>
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
}

export default CommunityFilter;
