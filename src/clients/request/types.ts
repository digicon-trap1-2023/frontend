export interface Request {
  id: string
  title: string
  description: string
  created_by: string
}

export interface RequestWithDocuments {
  id: string
  title: string
  documents: {
    id: string
    title: string
  }[]
}

export interface RequestCreateSeed {
  title: string
  description: string
}
