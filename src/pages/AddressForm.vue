<template>
  <div class="flex justify-center">
    <Toast />
    <div class="w-[60%] p-10 mt-10 shadow-md bg-white rounded-md">
      <div class="p-10">
        <p class="text-blue-800 font-bold text-xl">Address Details</p>
        <div class="grid grid-cols-2 gap-5 py-10">
          <div>
            <label>Country <span class="text-red-500">*</span></label><br />
            <Dropdown
              v-model="form.permanent.country"
              class="w-full border border-slate-200 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.country }"
              :options="countryOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              :disabled="isLoading"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading...</small>
            <small v-if="errors.permanent.country" class="text-red-500 text-sm">
              {{ errorMessages.permanent.country }}
            </small>
          </div>

          <div>
            <label>Province <span class="text-red-500">*</span></label><br />
            <Dropdown
              v-model="form.permanent.province"
              class="w-full border border-slate-200 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.province }"
              :options="provinceOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Province"
              :disabled="isLoading"
              @change="onProvinceChange"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading provinces...</small>
            <small v-if="!isLoading && provinceOptions.length === 0" class="text-red-500 text-sm">
              No provinces available.
            </small>
            <small v-if="errors.permanent.province" class="text-red-500 text-sm">
              {{ errorMessages.permanent.province }}
            </small>
          </div>

          <div>
            <label>District <span class="text-red-500">*</span></label><br />
            <Dropdown
              v-model="form.permanent.district"
              class="w-full border border-slate-200 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.district }"
              :options="districtOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select District"
              :disabled="isLoading || !form.permanent.province"
              @change="onDistrictChange"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading districts...</small>
            <small v-if="!isLoading && districtOptions.length === 0 && form.permanent.province" class="text-red-500 text-sm">
              No districts available.
            </small>
            <small v-if="errors.permanent.district" class="text-red-500 text-sm">
              {{ errorMessages.permanent.district }}
            </small>
          </div>

          <div>
            <label>Local Level <span class="text-red-500">*</span></label><br />
            <Dropdown
              v-model="form.permanent.localBody"
              class="w-full border border-slate-200 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.localBody }"
              :options="localLevelOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Local Level"
              :disabled="isLoading || !form.permanent.district"
              :filter="true"
              :showClear="true"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading local levels...</small>
            <small v-if="!isLoading && localLevelOptions.length === 0 && form.permanent.district" class="text-red-500 text-sm">
              No local levels available.
            </small>
            <small v-if="errors.permanent.localBody" class="text-red-500 text-sm">
              {{ errorMessages.permanent.localBody }}
            </small>
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <Button label="Submit" class="w-40" @click="submitForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useAddressStore } from '@/stores/addressStore';
import { getProvinces, getDistrict, getLocalLevel } from '@/services/apiService';

const toast = useToast();
const router = useRouter();
const kycStore = useAddressStore();
const isLoading = ref(false);

const countryOptions = ref([{ name: 'Nepal' }]);
const provinceOptions = ref([]);
const districtOptions = ref([]);
const localLevelOptions = ref([]);

const form = reactive({
  permanent: {
    country: '',
    province: '',
    district: '',
    localBody: '',
  },
});

const errors = reactive({
  permanent: {
    country: false,
    province: false,
    district: false,
    localBody: false,
  },
});

const errorMessages = reactive({
  permanent: {
    country: '',
    province: '',
    district: '',
    localBody: '',
  },
});

// Initialize form with store values
const initializeForm = () => {
  form.permanent = {
    country: kycStore.address.permanent.country || '',
    province: kycStore.address.permanent.province || '',
    district: kycStore.address.permanent.district || '',
    localBody: kycStore.address.permanent.localBody || '',
  };
};

const isAlphabetic = (value) => /^[A-Za-z\s]+$/.test(value);

function resetErrors() {
  for (const field in errors.permanent) {
    errors.permanent[field] = false;
    errorMessages.permanent[field] = '';
  }
}

function showErrorToast(message) {
  toast.add({
    severity: 'error',
    summary: 'Validation Error',
    detail: message,
    life: 3000,
  });
}

function validateSection() {
  let hasError = false;
  const f = form.permanent;
  const e = errors.permanent;
  const em = errorMessages.permanent;

  if (!f.country) {
    e.country = true;
    em.country = 'Country is required.';
    showErrorToast('Country is required.');
    hasError = true;
  } else if (!isAlphabetic(f.country)) {
    e.country = true;
    em.country = 'Country must contain only letters and spaces.';
    showErrorToast('Country must contain only letters and spaces.');
    hasError = true;
  }

  if (!f.province) {
    e.province = true;
    em.province = 'Province is required.';
    showErrorToast('Province is required.');
    hasError = true;
  } else if (!isAlphabetic(f.province)) {
    e.province = true;
    em.province = 'Province must contain only letters and spaces.';
    showErrorToast('Province must contain only letters and spaces.');
    hasError = true;
  }

  if (!f.district) {
    e.district = true;
    em.district = 'District is required.';
    showErrorToast('District is required.');
    hasError = true;
  } else if (!isAlphabetic(f.district)) {
    e.district = true;
    em.district = 'District must contain only letters and spaces.';
    showErrorToast('District must contain only letters and spaces.');
    hasError = true;
  }

  if (!f.localBody) {
    e.localBody = true;
    em.localBody = 'Local Level is required.';
    showErrorToast('Local Level is required.');
    hasError = true;
  } else if (!isAlphabetic(f.localBody)) {
    e.localBody = true;
    em.localBody = 'Local Level must contain only letters and spaces.';
    showErrorToast('Local Level must contain only letters and spaces.');
    hasError = true;
  }

  return !hasError;
}

function submitForm() {
  resetErrors();
  const isValid = validateSection();

  if (!isValid) {
    return;
  }

  kycStore.updatePermanentAddress(form.permanent);
  console.log('Pinia Store State after submission:', JSON.stringify(kycStore.address, null, 2));

  toast.add({
    severity: 'success',
    summary: 'Form Submitted',
    detail: 'All required fields are valid!',
    life: 3000,
  });

  router.push('/next-route');
}

async function loadProvinces() {
  try {
    isLoading.value = true;
    const response = await getProvinces({});
    provinceOptions.value = Array.isArray(response)
      ? response.map(item => ({
          name: item.province || item.name,
          id: item.id,
        }))
      : [
          { name: 'Bagmati', id: 1 },
          { name: 'Gandaki', id: 2 },
          { name: 'Lumbini', id: 3 },
        ];
  } catch (error) {
    console.error('Error loading provinces:', error);
    provinceOptions.value = [
      { name: 'Bagmati', id: 1 },
      { name: 'Gandaki', id: 2 },
      { name: 'Lumbini', id: 3 },
    ];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load provinces. Using default options.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

async function loadDistrict(provinceName) {
  try {
    isLoading.value = true;
    const province = provinceOptions.value.find(p => p.name === provinceName);
    if (!province || !province.id) {
      throw new Error('Province ID not found');
    }
    
    const response = await getDistrict(province.id);
    districtOptions.value = Array.isArray(response)
      ? response.map(item => ({
          name: item.district,
          id: item.id,
        }))
      : [
          { name: 'Kathmandu', id: 1 },
          { name: 'Lalitpur', id: 2 },
        ];
    
    // Check if stored district exists in the new options
    const storedDistrict = kycStore.address.permanent.district;
    if (storedDistrict && !districtOptions.value.some(d => d.name === storedDistrict)) {
      form.permanent.district = '';
      form.permanent.localBody = '';
      kycStore.updatePermanentAddress({ 
        ...form.permanent, 
        district: '', 
        localBody: '' 
      });
    }
  } catch (error) {
    console.error(`Error loading districts for ${provinceName}:`, error);
    districtOptions.value = [
      { name: 'Kathmandu', id: 1 },
      { name: 'Lalitpur', id: 2 },
    ];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load districts. Using default options.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

async function loadLocalLevels(districtName) {
  try {
    isLoading.value = true;
    const district = districtOptions.value.find(d => d.name === districtName);
    if (!district || !district.id) {
      throw new Error(`District ID not found for ${districtName}`);
    }
    
    const response = await getLocalLevel(district.id);
    localLevelOptions.value = Array.isArray(response)
      ? response.map(item => ({
          name: item.localLevel || item.name,
          id: item.id,
        }))
      : [
          { name: 'Kathmandu Metropolitan City', id: 1 },
          { name: 'Kirtipur Municipality', id: 2 },
        ];

    // After loading, check if stored localBody exists in new options
    const storedLocalBody = kycStore.address.permanent.localBody;
    if (storedLocalBody && !localLevelOptions.value.some(l => l.name === storedLocalBody)) {
      form.permanent.localBody = '';
      kycStore.updatePermanentAddress({ ...form.permanent, localBody: '' });
    } else if (storedLocalBody) {
      // Ensure the form reflects the stored value
      form.permanent.localBody = storedLocalBody;
    }
  } catch (error) {
    console.error(`Error loading local levels for ${districtName}:`, error);
    localLevelOptions.value = [
      { name: 'Kathmandu Metropolitan City', id: 1 },
      { name: 'Kirtipur Municipality', id: 2 },
    ];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load local levels. Using default options.',
      life: 3000,
    });
  } finally {
    isLoading.value = false;
  }
}

// Custom change handlers
const onProvinceChange = async () => {
  kycStore.updatePermanentAddress({ 
    ...form.permanent, 
    district: '', 
    localBody: '' 
  });
  if (form.permanent.province) {
    await loadDistrict(form.permanent.province);
  }
};

const onDistrictChange = async () => {
  kycStore.updatePermanentAddress({ 
    ...form.permanent, 
    localBody: '' 
  });
  if (form.permanent.district) {
    await loadLocalLevels(form.permanent.district);
  }
};

// Watch for changes to update store
watch(
  () => form.permanent.country,
  (newVal) => {
    kycStore.updatePermanentAddress({ ...form.permanent, country: newVal });
  }
);

watch(
  () => form.permanent.localBody,
  (newVal) => {
    kycStore.updatePermanentAddress({ ...form.permanent, localBody: newVal });
  }
);

// Watch store changes to update form
watch(
  () => kycStore.address.permanent,
  (newVal) => {
    if (newVal.country !== form.permanent.country) {
      form.permanent.country = newVal.country;
    }
    if (newVal.province !== form.permanent.province) {
      form.permanent.province = newVal.province;
    }
    if (newVal.district !== form.permanent.district) {
      form.permanent.district = newVal.district;
    }
    if (newVal.localBody !== form.permanent.localBody) {
      form.permanent.localBody = newVal.localBody;
    }
  },
  { deep: true, immediate: true }
);

onMounted(async () => {
  initializeForm();
  await loadProvinces();
  
  // If province is already set, load its districts
  if (form.permanent.province) {
    await loadDistrict(form.permanent.province);
    
    // If district is already set, load its local levels
    if (form.permanent.district) {
      await loadLocalLevels(form.permanent.district);
    }
  }
});
</script>