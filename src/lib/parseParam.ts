import type { LocationQueryValue } from 'vue-router'

export const parseQueryParam = (req: LocationQueryValue | LocationQueryValue[]): string | null => {
  if (Array.isArray(req)) {
    return req[0]
  }
  return req
}
