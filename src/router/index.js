import { createRouter, createWebHistory } from 'vue-router'
import AddressInfo from '@/pages/AddressInfo.vue'
import Declaration from '@/pages/Declaration.vue'
import MemberInfo from '@/pages/MemberInfo.vue'

const routes = [
    {
        path: '/kyc-member-info',
        name: 'kyc-member-info',
        component: MemberInfo,
    },
    {
        path: '/kyc-address-info',
        name: 'kyc-address-info',
        component: AddressInfo,
    },
    {
        path: '/kyc-declaration-info',
        name: 'kyc-declaration-info',
        component: Declaration,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
