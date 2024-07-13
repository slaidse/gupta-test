'use client'

import { useState, useEffect } from 'react'
import { useSearchParams} from 'next/navigation'
import Profile from '@components/Profile'


const UserProfile = ({params}) => {


    const searchParams = useSearchParams();
    const userName = searchParams.get("name")
    const [userPosts, setUserPosts] = useState([])

    
    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${params.id}/posts`)
          const data = await response.json();
          setUserPosts(data)
        }
    
        if (params?.id ) {fetchPosts();}
      }, [params.id])

    // const handleEdit = (post) => {
    //  router.push(`/update-prompt?id=${post._id}`)
    // }

    
    // const handleDelete= async (post) => {
    //   const hasConfirmed = confirm ("Are you sure you want to delete this prompt")
    //   if (hasConfirmed){
    //     try {
    //       await fetch(`/api/prompt/${post._id.toString()}`, {
    //         method : 'DELETE'
    //       })

    //       const filteredPost = posts.filter((p) => 
    //         p._id !== post._id
    //       )

    //       console.log(filteredPost)
          
    //       setPosts(filteredPost)
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    // }

  return (
    <Profile
    name = {userName}
    desc = {`Welcome to ${userName} personalized profile page`}
    data = {userPosts}
    />
  )
}

export default UserProfile