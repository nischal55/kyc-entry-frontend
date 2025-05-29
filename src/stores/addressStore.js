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
