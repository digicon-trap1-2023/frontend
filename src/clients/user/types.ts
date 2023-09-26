export type Role = 'writer' | 'reader'

export interface User {
  id: string
  name: string
  role: Role
}
