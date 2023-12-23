import getUserById, { getUserInfo } from '@/lib/actions/user.action'
import React from 'react'
import Image from 'next/image'
import { SignedIn, auth } from '@clerk/nextjs'
import { Button } from '@/app/(root)/components/ui/button'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getJoinedDate } from '@/lib/utils'
import ProfileLink from '@/app/(root)/components/shared/ProfileLink'
import Stats from '../stats'
import QuestionTab from '@/app/(root)/components/shared/QuestionTab'
import AnswerTab from '@/app/(root)/components/shared/AnswerTab'

type Props = {
  params: {
    id: string
  }
}

const Page = async ({ params }: Props) => {

  try {
    console.log(params);
    const { userId: clerkId } = auth()

    const userInfo = await getUserInfo({ userId: params.id })

    const user = await getUserById({ userId: params.id })

    return (
      <>
        <div className='flex items-center justify-between sm:flex-row mt-8'>
          <Image
            src={userInfo?.user.picture}
            alt="profile picture"
            width={140}
            height={140}
            className='rounded-full object-cover'
          />

          <div className='ml-5'>
            <h2 className='text-3xl font-bold'>{userInfo?.user.name}</h2>
            <p className='text-gray-500'>@{userInfo?.user.username}</p>
            <div className='mt-2 flex flex-wrap items-center gap-2 text-gray-500'>
              {userInfo?.user.location && (
                <ProfileLink
                  imgUrl=''
                  href={userInfo?.user.portfolioWebsite}
                  title='Portfolio' />
              )}
              {getJoinedDate(userInfo?.user.joinedAt)}
            </div>
            {userInfo?.user.bio && (
              <p className='mt-3 text-gray-600'>
                {userInfo.user.bio}
              </p>
            )}
            <div className='flex justify-end mt-3'>
              <SignedIn>
                {clerkId === userInfo?.user.clerkId && (
                  <Link href="/profile/image">
                    <Button className='btn-secondary min-h-[46px] min-w-[175px] px-4 py-3'>
                      Edit Profile
                    </Button>
                  </Link>
                )}
              </SignedIn>
            </div>
          </div>
        </div>

        <Stats
          totalQuestions={userInfo?.totalQuestions}
          totalAnswers={userInfo?.totalAnswers}
        />

        <div className='mt-10'>
          <Tabs defaultValue="top-posts" className="flex-1">
            <TabsList className='flex space-x-6'>
              <TabsTrigger value="top-posts" className='tab'>Questions</TabsTrigger>
              <TabsTrigger value="answers" className='tab'>Answers</TabsTrigger>
            </TabsList>
            <div className='mt-5'>
              <TabsContent value="top-posts">
                <QuestionTab user={userInfo?.user._id} />
              </TabsContent>
              <TabsContent value="answers">
                <AnswerTab user={userInfo?.user._id} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </>
    )
  }
  catch (error) {
    console.log(error);
  }
}

export default Page
