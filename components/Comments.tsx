'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return null
  }

  // Check if required environment variables are missing for Giscus
  if (siteMetadata.comments.provider === 'giscus') {
    const giscusConfig = siteMetadata.comments.giscusConfig
    if (!giscusConfig?.repo || !giscusConfig?.repositoryId || !giscusConfig?.categoryId) {
      return null
    }
  }

  return (
    <>
      {loadComments ? (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      ) : (
        <button 
          onClick={() => setLoadComments(true)}
          className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
        >
          Load Comments
        </button>
      )}
    </>
  )
}
