import { createRouter, createWebHistory } from 'vue-router'
import AddressInfo from '@/pages/AddressInfo.vue'
import Declaration from '@/pages/Declaration.vue'
import MemberInfo from '@/pages/MemberInfo.vue'
import Home from '@/pages/Home.vue'
import ParentalInfo from '@/pages/ParentalInfo.vue'
import Financial from '@/pages/Financial.vue'
import IdentityDetail from '@/pages/IdentityDetail.vue'

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
    {
        path: '/kyc-home-info',
        name: 'kyc-home-info',
        component: Home,
    },
    {
        path: '/kyc-parent-info',
        name: 'kyc-parent-info',
        component: ParentalInfo,
    },
    {
        path: '/kyc-financial-info',
        name: 'kyc-financial-info',
        component: Financial,
    },
    {
        path: '/kyc-identity-info',
        name: 'kyc-identity-info',
        component: IdentityDetail,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
