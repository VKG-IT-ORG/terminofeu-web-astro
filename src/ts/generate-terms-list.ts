import fs from 'fs'
import { getTerms } from './sanity.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import type { GetTermsQueryResult } from '../types/sanity.types.js'

const slugify = slugifyWithCounter()

type LanguageCode = 'de' | 'fr' | 'it'

interface DesignatedTerm {
  key: string
  entry_id: string
  term: string
  status: string | null
  lang: LanguageCode
}

function removeDuplicates<T extends { entry_id: string; term: string }>(
  arr: T[],
): T[] {
  const seen = new Set()
  return arr.filter((obj) => {
    const key = JSON.stringify([obj.entry_id, obj.term])
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

function getDesignations(
  entries: GetTermsQueryResult,
  lang: LanguageCode,
): DesignatedTerm[] {
  const property: `terms_${LanguageCode}` = `terms_${lang}`
  return entries
    .flatMap((entry) => {
      const terms = entry[property]
      if (!terms) return []

      return terms.flatMap((term): DesignatedTerm[] => {
        if (!term.designation) return []
        const designations: DesignatedTerm[] = [{
          key: 't_' + term._key,
          entry_id: entry._id,
          term: term.designation,
          status: term.status,
          lang,
        }]
        if (term.abbreviation) {
          designations.push({
            key: 'a_' + term._key,
            entry_id: entry._id,
            term: term.abbreviation,
            status: term.status,
            lang,
          })
        }
        return designations
      })
    })
    .filter((term) => term.status !== 'avoid' && term.status !== 'to_be_defined')
}

async function main() {
  console.log('🟡 Fetching content from Sanity...')

  const entries = await getTerms()

  const terms_de = getDesignations(entries, 'de')
  const terms_fr = getDesignations(entries, 'fr')
  const terms_it = getDesignations(entries, 'it')

  const terms = removeDuplicates([...terms_de, ...terms_fr, ...terms_it]).map(
    (term) => ({ slug: slugify(term.term), ...term }),
  )

  fs.writeFileSync(
    'src/terms-list.json',
    JSON.stringify(terms, null, 2),
    'utf-8'
  )

  console.log(`✅ Generated terms-list.json with ${terms.length} entries`)
}

main().catch((err) => {
  console.error('❌ Error generating terms-list.json:', err)
  process.exit(1)
})
