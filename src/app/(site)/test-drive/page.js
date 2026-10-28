TestDrivePage

import React from 'react'
import TestDrivePage from '@/components/test-drive/test-drive'
import {Suspense} from "react"; 
const Page = () => {
  return (
    <div>
      <Suspense fallback={<div>جارٍ التحميل...</div>}>
        <TestDrivePage/>
      </Suspense>
    </div>
  )
}

export default Page
