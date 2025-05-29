import { defineStore } from 'pinia'

export const useFamilyStore = defineStore('family', {
    state: () => ({
        form: {
            fatherName: '',
            motherName: '',
            grandFatherName: '',
            grandMotherName: '',
            spouseName: '',
            fatherInLawName: '',
            isMarried: null,
        }
    }),
    actions: {
        updateForm(data) {
            this.form = { ...this.form, ...data }
        },
        resetForm() {
            this.form = {
                fatherName: '',
                motherName: '',
                grandFatherName: '',
                grandMotherName: '',
                spouseName: '',
                fatherInLawName: '',
                isMarried: null
            }
        }
    }
})
