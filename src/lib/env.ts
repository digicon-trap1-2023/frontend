export const getApiOrigin = () => {
  if (import.meta.env.NEXT_PUBLIC_ORIGIN !== undefined) {
    return import.meta.env.NEXT_PUBLIC_ORIGIN
  }
  return 'http://localhost:8000'
}
