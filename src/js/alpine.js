import Fuse from 'fuse.js'
import persist from '@alpinejs/persist'

import list from '../terms-list.json'

const fuseOptions = {
  keys: ['term', 'lang'],
  ignoreLocation: true,
  threshold: 0.1,
}

const fuse = new Fuse(list, fuseOptions)

export default (Alpine) => {
  Alpine.plugin(persist)

  Alpine.store('global', {
    langs: Alpine.$persist(['de', 'fr']).as('languages_display'),
    showWarnPopup: Alpine.$persist(true).as('work_in_progress_acknowledged'),
  })

  Alpine.data('search', () => ({
    init() {
      this.$watch('searchPattern', (value) => {
        if (!value) {
          this.searchResults = []
          return
        }
        this.showBox = true
        this.searchResults = fuse.search(
          {
            $and: [
              { term: value.trim() },
              { $or: this.$store.global.langs.map((lang) => ({ lang })) },
            ],
          },
          { limit: 7 },
        )
      })
    },
    searchResults: [],
    searchPattern: '',
    showBox: false,
    selectedIndex: 0,
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
        window.location.href = `/eintrag/${
          this.searchResults[this.selectedIndex].item.slug
        }/`
      }
    },
  }))
}
