// stores/kycProgress.js
import { defineStore } from 'pinia'

export const useKycProgress = defineStore('kycProgress', {
  state: () => ({
    memberInfoCompleted: false,
    addressInfoCompleted: false,
    familyInfoCompleted: false,
    financialInfoCompleted: false,
    identityInfoCompleted: false,
  }),
})
