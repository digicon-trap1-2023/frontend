import { setupWorker } from 'msw'
import { setupServer } from 'msw/node'

import { getApiOrigin } from './env'
import { documentHandlers } from '@/clients/document/mocks'

const handlers = (apiOrigin: string) => [documentHandlers(apiOrigin)].flat()

export const initMock = () => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof window !== 'undefined') {
      const worker = setupWorker(...handlers(getApiOrigin()))
      worker.start({
        onUnhandledRequest(req, print) {
          if (req.url.pathname.startsWith('/_next')) {
            return
          }
          print.warning()
        }
      })
    } else {
      const server = setupServer(...handlers(getApiOrigin()))
      server.listen()
    }
  }
}
