import Fuse from 'fuse.js'
import type { FuseResult } from 'fuse.js'
import persist from '@alpinejs/persist'
import type Alpine from 'alpinejs'

import list from '../terms-list.json'
import { languages } from '../i18n/config'

type SearchTerm = (typeof list)[number] & { flag: string }

const searchTerms = list.map((term): SearchTerm => {
  const language = languages.find(({ code }) => code === term.lang)
  if (!language) {
    throw new Error(`Missing language configuration for "${term.lang}"`)
  }

  return { ...term, flag: language.flag }
})

interface SearchComponent {
  searchResults: FuseResult<SearchTerm>[]
  searchPattern: string
  showBox: boolean
  selectedIndex: number
  entryUrlPrefix: string
  init(): void
  moveUpList(): void
  moveDownList(): void
  goToFiche(): void
}

const fuseOptions = {
  keys: ['term', 'lang'],
  ignoreLocation: true,
  threshold: 0.1,
}

const fuse = new Fuse<SearchTerm>(searchTerms, fuseOptions)

export default (Alpine: Alpine.Alpine) => {
  Alpine.plugin(persist)

  Alpine.store('global', {
    langs: Alpine.$persist(['de', 'fr']).as('languages_display'),
    showWarnPopup: Alpine.$persist(true).as('work_in_progress_acknowledged'),
  })

  Alpine.data<SearchComponent, [string]>(
    'search',
    (entryUrlPrefix: string) => ({
      init() {
        this.$watch('searchPattern', (value: string) => {
          if (!value) {
            this.searchResults = []
            return
          }
          this.showBox = true
          this.searchResults = fuse.search(
            {
              $and: [
                { term: value.trim() },
                {
                  $or: this.$store.global.langs.map((lang: string) => ({
                    lang,
                  })),
                },
              ],
            },
            { limit: 7 },
          )
        })
      },
      searchResults: new Array<FuseResult<SearchTerm>>(),
      searchPattern: '',
      showBox: false,
      selectedIndex: 0,
      entryUrlPrefix,
      moveUpList() {
        this.selectedIndex > 0
          ? this.selectedIndex--
          : (this.selectedIndex = this.searchResults.length - 1)
      },
      moveDownList() {
        this.selectedIndex < this.searchResults.length - 1
          ? this.selectedIndex++
          : (this.selectedIndex = 0)
      },
      goToFiche() {
        if (this.searchResults.length) {
          window.location.href =
            this.entryUrlPrefix +
            this.searchResults[this.selectedIndex].item.slug +
            '/'
        }
      },
    }),
  )
}
