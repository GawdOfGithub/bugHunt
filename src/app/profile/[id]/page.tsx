import { getUserInfo } from '@/lib/actions/user.action'
import React from 'react'
import Image from 'next/image'
import {SignedIn, auth} from '@clerk/nextjs'
import { Button } from '@/app/(root)/components/ui/button'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from '@/lib/utils'
import ProfileLink from '@/app/(root)/components/shared/ProfileLink'
import Stats from '../stats'

type Props = {
params:{
    userId:string
}
}

const Page = async({params}:Props) => {
    const {userId:clerkId} = auth()

    const userInfo = await getUserInfo({userId:params.userId})
    console.log(userInfo);
  return (
    <>
    <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <Image
        src={userInfo?.user.picture}
        alt="profile picture"
        width={140}
        height={140}
        className='rounded-full object-cover'
        />

    </div>
    <div className='mt-3'>
        <h2 className='bold'>{userInfo?.user.name}</h2>
        <p>@{userInfo?.user.userName}</p>
        <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
        {userInfo?.user.location &&(
            <ProfileLink 
            imgUrl=''
            href={userInfo?.user.portfolioWebsite}
            title='Portfolio'/>

        )}
        {getJoinedDate(userInfo?.user.joinedAt)}
        </div>
        {userInfo?.user.bio && (
            <p>
            {userInfo.user.bio}
            </p>
        )}
        <div className='flex justify-end mx-sm:mb-5 max-sm:w-full sm:mt-3'>
        <SignedIn>
            {clerkId === userInfo?.user.clerkId &&
            <Link href="/profile/image">
                <Button className='btn-secondary min-h-[46px] min-w-[175px] px-4 py-3' >
                    Edit Profile
                </Button>
            </Link>
            }
        </SignedIn>
        </div>
        <Stats 
        totalQuestions={userInfo?.totalQuestions}
        totalAnswers={userInfo?.totalAnswers}/>
        <div className='mt-10 flex gap-10'></div>
        <Tabs defaultValue="top-posts" className="flex-1">
  <TabsList>
    <TabsTrigger value="top-posts" className='tab'>Account</TabsTrigger>
    <TabsTrigger value="answers" className='tab'>Password</TabsTrigger>
  </TabsList>
  <TabsContent value="top-posts">Posts</TabsContent>
  <TabsContent value="answers">Answers</TabsContent>
</Tabs>


    </div>
    </>
  )
}

export default Page


