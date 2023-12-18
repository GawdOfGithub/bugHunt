'use client'
import Prism from 'prismjs'
import parse from 'html-react-parser'
import "prismjs/components/prism-python"
import "prismjs/components/prism-java"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-c"
import "prismjs/components/prism-json"
import "prismjs/components/prism-typescript"
import "prismjs/components/prism-cpp"
import { useEffect } from 'react'

type Props = {
    data:string
}

const ParseHTML = ({data}: Props) => {
    useEffect(()=>
    {
        Prism.highlightAll()
    },[data])
  return (
    <div>
        {parse(data)}
    </div>
  )
}

export default ParseHTML