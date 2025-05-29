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
            }
        }
    }
})
