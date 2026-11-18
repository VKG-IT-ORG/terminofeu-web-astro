export const languages = [
  {
    name: 'Deutsch',
    code: 'de',
    flag: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-de" viewBox="0 0 640 480"><script xmlns=""/> <path fill="#fc0" d="M0 320h640v160H0z"/> <path fill="#000001" d="M0 0h640v160H0z"/><path fill="red" d="M0 160h640v160H0z"/></svg>',
  },
  {
    name: 'français',
    code: 'fr',
    flag: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-fr" viewBox="0 0 640 480"><script xmlns=""/><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#000091" d="M0 0h213.3v480H0z"/><path fill="#e1000f" d="M426.7 0H640v480H426.7z"/></svg>',
  },
  {
    name: 'italiano',
    code: 'it',
    flag: '<svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-it" viewBox="0 0 640 480"><script xmlns=""/><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h640v480H0z"/><path fill="#009246" d="M0 0h213.3v480H0z"/><path fill="#ce2b37" d="M426.7 0H640v480H426.7z"/></g></svg>',
  },
] as const

export const defaultLocale = 'de'

export const locales = Object.fromEntries(
  languages.map(({ code }) => [code, `${code}-CH`]),
)

const ui = {
  de: {
    'footer.about': 'Über Terminofeu',
    'footer.description':
      'Terminofeu enthält die Begriffe, die in Anhang 2 der Schweizerischen Brandschutzvorschriften definiert sind, in deutscher, französischer und italienischer Sprache. Darüber hinaus umfasst die Terminologiedatenbank weitere Fachbegriffe aus dem Bereich Brandschutz.',
    'footer.bsv': 'Schweizerische Brandschutzvorschriften',
    'footer.links': 'Links',
    'footer.termList': 'Begriffsliste',
    'footer.vkf': 'Vereinigung Kantonaler Feuerversicherungen (VKF)',
    'footer.languages': 'Sprachen',
    'footer.copyright': '© 2026 Vereinigung Kantonaler Feuerversicherungen (VKF)',
  },
  fr: {
    'footer.about': 'À propos de Terminofeu',
    'footer.description':
      'Terminofeu contient les termes définis à l’annexe 2 des prescriptions suisses de protection incendie en allemand, français et italien. Elle comprend en outre d’autres termes techniques du domaine de la protection incendie.',
    'footer.bsv': 'Prescriptions suisses de protection incendie',
    'footer.links': 'Liens',
    'footer.termList': 'Liste des termes',
    'footer.vkf': 'Association des établissements cantonaux d’assurance incendie (AEAI)',
    'footer.languages': 'Langues',
    'footer.copyright': '© 2026 Association des établissements cantonaux d’assurance incendie (AEAI)',
  },
  it: {
    'footer.about': 'Informazioni su Terminofeu',
    'footer.description':
      'Terminofeu contiene i termini definiti nell’allegato 2 delle prescrizioni svizzere di protezione antincendio in lingua tedesca, francese e italiana. Inoltre, la banca dati terminologica comprende altri termini specialistici del settore della protezione antincendio.',
    'footer.bsv': 'Prescrizioni svizzere di protezione antincendio',
    'footer.links': 'Collegamenti',
    'footer.termList': 'Elenco dei termini',
    'footer.vkf': 'Associazione degli istituti cantonali di assicurazione antincendio (AICAA)',
    'footer.languages': 'Lingue',
    'footer.copyright': '© 2026 Associazione degli istituti cantonali di assicurazione antincendio (AICAA)',
  },
} as const

export function useTranslations(lang: keyof typeof ui | undefined) {
  if (!lang) lang = defaultLocale
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key]
  }
}
