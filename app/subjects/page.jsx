import React from 'react'
import Link from '@node_modules/next/link'

const page = () => {
  return (

    
 <div class="flex flex-col space-y-4 w-full items-start">
        
         <Link href = "/math" 
                className=' border-black border  bg-white text-black  px-4 py-2 rounded w-full text-2xl'>
                    Mathematics
         </Link>
          <Link href = "/physics" 
                className='border-black border  bg-white text-black  px-4 py-2 rounded w-full text-2xl '>
                    Physics
         </Link>
         <Link href = "/chemistry" 
                className='border-black border  bg-white text-black  px-4 py-2 rounded w-full text-2xl '>
                    Chemistry
         </Link>
         
       

      </div>
    
  )
}

export default page