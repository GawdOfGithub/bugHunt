import React from 'react'
import Image from 'next/image';
type Props = {
    totalQuestions:number;
    totalAnswers:number;
}
type StatsCardProps = {
    imgUrl:string;
    value:number;
    title:string;
}
const StatsCard = ({imgUrl,value,title}:StatsCardProps) =>
{
    return(
        <div className='flex flex-wrap items-center justify-evenly'>
        <Image src ={imgUrl} alt={title} width={40} height={50}/>
            <p className='semibold'>
            {value}
            </p>
            <p className='semibold'>
            {title}
            </p>
        </div>
    )

}
const Stats = ({totalQuestions,totalAnswers}: Props) => {
  return (
    <div className='mt-10'>
    <h4>Stats</h4>
    <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
        <div className='flex flex-wrap items-center justify-evenly'>
       <div>
        <p className='bold'>{totalQuestions}</p>
        <p>Questions</p>
        
       </div>
       <div>
        <p className='bold'>{totalAnswers}</p>
        <p>Answers</p>
        
       </div>
        </div>
    </div>
    
    </div>
  )
}

export default Stats