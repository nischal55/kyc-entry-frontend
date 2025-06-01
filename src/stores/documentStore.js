// stores/documentStore.js
import { defineStore } from 'pinia';

export const useDocumentStore = defineStore('document', {
  state: () => ({
    files: {
      citizenshipFront: '',
      citizenshipBack: '',
      passport: '',
      nationalID: '',
      ppPhoto: '',
    }
  }),
  actions: {
    setFileName(key, filename) {
      // key is one of: 'citizenshipFront', 'citizenshipBack', 'passport', 'nationalID', 'ppPhoto'
      this.files[key] = filename;
    },
    clearAll() {
      this.files = {
        citizenshipFront: '',
        citizenshipBack: '',
        passport: '',
        nationalID: '',
        ppPhoto: '',
      };
    }
  }
});
