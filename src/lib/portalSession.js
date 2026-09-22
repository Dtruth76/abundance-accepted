export function buildPortalReturnUrl(baseUrl = 'https://abundance-accepted.com', sessionId = '') {
  const cleanBase = String(baseUrl || 'https://abundance-accepted.com').replace(/\/$/, '')
  const encodedSessionId = encodeURIComponent(sessionId || '')
  return `${cleanBase}/checkout-success?session_id=${encodedSessionId}`
}

export function getCheckoutSessionId() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('session_id') || ''
}

export default {
  buildPortalReturnUrl,
  getCheckoutSessionId,
}
