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
    'footer.bsv': 'Schweizerische Brandschutzvorschriften',
  },
  fr: {
    'footer.bsv': 'Prescriptions suisses de protection incendie',
  },
  it: {
    'footer.bsv': 'Prescrizioni svizzere della procezione antincendio',
  },
} as const

export function useTranslations(lang: keyof typeof ui | undefined) {
  if (!lang) lang = defaultLocale
  return function t(key: keyof (typeof ui)[typeof defaultLocale]) {
    return ui[lang][key] || ui[defaultLocale][key]
  }
}
