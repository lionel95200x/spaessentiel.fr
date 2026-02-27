export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Alphabetic A-Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Derniers ajouts' },
  { slug: 'priceInUSD', reverse: false, title: 'Prix: Low to high' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Prix: High to low' },
]
