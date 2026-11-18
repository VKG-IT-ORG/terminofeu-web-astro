import type { GetFichesQueryResult } from './sanity.types.js'

type EntryLanguages = NonNullable<GetFichesQueryResult[number]['content']>
type EntryContent = NonNullable<EntryLanguages[keyof EntryLanguages]>

export type TermCardContent = EntryContent & {
  terms: NonNullable<EntryContent['terms']>
}
