// src/stores/kycForm.js
import { defineStore } from 'pinia'

export const useKycFormStore = defineStore('kycForm', {
    state: () => ({
        form: {
            salutation: null,
            firstName: '',
            middleName: '',
            lastName: '',
            dob: null,
            gender: null,
            mobile: null,
            phone: null,
            email: '',
            identityType: '',
            identityNo: '',
            issuedDate: '',
            issuedAuthority: '',
            education: '',
        },
        address: {
            permanent: {
                country: '',
                province: '',
                district: '',
                localBody: '',
                wardNo: null,
                tole: '',
                houseNo: null,
                phone: null,
                mobile: null,
                email: ''
            },
            temporary: {
                country: '',
                province: '',
                district: '',
                localBody: '',
                wardNo: null,
                tole: '',
                houseNo: null,
                phone: null,
                mobile: null,
                email: ''
            },
            sameAsPermanent: false
        },
    }),
    actions: {
        updateForm(data) {
            this.form = { ...this.form, ...data }
        },
        resetForm() {
            this.form = {
                salutation: null,
                firstName: '',
                middleName: '',
                lastName: '',
                dob: null,
                gender: null,
                mobile: null,
                phone: null,
                email: '',
                identityType: '',
                identityNo: '',
                issuedDate: '',
                issuedAuthority: '',
                education: '',
            }
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
                phone: null,
                mobile: null,
                email: ''
            }
            this.address.sameAsPermanent = false
            }
        }   
})
