import useSWRV from 'swrv'
import { fetcher } from '@/clients/fetcher'

import type { Request, RequestWithDocuments } from '@/clients/request/types'
import { getApiOrigin } from '@/lib/env'
import type { RequestCreateSeed } from '@/clients/request/types'

export const useFetchRequests = () => {
  const { data, error } = useSWRV<Request[]>(`${getApiOrigin()}/requests`, fetcher.get)
  if (error.value) throw new Error(error.value.message)

  return data
}
export const useFetchRequestsWithDocuments = () => {
  const { data, error } = useSWRV<RequestWithDocuments[]>(
    `${getApiOrigin()}/requests/withDocument`,
    fetcher.get
  )
  if (error.value) throw new Error(error.value.message)

  return data
}

export const createRequest = async (request: RequestCreateSeed) => {
  const res = await fetcher.post<Request>(`${getApiOrigin()}/requests`, request)

  return res
}

export const deleteRequest = async (requestId: string) => {
  await fetcher.delete(`${getApiOrigin()}/requests/${requestId}`)
}
