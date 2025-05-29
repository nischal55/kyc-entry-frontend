import { defineStore } from 'pinia'

export const useIdentityStore = defineStore('identityStore', {
    state: () => ({
        form: {
            identityType: '',
            identityNumber: '',
            authority: '',
            placeOfIssue: '',
            nationality: '',
            birthPlace: '',
        }
    }),
    actions: {
        updateForm(data) {
            this.form = { ...this.form, ...data }
        },
        resetForm() {
            this.form = {
                identityType: '',
                identityNumber: '',
                authority: '',
                placeOfIssue: '',
                nationality: '',
                birthPlace: '',
            }
        }
    }
})
