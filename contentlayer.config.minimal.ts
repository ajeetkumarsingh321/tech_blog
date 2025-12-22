// Minimal test config
import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    draft: { type: 'boolean', required: false, default: false },
    summary: { type: 'string', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog],
})
