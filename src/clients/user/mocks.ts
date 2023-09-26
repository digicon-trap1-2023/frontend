import { RestHandler, rest } from 'msw'
import type { User } from './types'

const userData: User = {
  id: '1',
  name: 'example user',
  role: 'writer'
}
export const userHandlers = (apiOrigin: string): RestHandler[] => [
  rest.get(`${apiOrigin}/me`, (req, res, ctx) => res(ctx.status(200), ctx.json<User>(userData)))
]
