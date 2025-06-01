// src/stores/addressStore.js
import { defineStore } from 'pinia'

export const useAddressStore = defineStore('addressStore', {
    state: () => ({
        address: {
            permanent: {
                country: '',
                province: '',
                district: '',
                localBody: '',
                wardNo: null,
                tole: '',
                houseNo: null,
            },
            temporary: {
                country: '',
                province: '',
                district: '',
                localBody: '',
                wardNo: null,
                tole: '',
                houseNo: null
            },
            sameAsPermanent: false
        },
    }),
    actions: {
        updatePermanentAddress(data) {
            this.address.permanent = { ...this.address.permanent, ...data }
        },
        updateTemporaryAddress(data) {
            this.address.temporary = { ...this.address.temporary, ...data }
        },
        copyPermanentToTemporary() {
            this.address.temporary = { ...this.address.permanent }
            this.address.sameAsPermanent = true
        },
        clearTemporary() {
            this.address.temporary = {
                country: '',
                province: '',
                district: '',
                localBody: '',
                wardNo: null,
                tole: '',
                houseNo: null,
            }
            this.address.sameAsPermanent = false
        }
    }
})