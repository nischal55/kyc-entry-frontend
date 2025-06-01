<template>
  <Toast />

  <div class="flex justify-center">
    <div class="w-[60%] p-5 mt-10 shadow-md bg-white rounded-md">
      <div class="p-7">
        <!-- ───── PERMANENT ADDRESS SECTION ───── -->
        <p class="text-blue-600 font-bold text-xl">Permanent Address</p>
        <div class="grid grid-cols-2 gap-5 py-6">
          <div>
            <label for="permanent-country">Country <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="permanent-country"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.country }"
              v-model="form.permanent.country"
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
            <label for="permanent-province">Province <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="permanent-province"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.province }"
              v-model="form.permanent.province"
              :options="provinceOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Province"
              :disabled="isLoading"
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
            <label for="permanent-district">District <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="permanent-district"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.district }"
              v-model="form.permanent.district"
              :options="districtOptions.permanent"
              optionLabel="name"
              optionValue="name"
              placeholder="Select District"
              :disabled="isLoading || !form.permanent.province"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading districts...</small>
            <small v-if="!isLoading && districtOptions.permanent.length === 0 && form.permanent.province" class="text-red-500 text-sm">
              No districts available.
            </small>
            <small v-if="errors.permanent.district" class="text-red-500 text-sm">
              {{ errorMessages.permanent.district }}
            </small>
          </div>

          <div>
            <label for="permanent-localBody">Local Body <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="permanent-localBody"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.localBody }"
              v-model="form.permanent.localBody"
              :options="localBodyOptions.permanent"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Local Body"
              :disabled="isLoading || !form.permanent.district"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading local bodies...</small>
            <small v-if="!isLoading && localBodyOptions.permanent.length === 0 && form.permanent.district" class="text-red-500 text-sm">
              No local bodies available.
            </small>
            <small v-if="errors.permanent.localBody" class="text-red-500 text-sm">
              {{ errorMessages.permanent.localBody }}
            </small>
          </div>

          <div>
            <label for="permanent-wardNo">Ward No <span class="text-red-500">*</span></label><br />
            <InputNumber
              id="permanent-wardNo"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.wardNo }"
              v-model="form.permanent.wardNo"
            />
            <small v-if="errors.permanent.wardNo" class="text-red-500 text-sm">
              {{ errorMessages.permanent.wardNo }}
            </small>
          </div>

          <div>
            <label for="permanent-tole">Tole <span class="text-red-500">*</span></label><br />
            <InputText
              id="permanent-tole"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.tole }"
              v-model="form.permanent.tole"
            />
            <small v-if="errors.permanent.tole" class="text-red-500 text-sm">
              {{ errorMessages.permanent.tole }}
            </small>
          </div>

          <div>
            <label for="permanent-houseNo">House No</label><br />
            <InputNumber
              id="permanent-houseNo"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.houseNo }"
              v-model="form.permanent.houseNo"
            />
            <small v-if="errors.permanent.houseNo" class="text-red-500 text-sm">
              {{ errorMessages.permanent.houseNo }}
            </small>
          </div>
        </div>

        <!-- ─── Checkbox: Same as Permanent? ──── -->
        <div class="py-4 flex items-center">
          <input
            type="checkbox"
            id="sameAddress"
            v-model="sameAsPermanentComputed"
            class="mr-2"
          />
          <label for="sameAddress" class="font-medium">
            Temporary address same as permanent
          </label>
        </div>

        <!-- ───── TEMPORARY ADDRESS SECTION ───── -->
        <p class="text-blue-600 font-bold text-xl pt-4">Temporary Address</p>
        <div class="grid grid-cols-2 gap-5 py-6">
          <div>
            <label for="temporary-country">Country <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="temporary-country"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.country }"
              v-model="form.temporary.country"
              :options="countryOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              :disabled="sameAsPermanentComputed || isLoading"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading...</small>
            <small v-if="errors.temporary.country" class="text-red-500 text-sm">
              {{ errorMessages.temporary.country }}
            </small>
          </div>

          <div>
            <label for="temporary-province">Province <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="temporary-province"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.province }"
              v-model="form.temporary.province"
              :options="provinceOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Province"
              :disabled="sameAsPermanentComputed || isLoading"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading provinces...</small>
            <small v-if="!isLoading && provinceOptions.length === 0" class="text-red-500 text-sm">
              No provinces available.
            </small>
            <small v-if="errors.temporary.province" class="text-red-500 text-sm">
              {{ errorMessages.temporary.province }}
            </small>
          </div>

          <div>
            <label for="temporary-district">District <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="temporary-district"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.district }"
              v-model="form.temporary.district"
              :options="districtOptions.temporary"
              optionLabel="name"
              optionValue="name"
              placeholder="Select District"
              :disabled="sameAsPermanentComputed || isLoading || !form.temporary.province"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading districts...</small>
            <small v-if="!isLoading && districtOptions.temporary.length === 0 && form.temporary.province && !sameAsPermanentComputed" class="text-red-500 text-sm">
              No districts available.
            </small>
            <small v-if="errors.temporary.district" class="text-red-500 text-sm">
              {{ errorMessages.temporary.district }}
            </small>
          </div>

          <div>
            <label for="temporary-localBody">Local Body <span class="text-red-500">*</span></label><br />
            <Dropdown
              id="temporary-localBody"
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.localBody }"
              v-model="form.temporary.localBody"
              :options="localBodyOptions.temporary"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Local Body"
              :disabled="sameAsPermanentComputed || isLoading || !form.temporary.district"
            />
            <small v-if="isLoading" class="text-gray-500 text-sm">Loading local bodies...</small>
            <small v-if="!isLoading && localBodyOptions.temporary.length === 0 && form.temporary.district && !sameAsPermanentComputed" class="text-red-500 text-sm">
              No local bodies available.
            </small>
            <small v-if="errors.temporary.localBody" class="text-red-500 text-sm">
              {{ errorMessages.temporary.localBody }}
            </small>
          </div>

          <div>
            <label for="temporary-wardNo">Ward No <span class="text-red-500">*</span></label><br />
            <InputNumber
              id="temporary-wardNo"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.wardNo }"
              v-model="form.temporary.wardNo"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.wardNo" class="text-red-500 text-sm">
              {{ errorMessages.temporary.wardNo }}
            </small>
          </div>

          <div>
            <label for="temporary-tole">Tole <span class="text-red-500">*</span></label><br />
            <InputText
              id="temporary-tole"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.tole }"
              v-model="form.temporary.tole"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.tole" class="text-red-500 text-sm">
              {{ errorMessages.temporary.tole }}
            </small>
          </div>

          <div>
            <label for="temporary-houseNo">House No</label><br />
            <InputNumber
              id="temporary-houseNo"
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.houseNo }"
              v-model="form.temporary.houseNo"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.houseNo" class="text-red-500 text-sm">
              {{ errorMessages.temporary.houseNo }}
            </small>
          </div>
        </div>
        <div class="flex justify-end pt-4">
          <Button label="Next" class="w-40" @click="submitForm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
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

const sameAsPermanentComputed = computed({
  get: () => kycStore.address.sameAsPermanent,
  set: (val) => {
    if (val) {
      kycStore.copyPermanentToTemporary();
      districtOptions.temporary = [...districtOptions.permanent];
      localBodyOptions.temporary = [...localBodyOptions.permanent];
    } else {
      kycStore.clearTemporary();
      districtOptions.temporary = [];
      localBodyOptions.temporary = [];
    }
  }
});

const errors = reactive({
  permanent: {
    country: false,
    province: false,
    district: false,
    localBody: false,
    wardNo: false,
    tole: false,
    houseNo: false,
  },
  temporary: {
    country: false,
    province: false,
    district: false,
    localBody: false,
    wardNo: false,
    tole: false,
    houseNo: false,
  }
});

const errorMessages = reactive({
  permanent: {
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: '',
    tole: '',
    houseNo: '',
  },
  temporary: {
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: '',
    tole: '',
    houseNo: '',
  }
});

const countryOptions = ref([{ name: 'Nepal' }]);
const provinceOptions = ref([]);
const districtOptions = reactive({
  permanent: [],
  temporary: []
});
const localBodyOptions = reactive({
  permanent: [],
  temporary: []
});

const form = reactive({
  permanent: { ...kycStore.address.permanent },
  temporary: { ...kycStore.address.temporary }
});

// Watch form.permanent and only update store with valid district and localBody
watch(
  () => form.permanent,
  (newPermanent) => {
    console.log('Permanent address changed:', newPermanent);
    // Only update store if district and localBody are non-empty
    if (newPermanent.district && newPermanent.localBody) {
      kycStore.updatePermanentAddress(newPermanent);
      console.log('Updated Pinia store (permanent):', kycStore.address.permanent);
    }
    if (sameAsPermanentComputed.value) {
      form.temporary = { ...form.permanent };
      districtOptions.temporary = [...districtOptions.permanent];
      localBodyOptions.temporary = [...localBodyOptions.permanent];
      kycStore.copyPermanentToTemporary();
    }
  },
  { deep: true }
);

// Watch form.temporary and only update store with valid district and localBody
watch(
  () => form.temporary,
  (newTemporary) => {
    console.log('Temporary address changed:', newTemporary);
    if (!sameAsPermanentComputed.value && newTemporary.district && newTemporary.localBody) {
      kycStore.updateTemporaryAddress(newTemporary);
      console.log('Updated Pinia store (temporary):', kycStore.address.temporary);
    }
  },
  { deep: true }
);

// Watch province changes for permanent address
watch(
  () => form.permanent.province,
  async (newProvince, oldProvince) => {
    console.log('Permanent province changed:', newProvince);
    if (newProvince && newProvince !== oldProvince) {
      await loadDistricts(newProvince, 'permanent');
      // Only reset district and localBody if current values are invalid
      if (form.permanent.district && !districtOptions.permanent.some(d => d.name === form.permanent.district)) {
        form.permanent.district = '';
        form.permanent.localBody = '';
        localBodyOptions.permanent = [];
      }
    } else if (!newProvince) {
      districtOptions.permanent = [];
      localBodyOptions.permanent = [];
      form.permanent.district = '';
      form.permanent.localBody = '';
    }
  }
);

// Watch province changes for temporary address
watch(
  () => form.temporary.province,
  async (newProvince, oldProvince) => {
    console.log('Temporary province changed:', newProvince);
    if (newProvince && newProvince !== oldProvince && !sameAsPermanentComputed.value) {
      await loadDistricts(newProvince, 'temporary');
      // Only reset district and localBody if current values are invalid
      if (form.temporary.district && !districtOptions.temporary.some(d => d.name === form.temporary.district)) {
        form.temporary.district = '';
        form.temporary.localBody = '';
        localBodyOptions.temporary = [];
      }
    } else if (!newProvince && !sameAsPermanentComputed.value) {
      districtOptions.temporary = [];
      localBodyOptions.temporary = [];
      form.temporary.district = '';
      form.temporary.localBody = '';
    }
  }
);

// Watch district changes for permanent address
watch(
  () => form.permanent.district,
  async (newDistrict, oldDistrict) => {
    console.log('Permanent district changed:', newDistrict);
    if (newDistrict && newDistrict !== oldDistrict) {
      await loadLocalLevels(newDistrict, 'permanent');
      // Only reset localBody if current value is invalid
      if (form.permanent.localBody && !localBodyOptions.permanent.some(l => l.name === form.permanent.localBody)) {
        form.permanent.localBody = '';
      }
    } else if (!newDistrict) {
      localBodyOptions.permanent = [];
      form.permanent.localBody = '';
    }
  }
);

// Watch district changes for temporary address
watch(
  () => form.temporary.district,
  async (newDistrict, oldDistrict) => {
    console.log('Temporary district changed:', newDistrict);
    if (newDistrict && newDistrict !== oldDistrict && !sameAsPermanentComputed.value) {
      await loadLocalLevels(newDistrict, 'temporary');
      // Only reset localBody if current value is invalid
      if (form.temporary.localBody && !localBodyOptions.temporary.some(l => l.name === form.temporary.localBody)) {
        form.temporary.localBody = '';
      }
    } else if (!newDistrict && !sameAsPermanentComputed.value) {
      localBodyOptions.temporary = [];
      form.temporary.localBody = '';
    }
  }
);

// Watch sameAsPermanentComputed to sync temporary address
watch(sameAsPermanentComputed, (newVal) => {
  console.log('sameAsPermanent changed:', newVal);
  if (newVal) {
    form.temporary = { ...form.permanent };
    districtOptions.temporary = [...districtOptions.permanent];
    localBodyOptions.temporary = [...localBodyOptions.permanent];
    kycStore.copyPermanentToTemporary();
  } else {
    Object.keys(form.temporary).forEach(key => {
      form.temporary[key] = key === 'wardNo' || key === 'houseNo' ? null : '';
    });
    districtOptions.temporary = [];
    localBodyOptions.temporary = [];
    kycStore.clearTemporary();
  }
});

const isAlphabetic = (value) => /^[A-Za-z\s]+$/.test(value);

function resetErrors() {
  for (const section of ['permanent', 'temporary']) {
    for (const field in errors[section]) {
      errors[section][field] = false;
      errorMessages[section][field] = '';
    }
  }
}

function showErrorToast(message) {
  toast.add({
    severity: 'error',
    summary: 'Validation Error',
    detail: message,
    life: 3000
  });
}

function validateSection(sectionName) {
  let hasError = false;
  const f = form[sectionName];
  const e = errors[sectionName];
  const em = errorMessages[sectionName];

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
    em.localBody = 'Local Body is required.';
    showErrorToast('Local Body is required.');
    hasError = true;
  } else if (!isAlphabetic(f.localBody)) {
    e.localBody = true;
    em.localBody = 'Local Body must contain only letters and spaces.';
    showErrorToast('Local Body must contain only letters and spaces.');
    hasError = true;
  }

  if (
    f.wardNo === null ||
    f.wardNo === '' ||
    !Number.isInteger(f.wardNo) ||
    f.wardNo <= 0
  ) {
    e.wardNo = true;
    em.wardNo = 'Ward No is required and must be a positive integer.';
    showErrorToast('Ward No is required and must be a positive integer.');
    hasError = true;
  }

  if (!f.tole || f.tole.trim() === '') {
    e.tole = true;
    em.tole = 'Tole is required.';
    showErrorToast('Tole is required.');
    hasError = true;
  }

  if (
    f.houseNo !== null &&
    f.houseNo !== '' &&
    (!Number.isInteger(f.houseNo) || f.houseNo <= 0)
  ) {
    e.houseNo = true;
    em.houseNo = 'If provided, House No must be a positive integer.';
    showErrorToast('If provided, House No must be a positive integer.');
    hasError = true;
  }

  return !hasError;
}

function submitForm() {
  resetErrors();
  const permValid = validateSection('permanent');
  const tempValid = !sameAsPermanentComputed.value ? validateSection('temporary') : true;

  if (!permValid || !tempValid) {
    return;
  }

  kycStore.updatePermanentAddress(form.permanent);
  if (!sameAsPermanentComputed.value) {
    kycStore.updateTemporaryAddress(form.temporary);
  }

  console.log('Pinia Store State after submission:', kycStore.address);

  toast.add({
    severity: 'success',
    summary: 'Form Submitted',
    detail: 'All required fields are valid!',
    life: 3000
  });

  router.push('/kyc-parent-info');
}

async function loadProvinces() {
  try {
    isLoading.value = true;
    const response = await getProvinces({});
    console.log('Raw API Response (Provinces):', JSON.stringify(response, null, 2));
    provinceOptions.value = Array.isArray(response)
      ? response.map(item => ({
          name: item.name || item.province,
          id: item.id
        }))
      : [
          { name: 'Bagmati', id: 1 },
          { name: 'Gandaki', id: 2 },
          { name: 'Lumbini', id: 3 }
        ];
    console.log('provinceOptions after mapping:', provinceOptions.value);
  } catch (error) {
    console.error('Error loading provinces:', error);
    provinceOptions.value = [
      { name: 'Bagmati', id: 1 },
      { name: 'Gandaki', id: 2 },
      { name: 'Lumbini', id: 3 }
    ];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load provinces. Using default options.',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
}

async function loadDistricts(provinceName, section) {
  try {
    isLoading.value = true;
    const province = provinceOptions.value.find(p => p.name === provinceName);
    if (!province || !province.id) {
      throw new Error('Province ID not found');
    }
    const response = await getDistrict(province.id);
    console.log('Raw API Response (Districts):', JSON.stringify(response, null, 2));
    districtOptions[section] = Array.isArray(response)
      ? response.map(item => ({
          name: item.district,
          id: item.id
        }))
      : [];
    if (districtOptions[section].length === 0) {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No districts available for the selected province.',
        life: 3000
      });
    }
    // Sync temporary options if sameAsPermanent
    if (section === 'permanent' && sameAsPermanentComputed.value) {
      districtOptions.temporary = [...districtOptions.permanent];
      kycStore.copyPermanentToTemporary();
    }
  } catch (error) {
    console.error(`Error loading districts for ${provinceName}:`, error);
    districtOptions[section] = [];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load districts. Please try again.',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
}

async function loadLocalLevels(districtName, section) {
  try {
    isLoading.value = true;
    const district = districtOptions[section].find(d => d.name === districtName);
    if (!district || !district.id) {
      throw new Error('District ID not found');
    }
    const response = await getLocalLevel(district.id);
    console.log('Raw API Response (Local Levels):', JSON.stringify(response, null, 2));
    localBodyOptions[section] = Array.isArray(response)
      ? response.map(item => ({ name: item.localLevel }))
      : [];
    if (localBodyOptions[section].length === 0) {
      toast.add({
        severity: 'warn',
        summary: 'Warning',
        detail: 'No local bodies available for the selected district.',
        life: 3000
      });
    }
    // Sync temporary options if sameAsPermanent
    if (section === 'permanent' && sameAsPermanentComputed.value) {
      localBodyOptions.temporary = [...localBodyOptions.permanent];
      kycStore.copyPermanentToTemporary();
    }
  } catch (error) {
    console.error(`Error loading local levels for ${districtName}:`, error);
    localBodyOptions[section] = [];
    toast.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'Failed to load local bodies. Please try again.',
      life: 3000
    });
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  loadProvinces();
});
</script>