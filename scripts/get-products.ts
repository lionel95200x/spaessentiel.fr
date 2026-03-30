import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const limit = Number.parseInt(process.argv[2] || process.env.GET_PRODUCTS_LIMIT || '5', 10)

  const res = await payload.find({
    collection: 'products',
    limit,
    where: { _status: { equals: 'published' } },
    overrideAccess: false,
    select: { id: true, title: true, slug: true, priceInUSD: true },
  })

  console.log(JSON.stringify(res.docs, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
