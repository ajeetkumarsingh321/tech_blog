import { defineDocumentType, makeSource } from 'contentlayer2/source-files'

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    lastmod: { type: 'date' },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    authors: { type: 'list', of: { type: 'string' }, default: ['default'] },
    structuredData: { type: 'json' },
    layout: { type: 'string' },
    toc: { type: 'json' },
  },
  computedFields: {
    slug: {
      type: 'string' as const,
      resolve: (doc: any) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    path: {
      type: 'string' as const,
      resolve: (doc: any) => doc._raw.flattenedPath,
    },
    filePath: {
      type: 'string' as const,
      resolve: (doc: any) => doc._raw.sourceFilePath,
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    facebook: { type: 'string' },
    linkedin: { type: 'string' },
  },
  computedFields: {
    slug: {
      type: 'string' as const,
      resolve: (doc: any) => doc._raw.flattenedPath.replace('authors/', ''),
    },
  },
}))

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Authors],
})
