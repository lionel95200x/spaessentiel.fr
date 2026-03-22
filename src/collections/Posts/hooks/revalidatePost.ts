import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Post } from '../../../payload-types'

export const revalidatePost: CollectionAfterChangeHook<Post> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating post at path: /blog/${doc.slug}`)
      revalidatePath(`/blog/${doc.slug}`)
      revalidatePath('/blog')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old post at path: /blog/${previousDoc.slug}`)
      revalidatePath(`/blog/${previousDoc.slug}`)
      revalidatePath('/blog')
    }
  }
  return doc
}

export const revalidateDeletePost: CollectionAfterDeleteHook<Post> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidatePath(`/blog/${doc?.slug}`)
    revalidatePath('/blog')
  }
  return doc
}
