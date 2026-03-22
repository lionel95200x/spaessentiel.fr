import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { Media as MediaComponent } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import { BlogArticle } from '@/components/ui/blog-layout'

type Args = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: { slug: true },
  })

  return posts.docs.map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const post = await queryPostBySlug({ slug })

  if (!post) return {}

  return generateMeta({ doc: post })
}

export default async function BlogPostPage({ params }: Args) {
  const { slug } = await params
  const post = await queryPostBySlug({ slug })

  if (!post) return notFound()

  const featuredImage = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const date = post.publishedOn
    ? format(new Date(post.publishedOn), 'd MMMM yyyy', { locale: fr })
    : null

  return (
    <BlogArticle
      title={post.title}
      date={date}
      excerpt={post.excerpt}
      featuredImage={
        featuredImage ? (
          <MediaComponent
            resource={featuredImage}
            imgClassName="absolute inset-0 h-full w-full object-cover"
          />
        ) : undefined
      }
    >
      <RenderBlocks blocks={post.layout} />
    </BlogArticle>
  )
}

const queryPostBySlug = async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' } }]),
      ],
    },
  })

  return result.docs?.[0] ?? null
}
