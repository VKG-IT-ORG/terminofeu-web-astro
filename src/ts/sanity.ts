import { createClient } from '@sanity/client'

import { defineQuery } from 'groq'

const client = createClient({
  projectId: 'nipfx4rq',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2026-11-10',
})

export async function getUsersGroups() {
  const getUsersGroupsQuery = defineQuery(`
  *[_type == "usersGroup"] | order(designation asc)`)
  return client.fetch(getUsersGroupsQuery)
}

export async function getTerms() {
  const getTermsQuery = defineQuery(`
  *[_type == "entry" && status in ["approved", "validated", "in_force"]] {
      _id,
      "terms_de": content.de.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        },
        "terms_fr": content.fr.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        },
        "terms_it": content.it.terms[] {
                _key,
                designation,
                abbreviation,
                status,
        }
    }`)
  return client.fetch(getTermsQuery)
}

export async function getFiche(entry_id: string) {
  const getFicheQuery = defineQuery(`*[_type == 'entry' && _id == $id][0]`)

  return client.fetch(getFicheQuery, {
    id: entry_id,
  })
}
