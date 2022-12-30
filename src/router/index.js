import { createRouter, createWebHistory } from 'vue-router'
import Relation from '../views/Relation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  {
      path: '/',
      name: 'index',
      component:() => import('../views/index.vue')
    },
    {
      path: '/relation',
      name: 'relation',
      component: Relation
    },
    {
      path: '/company-chart',
      name: 'company-chart',
      component: () => import('../views/CompanyChart.vue')
    },
    {
      path: '/beneficiary-org',
      name: 'beneficiary-org',
      component: () => import('../views/BeneficiaryOrg.vue')
    },
    {
      path: '/beneficiary-person',
      name: 'beneficiary-person',
      component: () => import('../views/BeneficiaryPerson.vue')
    },
    {
      path: '/equity-chart',
      name: 'equity-chart',
      component: () => import('../views/EquityChart.vue')
    },
    {
      path: '/exploration',
      name: 'exploration',
      component: () => import('../views/Exploration.vue')
    },
    {
      path: '/glf',
      name: 'glf',
      component: () => import('../views/glf.vue')
    },
    {
      path: '/kzr',
      name: 'kzr',
      component: () => import('../views/kzr.vue')
    },
    {
      path: '/risk',
      name: 'risk',
      component: () => import('../views/Risk.vue')
    },
    {
      path: '/structure-chart',
      name: 'structure-chart',
      component: () => import('../views/StructureChart.vue')
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
