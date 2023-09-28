import useSWRV, { mutate } from 'swrv'
import { fetcher } from '@/clients/fetcher'

import { getApiOrigin } from '@/lib/env'
import type { DocumentComment, DocumentCommentCreateSeed } from '@/clients/documentComment/types'

export const useFetchDocumentComments = (documentId: string) => {
  const { data, error } = useSWRV<DocumentComment[]>(
    `${getApiOrigin()}/documents/${documentId}/comments`,
    fetcher.get
  )
  if (error.value) throw new Error(error.value.message)

  return data
}

export const createDocumentComment = async (
  documentId: string,
  request: DocumentCommentCreateSeed
) => {
  const res = await fetcher.post<DocumentComment>(
    `${getApiOrigin()}/documents/${documentId}/comments`,
    request
  )
  mutate(`${getApiOrigin()}/documents/${documentId}/comments`, undefined)
  return res
}

export const deleteDocumentComment = async (documentId: string, requestCommentId: string) => {
  await fetcher.delete(`${getApiOrigin()}/documents/${documentId}/comments/${requestCommentId}`)
  mutate(`${getApiOrigin()}/documents/${documentId}/comments`, undefined)
}
