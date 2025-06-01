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
        <!-- <div class="py-4 flex items-center">
          <input
            type="checkbox"
            id="sameAddress"
            v-model="sameAsPermanentComputed"
            class="mr-2"
          />
          <label for="sameAddress" class="font-medium">
            Temporary address same as permanent
          </label>
        </div> -->

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

// ─── Reactive form data ─────────────────────────────────────────────────────
const form = reactive({
  permanent: {
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: null,
    tole: '',
    houseNo: null
  },
  temporary: {
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: null,
    tole: '',
    houseNo: null
  }
});

// ─── Error state ─────────────────────────────────────────────────────────────
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
    houseNo: ''
  },
  temporary: {
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: '',
    tole: '',
    houseNo: ''
  }
});

// ─── Dropdown options ────────────────────────────────────────────────────────
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

// ─── “Same as Permanent?” toggle ────────────────────────────────────────────
const sameAsPermanentComputed = computed({
  get: () => kycStore.address.sameAsPermanent,
  set: (val) => {
    kycStore.setSameAsPermanent(val);
    if (val) {
      // Copy the entire permanent object into temporary (reactively)
      Object.assign(form.temporary, form.permanent);
      // Mirror the loaded districts/localBodies
      districtOptions.temporary = [...districtOptions.permanent];
      localBodyOptions.temporary = [...localBodyOptions.permanent];
    }
  }
});

// ─── Initialize `form` from the store ───────────────────────────────────────
function initializeForm() {
  // Use Object.assign instead of “form.permanent = { … }”
  Object.assign(form.permanent, kycStore.address.permanent);
  Object.assign(form.temporary, kycStore.address.temporary);

  // If “sameAsPermanent” was already true in the store, copy it here as well
  if (sameAsPermanentComputed.value) {
    districtOptions.temporary = [...districtOptions.permanent];
    localBodyOptions.temporary = [...localBodyOptions.permanent];
  }
}

// ─── Watch store changes (if some other part of your app updates address) ───
watch(
  () => kycStore.address,
  (newVal) => {
    initializeForm();
    if (newVal.sameAsPermanent) {
      districtOptions.temporary = [...districtOptions.permanent];
      localBodyOptions.temporary = [...localBodyOptions.permanent];
    }
  },
  { deep: true, immediate: true }
);

// ─── Load Provinces → onMounted & keep store in sync ────────────────────────
async function loadProvinces() {
  try {
    isLoading.value = true;
    const response = await getProvinces({});
    // Map whatever your API gives you. If your API returns “province” field, use that; otherwise fallback.
    provinceOptions.value = Array.isArray(response)
      ? response.map(item => ({
          name: item.name || item.province,
          id: item.id
        }))
      : [
          // Fallback set
          { name: 'Bagmati', id: 1 },
          { name: 'Gandaki', id: 2 },
          { name: 'Lumbini', id: 3 }
        ];

    // If there’s already a stored province but it’s not in options anymore, clear out the old data
    if (
      form.permanent.province &&
      !provinceOptions.value.some(p => p.name === form.permanent.province)
    ) {
      form.permanent.province = '';
      form.permanent.district = '';
      form.permanent.localBody = '';
    }
  } catch (err) {
    console.error('Error loading provinces:', err);
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

// ─── Load Districts for a given province ────────────────────────────────────
async function loadDistricts(provinceName, section) {
  try {
    isLoading.value = true;
    const provinceObj = provinceOptions.value.find(p => p.name.trim() === provinceName.trim());
    if (!provinceObj || !provinceObj.id) {
      throw new Error('Province ID not found');
    }

    const response = await getDistrict(provinceObj.id);
    // Map based on your API’s JSON. If it’s “district_name” & “district_id,” adjust accordingly.
    districtOptions[section] = Array.isArray(response)
      ? response.map(item => ({
          name: item.district || item.name || item.district_name,
          id: item.id || item.district_id
        }))
      : [];

    // If the user already had a stored district (from a previous session) and it still exists, keep it.
    const storedDistrict = kycStore.address[section].district;
    if (
      storedDistrict &&
      districtOptions[section].some((d) => d.name === storedDistrict)
    ) {
      // Assign it into the reactive form, but ONLY after options are loaded
      form[section].district = storedDistrict;
      await loadLocalLevels(storedDistrict, section);
      // now localBodyOptions[section] is loaded
      const storedLocalBody = kycStore.address[section].localBody;
      if (
        storedLocalBody &&
        localBodyOptions[section].some((l) => l.name === storedLocalBody)
      ) {
        form[section].localBody = storedLocalBody;
      }
    } else {
      // The stored district is no longer valid → clear outdated fields
      form[section].district = '';
      form[section].localBody = '';
    }

    // If “same as permanent,” mirror into the temporary side
    if (section === 'permanent' && sameAsPermanentComputed.value) {
      districtOptions.temporary = [...districtOptions.permanent];
      localBodyOptions.temporary = [...localBodyOptions.permanent];
    }
  } catch (err) {
    console.error(`Error loading districts for ${provinceName}:`, err);
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

// ─── Load Local Bodies for a given district ─────────────────────────────────
async function loadLocalLevels(districtName, section) {
  try {
    isLoading.value = true;
    const districtObj = districtOptions[section].find(d => d.name.trim() === districtName.trim());
    if (!districtObj || !districtObj.id) {
      throw new Error('District ID not found');
    }

    const response = await getLocalLevel(districtObj.id);
    localBodyOptions[section] = Array.isArray(response)
      ? response.map(item => ({
          name: item.localLevel || item.name || item.local_level || item.localbody
        }))
      : [];

    // If the user already had a stored localBody and it still exists, keep it
    const storedLocalBody = kycStore.address[section].localBody;
    if (
      storedLocalBody &&
      localBodyOptions[section].some((l) => l.name === storedLocalBody)
    ) {
      form[section].localBody = storedLocalBody;
    } else {
      // Otherwise, clear outdated value
      form[section].localBody = '';
    }

    // If “same as permanent,” mirror into temporary
    if (section === 'permanent' && sameAsPermanentComputed.value) {
      localBodyOptions.temporary = [...localBodyOptions.permanent];
    }
  } catch (err) {
    console.error(`Error loading local bodies for ${districtName}:`, err);
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

// ─── Watchers for Province → load Districts ─────────────────────────────────
watch(
  () => form.permanent.province,
  async (newProvince, oldProvince) => {
    if (newProvince && newProvince !== oldProvince) {
      await loadDistricts(newProvince, 'permanent');
      // We don’t immediately write to the store here, we wait until actual district+localBody are chosen.
    } else if (!newProvince) {
      districtOptions.permanent = [];
      localBodyOptions.permanent = [];
      form.permanent.district = '';
      form.permanent.localBody = '';
    }
  }
);

watch(
  () => form.temporary.province,
  async (newProvince, oldProvince) => {
    if (
      newProvince &&
      newProvince !== oldProvince &&
      !sameAsPermanentComputed.value
    ) {
      await loadDistricts(newProvince, 'temporary');
    } else if (!newProvince && !sameAsPermanentComputed.value) {
      districtOptions.temporary = [];
      localBodyOptions.temporary = [];
      form.temporary.district = '';
      form.temporary.localBody = '';
    }
  }
);

// ─── Watchers for District → load LocalBody ─────────────────────────────────
watch(
  () => form.permanent.district,
  async (newDistrict, oldDistrict) => {
    if (newDistrict && newDistrict !== oldDistrict) {
      await loadLocalLevels(newDistrict, 'permanent');
    } else if (!newDistrict) {
      localBodyOptions.permanent = [];
      form.permanent.localBody = '';
    }
  }
);

watch(
  () => form.temporary.district,
  async (newDistrict, oldDistrict) => {
    if (newDistrict && newDistrict !== oldDistrict && !sameAsPermanentComputed.value) {
      await loadLocalLevels(newDistrict, 'temporary');
    } else if (!newDistrict && !sameAsPermanentComputed.value) {
      localBodyOptions.temporary = [];
      form.temporary.localBody = '';
    }
  }
);

// ─── Validation & Submission ─────────────────────────────────────────────────
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
  }
  if (!f.province) {
    e.province = true;
    em.province = 'Province is required.';
    showErrorToast('Province is required.');
    hasError = true;
  }
  if (!f.district) {
    e.district = true;
    em.district = 'District is required.';
    showErrorToast('District is required.');
    hasError = true;
  }
  if (!f.localBody) {
    e.localBody = true;
    em.localBody = 'Local Body is required.';
    showErrorToast('Local Body is required.');
    hasError = true;
  }
  if (f.wardNo === null || f.wardNo === '' || !Number.isInteger(f.wardNo) || f.wardNo <= 0) {
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
  return !hasError;
}

async function submitForm() {
  resetErrors();
  const permValid = validateSection('permanent');
  const tempValid = sameAsPermanentComputed.value ? true : validateSection('temporary');

  if (!permValid || !tempValid) {
    return; // bail out if any section invalid
  }

  // ────────────────────────────────────────────────────────────────────────
  // Only now that everything is valid, push to the store in one shot:
  // ────────────────────────────────────────────────────────────────────────
  kycStore.updatePermanentAddress({ ...form.permanent });
  if (!sameAsPermanentComputed.value) {
    kycStore.updateTemporaryAddress({ ...form.temporary });
  }

  toast.add({
    severity: 'success',
    summary: 'Form Submitted',
    detail: 'Address details saved successfully!',
    life: 3000
  });

  router.push('/kyc-parent-info');
}

// ─── onMounted: grab store, load provinces, initialize dropdowns ─────────────
onMounted(async () => {
  initializeForm();
  await loadProvinces();

  // If store already had a province → load its districts & local bodies:
  if (form.permanent.province) {
    await loadDistricts(form.permanent.province, 'permanent');
  }
  if (form.permanent.district) {
    await loadLocalLevels(form.permanent.district, 'permanent');
  }

  if (!sameAsPermanentComputed.value && form.temporary.province) {
    await loadDistricts(form.temporary.province, 'temporary');
  }
  if (!sameAsPermanentComputed.value && form.temporary.district) {
    await loadLocalLevels(form.temporary.district, 'temporary');
  }
});
</script>
