'use client'

import { Comments as CommentsComponent } from 'pliny/comments'
import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

export default function Comments({ slug }: { slug: string }) {
  const [loadComments, setLoadComments] = useState(false)

  if (!siteMetadata.comments?.provider) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>Comments are currently disabled.</p>
        <p className="text-sm mt-2">
          To enable comments, configure Giscus in your environment variables.
        </p>
      </div>
    )
  }

  // Check if required environment variables are missing for Giscus
  if (siteMetadata.comments.provider === 'giscus') {
    const giscusConfig = siteMetadata.comments.giscusConfig
    if (!giscusConfig?.repo || !giscusConfig?.repositoryId || !giscusConfig?.categoryId) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400">
          <p>Comments configuration is incomplete.</p>
          <p className="text-sm mt-2">
            Please configure Giscus environment variables in your .env.local file.
          </p>
        </div>
      )
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
