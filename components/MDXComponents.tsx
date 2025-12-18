import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import NewsletterForm from './NewsletterForm'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm: NewsletterForm, // Replace with our static-safe form
  NewsletterForm, // Also make it available as NewsletterForm
}
