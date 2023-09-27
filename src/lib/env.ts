export const getApiOrigin = () => {
  if (import.meta.env.VITE_PUBLIC_ORIGIN !== undefined) {
    return import.meta.env.VITE_PUBLIC_ORIGIN
  }
  return 'http://localhost:8000'
}
