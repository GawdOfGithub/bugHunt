'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {useEffect, useState} from 'react'
const GlobalResult = ()=>
{
    const searchParams = useSearchParams()
    const [isLoading,setIsLoading] = useState(false)
    const [result, setResult] = useState([
        { type:'question',id:1,title:'Next js'},
        { type:'question',id:2,title:'Next js'},
    ]);
    
    const global = searchParams.get('global')
    const type = searchParams.get('type')
    useEffect(()=>
    {
        const fetchResult = async()=> {
            setResult([
                
              
                
            ])
          try {
            
          } catch (error) {
            console.error(error);
          }
        }

    }, [global,type,result])
    const renderLink = (type:string,id:string)=>
    {
        return "/"
    }

return(
    <div className='absolute top-full z-10 mt-3 w-full rounded-xl bg-light-800 py-5 shadow-sm dark:bg-black'>
<p className='font-semibold py-5'>
    Filters
</p>
<p className='font-semibold px-5'>
    Top match
</p>
{isLoading?(
    <div>
        Loading
        <p>Browsing the entire database</p>
        </div>
):(
    <div className='flex flex-col gap-2'>
        {result.length>0?
        (
            result.map((item:any,index:number)=>(
                <Link
                href={renderLink('type','id') }
                key={item.type + item.id + index}>
                </Link>
                
            ))
        ):(
            <>
            <div className='flex-center flex-col px-5' >
                <p className='px-5 py-2.5'>
            Oops no result found
            </p>
            </div>
            </>
        )}
        </div>
)}
    </div>
)
}
//12 min 49 sec