import useSWRV from 'swrv'
import { fetcher } from '@/clients/fetcher'
import { getApiOrigin } from '@/lib/env'
import type { User } from './types'

export const useFetchMe = () => {
  const { data, error } = useSWRV<User>(`${getApiOrigin()}/me`, fetcher.get)
  if (error.value) throw new Error(error.value.message)

  return data
}
