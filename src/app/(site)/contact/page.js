import React from 'react'
import ContactPage from '@/components/contact/contact'
import {Suspense} from "react"; 
const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <ContactPage/>
      </Suspense>
    </div>
  )
}

export default Page
