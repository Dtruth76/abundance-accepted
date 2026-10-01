import { Capacitor } from '@capacitor/core'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '')
  || (Capacitor.isNativePlatform() ? 'https://abundance-accepted.com' : '')

export function functionUrl(name: string) {
  return `${apiBaseUrl}/.netlify/functions/${name}`
}