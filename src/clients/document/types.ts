import type { Tag } from '@/clients/tag/types'

export interface Document {
  id: string
  file: string
  title: string
  bookmarked: boolean
  referenced: boolean
  userId: string
  userName: string
  related_request: string | null
}

export interface DocumentDetail extends Document {
  description: string
  tags: Tag[]
}

export interface DocumentQuerySeed {
  tags?: string[]
  type?: 'bookmark' | 'referenced'
}

export interface DocumentCreateSeed {
  file: File | null
  title: string
  description: string
  tags: string[]
  related_request: string | null
}

export type DocumentUpdateSeed = Partial<Omit<DocumentCreateSeed, 'related_request'>>
