'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import Form from '@components/Form'


const createPrompt = () => {

    const [submitting,setSubmitting] = useState(false);
    const [post,setPost] = useState({
        prompt: '',
        tag: '',
    })

    const createPrompt = async (e) => {

    }
 
  return (
    <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
    />
  )
}

export default createPrompt