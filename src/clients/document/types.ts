import type { Tag } from '@/clients/tag/types'

export interface Document {
  id: string
  file: string
  title: string
  bookmarked: boolean
  referenced: boolean
}

export interface DocumentDetail extends Document {
  description: string
  tags: Tag[]
}

export interface DocumentQuerySeed {
  tags?: string[]
  bookmarked?: boolean
}

export interface DocumentCreateSeed {
  file: File | null
  title: string
  description: string
  tags: string[]
}

export type DocumentUpdateSeed = Partial<DocumentCreateSeed>
