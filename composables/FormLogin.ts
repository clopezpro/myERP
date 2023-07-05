import { fetchMAHIRFULL } from './mahir'

export function authLogin(email: string, password: string): Promise<any> {
  return fetchMAHIRFULL({
    baseURL: '/auth/login',
    body: {
      email,
      password,
    },
    method: 'POST',
  })
}
