import fs from 'fs'
import { getTerms } from './sanity.js'
import { slugifyWithCounter } from '@sindresorhus/slugify'

const slugify = slugifyWithCounter()

function removeDuplicates(arr) {
  const seen = new Set()
  return arr.filter((obj) => {
    // Create a string key by combining the values of entry_id and term
    const key = JSON.stringify([obj.entry_id, obj.term])
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

function getDesignations(entries = [], lang) {
  const property = 'terms_' + lang
  return entries
    .flatMap((entry) => {
      if (!entry[property]) {
        return []
      }
      return entry[property].flatMap((term) => {
        const designations = [
          {
            key: 't_' + term._key,
            entry_id: entry._id,
            term: term.designation,
            status: term.status,
            lang,
          },
        ]
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
    .filter((t) => t.status !== 'avoid' && t.status !== 'to_be_defined')
}

async function main() {
  console.log('🟡 Fetching content from Sanity...')

  const entries = await getTerms()

  const terms_de = getDesignations(entries, 'de')
  const terms_fr = getDesignations(entries, 'fr')
  const terms_it = getDesignations(entries, 'it')

  const terms = removeDuplicates([...terms_de, ...terms_fr, ...terms_it]).map(
    (t) => ({
      slug: slugify(t.term),
      ...t,
    })
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
