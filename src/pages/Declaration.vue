<template>
  <Toast />

  <div class="flex justify-center">
    <div class="w-[60%] mt-10 shadow-md bg-white">
      <div class="p-10">
        <p class="text-blue-800 font-bold text-xl">Documents Uploads</p>

        <!-- Citizenship Front Side -->
        <div class="my-10">
          <label>Citizenship Front Side (jpg | jpeg | png) <span class="text-red-500">*</span></label>
          <div class="flex items-center gap-4">
            <FileUpload
              mode="basic"
              @select="(e) => onFileSelect(e, 'citizenshipFront')"
              customUpload
              auto
              class="p-button-outlined"
            />
            <div class="text-sm">
              <span v-if="files.citizenshipFront" class="text-gray-600 block">
                Selected: {{ files.citizenshipFront.name }}
              </span>
              <small v-if="documentStore.files.citizenshipFront" class="text-green-600 block">
                (Stored name: {{ documentStore.files.citizenshipFront }})
              </small>
            </div>
          </div>
        </div>

        <!-- Citizenship Back Side -->
        <div class="my-10">
          <label>Citizenship Back Side (jpg | jpeg | png) <span class="text-red-500">*</span></label>
          <div class="flex items-center gap-4">
            <FileUpload
              mode="basic"
              @select="(e) => onFileSelect(e, 'citizenshipBack')"
              customUpload
              auto
              class="p-button-outlined"
            />
            <div class="text-sm">
              <span v-if="files.citizenshipBack" class="text-gray-600 block">
                Selected: {{ files.citizenshipBack.name }}
              </span>
              <small v-if="documentStore.files.citizenshipBack" class="text-green-600 block">
                (Stored name: {{ documentStore.files.citizenshipBack }})
              </small>
            </div>
          </div>
        </div>

        <!-- Passport -->
        <div class="my-10">
          <label>Passport (jpg | jpeg | png)</label>
          <div class="flex items-center gap-4">
            <FileUpload
              mode="basic"
              @select="(e) => onFileSelect(e, 'passport')"
              customUpload
              auto
              class="p-button-outlined"
            />
            <div class="text-sm">
              <span v-if="files.passport" class="text-gray-600 block">
                Selected: {{ files.passport.name }}
              </span>
              <small v-if="documentStore.files.passport" class="text-green-600 block">
                (Stored name: {{ documentStore.files.passport }})
              </small>
            </div>
          </div>
        </div>

        <!-- National ID -->
        <div class="my-10">
          <label>National ID (jpg | jpeg | png)</label>
          <div class="flex items-center gap-4">
            <FileUpload
              mode="basic"
              @select="(e) => onFileSelect(e, 'nationalID')"
              customUpload
              auto
              class="p-button-outlined"
            />
            <div class="text-sm">
              <span v-if="files.nationalID" class="text-gray-600 block">
                Selected: {{ files.nationalID.name }}
              </span>
              <small v-if="documentStore.files.nationalID" class="text-green-600 block">
                (Stored name: {{ documentStore.files.nationalID }})
              </small>
            </div>
          </div>
        </div>

        <!-- PP size Photo -->
        <div class="my-10">
          <label>PP size Photo (jpg | jpeg | png) <span class="text-red-500">*</span></label>
          <div class="flex items-center gap-4">
            <FileUpload
              mode="basic"
              @select="(e) => onFileSelect(e, 'ppPhoto')"
              customUpload
              auto
              class="p-button-outlined"
            />
            <div class="text-sm">
              <span v-if="files.ppPhoto" class="text-gray-600 block">
                Selected: {{ files.ppPhoto.name }}
              </span>
              <small v-if="documentStore.files.ppPhoto" class="text-green-600 block">
                (Stored name: {{ documentStore.files.ppPhoto }})
              </small>
            </div>
          </div>
        </div>

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

const files = ref({
  citizenshipFront: null,
  citizenshipBack: null,
  passport: null,
  nationalID: null,
  ppPhoto: null,
});

// Relation type mapping
const relationTypes = [
  { id: 1, relation: "GrandMother" },
  { id: 2, relation: "Father" },
  { id: 3, relation: "Mother" },
  { id: 4, relation: "GrandFather" },
  { id: 5, relation: "Spouse" },
  { id: 6, relation: "FatherInLaw" }
];

const onFileSelect = (event, key) => {
  files.value[key] = event.files[0];
  documentStore.setFileName(key, event.files[0].name);
};

const transformFamilyData = (familyData) => {
  const transformed = [];
  
  if (familyData.grandMotherName) {
    transformed.push({
      id: 1,
      fullName: familyData.grandMotherName,
      relationType: relationTypes.find(r => r.id === 1)
    });
  }
  
  if (familyData.fatherName) {
    transformed.push({
      id: 2,
      fullName: familyData.fatherName,
      relationType: relationTypes.find(r => r.id === 2)
    });
  }
  
  if (familyData.motherName) {
    transformed.push({
      id: 3,
      fullName: familyData.motherName,
      relationType: relationTypes.find(r => r.id === 3)
    });
  }
  
  if (familyData.grandFatherName) {
    transformed.push({
      id: 4,
      fullName: familyData.grandFatherName,
      relationType: relationTypes.find(r => r.id === 4)
    });
  }
  
  if (familyData.spouseName) {
    transformed.push({
      id: 5,
      fullName: familyData.spouseName,
      relationType: relationTypes.find(r => r.id === 5)
    });
  }
  
  if (familyData.fatherInLawName) {
    transformed.push({
      id: 6,
      fullName: familyData.fatherInLawName,
      relationType: relationTypes.find(r => r.id === 6)
    });
  }
  
  return transformed;
};

const transformDocumentsData = (documents) => {
  const transformed = [];
  
  // Add citizenship front if exists
  if (documents.citizenshipFront) {
    transformed.push({
      documentUrl: documents.citizenshipFront
    });
  }
  
  // Add citizenship back if exists
  if (documents.citizenshipBack) {
    transformed.push({
      documentUrl: documents.citizenshipBack
    });
  }
  
  // Add passport if exists and not empty
  if (documents.passport) {
    transformed.push({
      documentUrl: documents.passport
    });
  }
  
  // Add national ID if exists and not empty
  if (documents.nationalID) {
    transformed.push({
      documentUrl: documents.nationalID
    });
  }
  
  // Add PP photo if exists
  if (documents.ppPhoto) {
    transformed.push({
      documentUrl: documents.ppPhoto
    });
  }
  
  return transformed;
};

const submitForm = () => {
  // Validate required documents
  if (!files.value.citizenshipFront) {
    toast.add({
      severity: 'warn',
      summary: 'Missing Document',
      detail: 'Citizenship Front Side is required',
      life: 3000,
    });
    return;
  }
  if (!files.value.citizenshipBack) {
    toast.add({
      severity: 'warn',
      summary: 'Missing Document',
      detail: 'Citizenship Back Side is required',
      life: 3000,
    });
    return;
  }
  if (!files.value.ppPhoto) {
    toast.add({
      severity: 'warn',
      summary: 'Missing Document',
      detail: 'PP size Photo is required',
      life: 3000,
    });
    return;
  }

  // Transform address data
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

  // Transform family data
  const familyData = transformFamilyData(familyStore.form);

  // Transform documents data
  const documentsData = transformDocumentsData(documentStore.files);

  // Combine all form data
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

  // Show success message
  toast.add({
    severity: 'success',
    summary: 'Submitted',
    detail: 'All form data logged to console as JSON',
    life: 3000,
  });

  // Here you would typically send the data to an API
  // await submitToApi(combinedData);
};
</script>