import { defineStore } from 'pinia'

export const useFinancialStore = defineStore('FinancialStore', {
    state: () => ({
        form: {
            annualIncome: null,
            transactionVolume: null,
            occupation: '',
            designation: '',
            pan: '',
            sourceOfIncome: '',
        }
    }),
    actions: {
        updateForm(data) {
            this.form = { ...this.form, ...data }
        },
        resetForm() {
            this.form = {
                annualIncome: null,
                transactionVolume: null,
                occupation: '',
                designation: '',
                pan: '',
                sourceOfIncome: '',
            }
        }
    }
})
