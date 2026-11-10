import 'alpinejs'
import type Alpine from 'alpinejs'

type Persisted<T> = ReturnType<typeof Alpine.$persist<T>>

declare module 'alpinejs' {
  namespace Alpine {
    interface Stores {
      global: {
        langs: Persisted<string[]>
        showWarnPopup: Persisted<boolean>
      }
    }
  }
}
