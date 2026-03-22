import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

import { Media as MediaComponent } from '@/components/Media'
import { BlogSection, BlogGrid, BlogCard } from '@/components/ui/blog-layout'

export const metadata: Metadata = {
  title: 'Blog — Spa Essentiel',
  description: 'Conseils, inspirations et guides autour du sauna, du balnéo et du bien-être à domicile.',
}

export const dynamic = 'force-static'
export const revalidate = 600

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    overrideAccess: false,
    limit: 100,
    pagination: false,
    sort: '-publishedOn',
    where: {
      _status: { equals: 'published' },
    },
    select: {
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedOn: true,
    },
    depth: 1,
  })

  return (
    <BlogSection title="Le Blog" subtitle="Conseils, inspirations & bien-être à domicile">
      {posts.docs.length > 0 ? (
        <BlogGrid>
          {posts.docs.map((post) => {
            const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
            const date = post.publishedOn
              ? format(new Date(post.publishedOn), 'd MMMM yyyy', { locale: fr })
              : null

            return (
              <BlogCard
                key={post.id}
                href={`/blog/${post.slug}`}
                image={
                  image ? (
                    <MediaComponent
                      resource={image}
                      imgClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : undefined
                }
                date={date}
                dateTime={post.publishedOn}
                title={post.title}
                excerpt={post.excerpt}
              />
            )
          })}
        </BlogGrid>
      ) : (
        <p className="text-center text-muted-foreground">Aucun article pour le moment.</p>
      )}
    </BlogSection>
  )
}
