import type { Tag } from '@/clients/tag/types'

export interface Document {
  id: string
  file: string
  title: string
  bookmarked: boolean
  referenced: boolean
  user_id: string
  user_name: string
  related_request: string | null
  reference_users?: string[]
  file_height: number
  file_width: number
}

export interface DocumentDetail extends Document {
  description: string
  tags: Tag[]
}

export interface DocumentQuerySeed {
  tags?: string[]
  onlyBookmark?: boolean
  onlyReferenced?: boolean
}

export interface DocumentCreateSeed {
  file: File | null
  title: string
  description: string
  tags: string[]
  related_request: string | null
}

export type DocumentUpdateSeed = Partial<Omit<DocumentCreateSeed, 'related_request'>>
