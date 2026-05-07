export type SortFilterItem = {
  reverse: boolean
  slug: null | string
  title: string
}

export const defaultSort: SortFilterItem = {
  slug: null,
  reverse: false,
  title: 'Tri de A à Z',
}

export const sorting: SortFilterItem[] = [
  defaultSort,
  { slug: '-createdAt', reverse: true, title: 'Derniers ajouts' },
  { slug: 'priceInUSD', reverse: false, title: 'Prix : croissant' }, // asc
  { slug: '-priceInUSD', reverse: true, title: 'Prix : décroissant' },
]
