export interface Request {
  id: string
  title: string
  description: string
  created_by: string
  tags: string[]
}

export interface RequestWithDocuments {
  id: string
  documents: {
    id: string
    title: string
  }[]
}

export interface RequestCreateSeed {
  title: string
  description: string
}
