import { Badge } from '../ui/badge';
import React from 'react'
import Link from 'next/link';
type Props = {
    totalQuestions:number;
  
    name:string,
    _id:number

}

function RenderTags({totalQuestions,name,_id}: Props) {
  return (
    <>
    <div className='flex justify-between mb-2 mr-3'>
      <div>
        <Link href={`/tags/${_id}`}>
   <Badge variant="outline">{name}</Badge>
   </Link>
   </div>
   <div>
    {totalQuestions}
    </div>
    </div>
    </>
  )
}

export default RenderTags