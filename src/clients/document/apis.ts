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
import { useRoleStore } from '@/stores/role'
import { storeToRefs } from 'pinia'
import { type Ref, ref } from 'vue'

export const useFetchDocuments = (query: Ref<DocumentQuerySeed>) => {
  const searchParams = ref(new URLSearchParams())
  const roleStore = useRoleStore()
  const { role } = storeToRefs(roleStore)

  const { data, error, isValidating } = useSWRV<Document[]>(
    () => [`${getApiOrigin()}/documents`, query.value.tags, query.value.bookmarked],
    (origin, tags, bookmarked) => {
      if (tags && tags.length > 0) {
        searchParams.value.set('tags', tags.join(','))
      } else {
        searchParams.value.delete('tags')
      }
      if (bookmarked) {
        searchParams.value.set('type', 'bookmarks')
      }
      return fetcher.getWithQuery(origin, searchParams.value, role.value)
    }
  )
  if (error.value) throw new Error(error.value.message)

  return { data, isValidating }
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
  formData.append('tags', document.tags.join(','))
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
