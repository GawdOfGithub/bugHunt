'use client'
import React from 'react'
import { createTest } from '@/lib/actions/test.action'
import { Button } from '../components/ui/button'
import Pagination from '../components/shared/Pagination'
const page = () => {
  async function tester() {
    try {
      const number = 5
      createTest({reputation:5})
      
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div>
       <Button onClick={tester}>Test me </Button>
    </div>
  )
}

export default page