import { createRouter, createWebHistory } from 'vue-router'
import { useKycProgress } from '@/stores/kycProgress' // ⬅️ Import your Pinia store
import AddressInfo from '@/pages/AddressInfo.vue'
import Declaration from '@/pages/Declaration.vue'
import MemberInfo from '@/pages/MemberInfo.vue'
import Home from '@/pages/Home.vue'
import ParentalInfo from '@/pages/ParentalInfo.vue'
import Financial from '@/pages/Financial.vue'
import IdentityDetail from '@/pages/IdentityDetail.vue'
import AddressForm from '@/pages/AddressForm.vue'

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
    },
    {
        path:'/kyc-address-form',
        name: 'kyc-address-form',
        component: AddressForm,
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    const store = useKycProgress()

    const routeBlockRules = {
        'kyc-address-info': !store.memberInfoCompleted,
        'kyc-parent-info': !store.addressInfoCompleted,
        'kyc-financial-info': !store.familyInfoCompleted,
        'kyc-identity-info': !store.financialInfoCompleted,
        'kyc-declaration-info': !store.financialInfoCompleted,
    }

    if (routeBlockRules[to.name]) {
        alert('⚠️ Please complete the required previous section before accessing this page.')
        next(false)
    } else {
        next()
    }
})

export default router
