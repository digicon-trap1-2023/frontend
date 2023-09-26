import { setupWorker } from 'msw'

import { getApiOrigin } from './env'
import { documentHandlers } from '@/clients/document/mocks'
import { tagHandlers } from '@/clients/tag/mocks'
import { requestHandlers } from '@/clients/request/mocks'

const handlers = (apiOrigin: string) =>
  [documentHandlers(apiOrigin), tagHandlers(apiOrigin), requestHandlers(apiOrigin)].flat()

export const initMock = () => {
  if (import.meta.env.MODE === 'development') {
    const worker = setupWorker(...handlers(getApiOrigin()))
    worker.start({
      onUnhandledRequest(req, print) {
        if (
          req.url.pathname.startsWith('/node_modules') ||
          req.url.pathname.startsWith('/src') ||
          req.url.origin === 'https://placehold.jp'
        ) {
          return
        }
        print.warning()
      }
    })
  }
}
