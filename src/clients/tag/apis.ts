import useSWRV, { mutate } from 'swrv'
import { fetcher } from '@/clients/fetcher'
import type { TagCreateSeed, Tag } from '@/clients/tag/types'
import { getApiOrigin } from '@/lib/env'

export const useFetchTags = () => {
  const { data, error } = useSWRV<Tag[]>(`${getApiOrigin()}/tags`, fetcher.get)
  if (error.value) throw new Error(error.value)

  return data
}

export const createTag = async (tagName: string) => {
  const res = await fetcher.post<Tag>(`${getApiOrigin()}/tags`, {
    name: tagName
  } satisfies TagCreateSeed)
  mutate(`${getApiOrigin()}/tags`, undefined)
  return res
}

export const createTags = async (tagNames: string[]) => {
  const res = await Promise.all(tagNames.map((tagName) => createTag(tagName)))

  return res
}
