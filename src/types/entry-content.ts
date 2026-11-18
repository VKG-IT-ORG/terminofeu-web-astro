import type { Entry } from './sanity.types.js'

export type EntryContent = NonNullable<NonNullable<Entry['content']>['de']>

export type TermCardContent = EntryContent & {
  terms: NonNullable<EntryContent['terms']>
}
