export interface DocumentComment {
  id: string
  comment: string
  created_by: string
  created_at: string
}

export interface DocumentCommentCreateSeed {
  comment: string
}
