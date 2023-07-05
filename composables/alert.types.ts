export interface alertType {
  typeShow?: alertTypeShow | 'info'
  show?: Boolean | false
  title: String | null
  message: String | null
  stack?: String | null
}
export type alertErrorFN = (e: Error | String | unknown, origin?: String | undefined) => void
export type alertFN = (params: alertType) => void
export type alertTypeShow = 'error' | 'info' | 'warning' | 'success'
