import { getUserInfo } from '@/lib/actions/user.action'
import React from 'react'
type Props = {
params:{
    userId:string
}
}

const Page = async({params}:Props) => {
    const userInfo = await getUserInfo({userId:params.userId})
  return (
    <div>

    </div>
  )
}

export default Page


