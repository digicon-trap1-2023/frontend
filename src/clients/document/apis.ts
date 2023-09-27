import useSWRV from 'swrv'
import { fetcher } from '@/clients/fetcher'
import type {
  DocumentDetail,
  Document,
  DocumentCreateSeed,
  DocumentUpdateSeed,
  DocumentQuerySeed
} from '@/clients/document/types'
import { getApiOrigin } from '@/lib/env'
import { useMeStore } from '@/stores/me'
import { storeToRefs } from 'pinia'
import { type Ref } from 'vue'

export const useFetchDocuments = (query: Ref<DocumentQuerySeed>) => {
  const meStore = useMeStore()
  const { role } = storeToRefs(meStore)

  const res = useSWRV<Document[]>(
    () =>
      `${getApiOrigin()}${
        role.value === 'reader' ? '/reader' : ''
      }/documents?${getDocumentsUrlWithQuery(query.value)}`,
    (url) => {
      return fetcher.get(url, role.value)
    }
  )
  if (res.error.value) throw new Error(res.error.value.message)
  return res
}

const getDocumentsUrlWithQuery = (query: DocumentQuerySeed) => {
  const searchParams = new URLSearchParams()
  if (query.tags && query.tags.length > 0) {
    searchParams.set('tags', query.tags.join(','))
  }
  if (query.onlyBookmark) {
    searchParams.set('type', 'bookmark')
  }
  if (query.onlyReferenced) {
    searchParams.set('type', 'referenced')
  }
  return searchParams.toString()
}

export const useFetchDocumentDetail = (documentId: string) => {
  const { data, error } = useSWRV<DocumentDetail>(
    `${getApiOrigin()}/documents/${documentId}`,
    fetcher.get
  )
  if (error.value) throw new Error(error.value.message)

  return data
}

export const createDocument = async (document: DocumentCreateSeed) => {
  if (!document.file) throw new Error('file is required')

  const formData = new FormData()
  formData.append('title', document.title)
  formData.append('description', document.description)
  formData.append('tags', JSON.stringify(document.tags))
  formData.append('file', document.file)
  if (document.related_request) {
    formData.append('related_request', document.related_request)
  }

  const res = await fetcher.postFormData<Document>(`${getApiOrigin()}/documents`, formData)

  return res
}

export const updateDocument = async (documentId: string, document: DocumentUpdateSeed) => {
  const formData = new FormData()
  if (document.title) {
    formData.append('title', document.title)
  }
  if (document.description) {
    formData.append('description', document.description)
  }
  if (document.tags) {
    formData.append('tags', document.tags.join(','))
  }
  if (document.file) {
    formData.append('file', document.file)
  }

  const res = await fetcher.patchFormData<Document>(
    `${getApiOrigin()}/documents/${documentId}`,
    formData
  )

  return res
}

export const deleteDocument = async (documentId: string) => {
  await fetcher.delete(`${getApiOrigin()}/documents/${documentId}`)
}

export const postBookmark = async (documentId: string) => {
  await fetcher.postWithoutData(`${getApiOrigin()}/documents/${documentId}/bookmarks`)
}

export const deleteBookmark = async (documentId: string) => {
  await fetcher.delete(`${getApiOrigin()}/documents/${documentId}/bookmarks`)
}

export const postReferenced = async (documentId: string) => {
  await fetcher.postWithoutData(`${getApiOrigin()}/documents/${documentId}/reference`)
}

export const deleteReferenced = async (documentId: string) => {
  await fetcher.delete(`${getApiOrigin()}/documents/${documentId}/reference`)
}
