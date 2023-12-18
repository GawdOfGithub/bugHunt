

import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { Input } from "../ui/input"

import { Label } from "../ui/label"

import { Avatar ,
  AvatarFallback,
  AvatarImage,
} from '../ui/avatar'

type Props = 
{
  _id:string,
  name:string,
  username:string,
  email:string,
  bio:string
  picture:string,
  location:{
    city:string,
    country:string
  },
  portfolioWebsite:string,
  reputation:number

}
type Props2 = 
{
  _id:string,
  name:string,
  username:string,
  email:string,
  picture:string,
 

}

// export default function UserCard({_id,name,username,email,bio,picture,location,portfolioWebsite,reputation}:Props)
export default function UserCard({_id,name,username,email,picture,}:Props2)
{
    return(

    <>
<Card className="w-[200px] h-[200px] ">
      <CardHeader>
        <CardTitle>
        <Avatar >
      <AvatarImage src={picture} alt="@shadcn" height="500" width="500" />
      <AvatarFallback >CN</AvatarFallback>
    </Avatar>
    


        </CardTitle>
       
      </CardHeader>
      <CardContent>
        <div className='flex flex-col'>
          
      <div className='font-extrabold '> {name} </div> 
      <div className=''> {email} </div> 
        </div>
      </CardContent>
      <CardFooter className="flex justify-center ">
        <Badge>NEXT</Badge>
        <Badge>REACT</Badge>
        <Badge>JAVA</Badge>
      </CardFooter>
    </Card>
    </>
    )
}