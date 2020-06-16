export const BASE_URL = () => {
  const hostname = window.location.hostname;

  if (hostname.includes('oriio.local')) {
    return 'http://localhost:4200'
  }

  return 'https://api.oriio.io'
}
