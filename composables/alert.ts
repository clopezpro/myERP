/* import { useSingleton } from './utils' */
import type { alertErrorFN, alertFN } from './alert.types'

const key = Symbol('singleton')
const key2 = Symbol('error')

function useAlertModal() {
  return inject(key) as alertFN
}
function provideAlertModal(F: alertFN) {
  const vm = getCurrentInstance()
  vm?.appContext.app.provide(key, F)
}

function useAlertErrorModal() {
  return inject(key2) as alertErrorFN
}

function provideAlertErrorModal(F: alertErrorFN) {
  const vm = getCurrentInstance()
  vm?.appContext.app.provide(key2, F)
}

/* const [
  provideAlertModal,
  useAlertModal,
] = useSingleton<(title: string, message: string, stack?: String | null) => void >() */

export {
  provideAlertErrorModal,
  provideAlertModal,
  useAlertModal,
  useAlertErrorModal,
}
