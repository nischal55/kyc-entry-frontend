<template>
    <div class="flex flex-wrap justify-center gap-20 p-20  text-center">
        <div class="" @click="handlePersonalClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center  justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-user" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Personal Information</p>
        </div>
        <div class="" @click="handleAddressClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-map-marker" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Address Details</p>
        </div>
        <div class="" @click="handleParentalClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-users" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Family Details</p>
        </div>
        <div class="" @click="handleFinancialClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-receipt" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Financial Details</p>
        </div>
        <div class="" @click="handleIdentityClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-id-card" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Identity Details</p>
        </div>
        <div class="" @click="handleDocumentClick">
            <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center cursor-pointer ">
                <span class="text-gray-700">
                    <i class="pi pi-file-arrow-up" style="font-size: 2rem;"></i>
                </span>
            </div>
            <p class="mt-5 text-slate-600 text-md">Documents Upload</p>
        </div>
    </div>
</template>


<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const handleDocumentClick = () => {
    router.push('/kyc-declaration-info')
}

const handlePersonalClick = () => {
    router.push('/kyc-member-info')
}

const handleAddressClick = () => {
    router.push('/kyc-address-info')
}

const handleParentalClick = () => {
    router.push('/kyc-parent-info')
}

const handleFinancialClick = () => {
    router.push('/kyc-financial-info')
}

const handleIdentityClick = () => {
    router.push('/kyc-identity-info')
}

</script>
