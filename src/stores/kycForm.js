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
        }
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
        }
    }
})
