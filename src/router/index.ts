import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/documents'
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue')
    },
    {
      path: '/documents/new',
      name: 'new-document',
      component: () => import('../views/NewDocumentView.vue')
    },
    {
      path: '/requests',
      name: 'requests',
      component: () => import('../views/RequestsView.vue')
    },
    {
      path: '/book',
      name: 'book',
      component: () => import('../views/MangaWithReferenceView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/MyView.vue')
    }
  ]
})

export default router
