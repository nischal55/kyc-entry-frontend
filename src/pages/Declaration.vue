<template>
  <Toast />

  <div class="flex justify-center">
    <div class="w-[60%] mt-10 shadow-md bg-white">
      <div class="p-10">
        <p class="text-blue-800 font-bold text-xl">Documents Uploads</p>

        <template v-for="(label, key) in requiredFiles" :key="key">
          <div class="my-10">
            <label>{{ label }} <span class="text-red-500" v-if="isRequired(key)">*</span></label>
            <div class="flex items-center gap-4">
              <FileUpload
                mode="basic"
                @select="(e) => onFileSelect(e, key)"
                customUpload
                auto
                class="p-button-outlined"
              />
              <div class="text-sm">
                <span v-if="files[key]" class="text-gray-600 block">
                  Selected: {{ files[key].name }}
                </span>
                <small v-if="documentStore.files[key]" class="text-green-600 block">
                  (Stored name: {{ documentStore.files[key] }})
                </small>
              </div>
            </div>
          </div>
        </template>

        <!-- Submit Button -->
        <div>
          <Button label="Submit" icon="pi pi-verified" class="w-40" @click="submitForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

import { useDocumentStore } from '@/stores/documentStore';
import { useAddressStore } from '@/stores/addressStore';
import { useFamilyStore } from '@/stores/family';
import { useFinancialStore } from '@/stores/financialStore';
import { useIdentityStore } from '@/stores/identityStore';
import { useKycFormStore } from '@/stores/kycForm';

const toast = useToast();

const documentStore = useDocumentStore();
const addressStore = useAddressStore();
const familyStore = useFamilyStore();
const financialStore = useFinancialStore();
const identityStore = useIdentityStore();
const kycFormStore = useKycFormStore();

const files = ref({});

const requiredFiles = {
  citizenshipFront: 'Citizenship Front Side (jpg | jpeg | png)',
  citizenshipBack: 'Citizenship Back Side (jpg | jpeg | png)',
  passport: 'Passport (jpg | jpeg | png)',
  nationalID: 'National ID (jpg | jpeg | png)',
  ppPhoto: 'PP size Photo (jpg | jpeg | png)'
};

const isRequired = (key) => {
  return ['citizenshipFront', 'citizenshipBack', 'ppPhoto'].includes(key);
};

const onFileSelect = (event, key) => {
  files.value[key] = event.files[0];
  documentStore.setFileName(key, event.files[0].name);
};

const transformFamilyData = (familyData) => {
  const relationMap = {
    grandMotherName: 1,
    fatherName: 2,
    motherName: 3,
    grandFatherName: 4,
    spouseName: 5,
    fatherInLawName: 6
  };
  return Object.entries(relationMap).reduce((acc, [key, id]) => {
    if (familyData[key]) {
      acc.push({
        id,
        fullName: familyData[key],
        relationType: { id, relation: key.replace('Name', '') }
      });
    }
    return acc;
  }, []);
};

const transformDocumentsData = (documents) => {
  return Object.keys(requiredFiles).reduce((arr, key) => {
    if (documents[key]) {
      arr.push({ documentUrl: documents[key] });
    }
    return arr;
  }, []);
};

const submitForm = () => {
  const missing = Object.keys(requiredFiles).filter(key => isRequired(key) && !files.value[key]);

  if (missing.length) {
    toast.add({
      severity: 'warn',
      summary: 'Missing Document',
      detail: `${requiredFiles[missing[0]]} is required`,
      life: 3000,
    });
    return;
  }

  const addressData = [
    {
      ...addressStore.address.permanent,
      addressType: 'Permanent'
    }
  ];

  if (!addressStore.address.sameAsPermanent) {
    addressData.push({
      ...addressStore.address.temporary,
      addressType: 'Temporary'
    });
  }

  const familyData = transformFamilyData(familyStore.form);
  const documentsData = transformDocumentsData(documentStore.files);

  const combinedData = {
    documents: documentsData,
    address: addressData,
    family: familyData,
    financial: financialStore.form,
    identity: identityStore.form,
    kyc: kycFormStore.form,
  };

  console.log('=== Full Form Data (JSON) ===');
  console.log(JSON.stringify(combinedData, null, 2));

  toast.add({
    severity: 'success',
    summary: 'Submitted',
    detail: 'All form data logged to console as JSON',
    life: 3000,
  });
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
