import { defineStore } from 'pinia';

export const useAddressStore = defineStore('address', {
  state: () => ({
    address: {
      permanent: {
        country: null,  
        province: null, 
        district: null, 
        localBody: null, 
        wardNo: null,
        tole: '',
        houseNo: null
      },
      temporary: {
        country: null,
        province: null,
        district: null,
        localBody: null,
        wardNo: null,
        tole: '',
        houseNo: null
      }
    }
  }),
  actions: {
    setSameAsPermanent(value) {
      this.address.sameAsPermanent = value;
      if (value) {
        // Copy the entire permanent address object to temporary
        this.address.temporary = JSON.parse(JSON.stringify(this.address.permanent));
      }
    },
    updatePermanentAddress(data) {
      this.address.permanent = {
        ...this.address.permanent,
        ...data
      };
    },
    updateTemporaryAddress(data) {
      this.address.temporary = {
        ...this.address.temporary,
        ...data
      };
    }
  },
  persist: true // if you're using pinia-plugin-persistedstate
});