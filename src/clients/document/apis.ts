import useSWRV from 'swrv'
import { fetcher } from '@/clients/fetcher'
import type {
  DocumentDetail,
  Document,
  DocumentCreateSeed,
  DocumentUpdateSeed,
  DocumentQuerySeed
} from '@/clients/document/types'

export const useFetchDocuments = (query?: DocumentQuerySeed) => {
  const searchParams = new URLSearchParams()
  if (query?.tags) {
    searchParams.set('tags', query.tags.join(','))
  }
  if (query?.bookmarked) {
    searchParams.set('type', 'bookmarks')
  }

  const { data, error } = useSWRV<Document[]>('/documents', () =>
    fetcher.getWithQuery('/documents', searchParams)
  )
  if (error) throw new Error(error.value.message)

  return data
}

export const useFetchDocumentDetail = (documentId: string) => {
  const { data, error } = useSWRV<DocumentDetail>(`/document/${documentId}`, fetcher.get)
  if (error) throw new Error(error.value.message)

  return data
}

export const createDocument = async (document: DocumentCreateSeed) => {
  const formData = new FormData()
  formData.append('title', document.title)
  formData.append('description', document.description)
  formData.append('tags', document.tags.join(','))
  formData.append('file', document.file)

  const res = await fetcher.postFormData<Document>('/documents', formData)

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

  const res = await fetcher.patchFormData<Document>(`/documents/${documentId}`, formData)

  return res
}

export const deleteDocument = async (documentId: string) => {
  await fetcher.delete(`/documents/${documentId}`)
}

export const postBookmark = async (documentId: string) => {
  await fetcher.postWithoutData(`/documents/${documentId}/bookmarks`)
}

export const deleteBookmark = async (documentId: string) => {
  await fetcher.delete(`/documents/${documentId}/bookmarks`)
}

export const postReferenced = async (documentId: string) => {
  await fetcher.postWithoutData(`/documents/${documentId}/referenced`)
}

export const deleteReferenced = async (documentId: string) => {
  await fetcher.delete(`/documents/${documentId}/referenced`)
}
