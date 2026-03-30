import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload } }) => {
  payload.logger.info('Revalidating header cache')
  revalidateTag('global_header')
  return doc
}
