"use client"
import {useState} from 'react';
import { Button } from '../../ui/button';
import { useSearchParams } from 'next/navigation';

type Props = {
  FilterData: Array<{ name: string }>;
};

function Filter({ FilterData }: Props) {
  const searchParams = useSearchParams()
  const [active, setActive] = useState('');
  const handleTypeClick = (item:string)=>
  {
    if(active === item){
    
  }
  
  return (
    <>
      <div className="flex gap-5 mt-12 max-sm:hidden">
        {FilterData.map((item, index) => (
          <Button key={index} className='px-3 py-3'>
            {item.name}
          </Button>
        ))}
      </div>
    </>
  );
}

export default Filter;
