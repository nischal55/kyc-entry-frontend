<template>
    <Toast />

    <div class="flex justify-center">
    <div class="w-[60%] p-5 mt-10 shadow-md bg-white rounded-md overflow-auto">
      <div class="p-10">
        <!-- ───── PERMANENT ADDRESS SECTION ───── -->
        <p class="text-blue-800 font-bold text-xl">Permanent Address</p>
        <div class="grid grid-cols-2 gap-5 py-6">
          <!-- Country (Permanent) -->
          <div>
            <label>Country <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.country }"
              v-model="form.permanent.country"
              :options="countryOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              @input="e => (form.permanent.country = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.permanent.country" class="text-red-500 text-sm">
              {{ errorMessages.permanent.country }}
            </small>
          </div>

          <!-- Province (Permanent) -->
          <div>
            <label>Province <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.province }"
              v-model="form.permanent.province"
              :options="provinceOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Province"
              @input="e => (form.permanent.province = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.permanent.province" class="text-red-500 text-sm">
              {{ errorMessages.permanent.province }}
            </small>
          </div>

          <!-- District (Permanent) -->
          <div>
            <label>District <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.district }"
              v-model="form.permanent.district"
              :options="districtOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select District"
              @input="e => (form.permanent.district = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.permanent.district" class="text-red-500 text-sm">
              {{ errorMessages.permanent.district }}
            </small>
          </div>

          <!-- Local Body (Permanent) -->
          <div>
            <label>Local Body <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.localBody }"
              v-model="form.permanent.localBody"
              :options="localBodyOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Local Body"
            />
            <small v-if="errors.permanent.localBody" class="text-red-500 text-sm">
              {{ errorMessages.permanent.localBody }}
            </small>
          </div>

          <!-- Ward No (Permanent) -->
          <div>
            <label>Ward No <span class="text-red-500">*</span></label><br />
            <InputNumber
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.wardNo }"
              v-model="form.permanent.wardNo"
            />
            <small v-if="errors.permanent.wardNo" class="text-red-500 text-sm">
              {{ errorMessages.permanent.wardNo }}
            </small>
          </div>

          <!-- Tole (Permanent) -->
          <div>
            <label>Tole <span class="text-red-500">*</span></label><br />
            <InputText
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.permanent.tole }"
              v-model="form.permanent.tole"
            />
            <small v-if="errors.permanent.tole" class="text-red-500 text-sm">
              {{ errorMessages.permanent.tole }}
            </small>
          </div>

          <!-- House No (Permanent, optional) -->
          <div>
            <label>House No</label><br />
            <InputNumber
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
        <p class="text-blue-800 font-bold text-xl pt-4">Temporary Address</p>
        <div class="grid grid-cols-2 gap-5 py-6">
          <!-- Country (Temporary) -->
          <div>
            <label>Country <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.country }"
              v-model="form.temporary.country"
              :options="countryOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Country"
              :disabled="sameAsPermanentComputed"
              @input="e => (form.temporary.country = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.temporary.country" class="text-red-500 text-sm">
              {{ errorMessages.temporary.country }}
            </small>
          </div>

          <!-- Province (Temporary) -->
          <div>
            <label>Province <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.province }"
              v-model="form.temporary.province"
              :options="provinceOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Province"
              :disabled="sameAsPermanentComputed"
              @input="e => (form.temporary.province = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.temporary.province" class="text-red-500 text-sm">
              {{ errorMessages.temporary.province }}
            </small>
          </div>

          <!-- District (Temporary) -->
          <div>
            <label>District <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.district }"
              v-model="form.temporary.district"
              :options="districtOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select District"
              :disabled="sameAsPermanentComputed"
              @input="e => (form.temporary.district = e.target.value?.replace(/[^a-zA-Z]/g, ''))"
            />
            <small v-if="errors.temporary.district" class="text-red-500 text-sm">
              {{ errorMessages.temporary.district }}
            </small>
          </div>

          <!-- Local Body (Temporary) -->
          <div>
            <label>Local Body <span class="text-red-500">*</span></label><br />
            <Dropdown
              class="w-full border rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.localBody }"
              v-model="form.temporary.localBody"
              :options="localBodyOptions"
              optionLabel="name"
              optionValue="name"
              placeholder="Select Local Body"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.localBody" class="text-red-500 text-sm">
              {{ errorMessages.temporary.localBody }}
            </small>
          </div>

          <!-- Ward No (Temporary) -->
          <div>
            <label>Ward No <span class="text-red-500">*</span></label><br />
            <InputNumber
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.wardNo }"
              v-model="form.temporary.wardNo"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.wardNo" class="text-red-500 text-sm">
              {{ errorMessages.temporary.wardNo }}
            </small>
          </div>

          <!-- Tole (Temporary) -->
          <div>
            <label>Tole <span class="text-red-500">*</span></label><br />
            <InputText
              class="w-full border border-slate-300 rounded-md h-10"
              :class="{ 'border-red-500': errors.temporary.tole }"
              v-model="form.temporary.tole"
              :disabled="sameAsPermanentComputed"
            />
            <small v-if="errors.temporary.tole" class="text-red-500 text-sm">
              {{ errorMessages.temporary.tole }}
            </small>
          </div>

          <!-- House No (Temporary, optional) -->
          <div>
            <label>House No</label><br />
            <InputNumber
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
import { ref, reactive, computed, watch } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import { useKycFormStore } from '@/stores/addressStore';


const toast = useToast();
const router = useRouter();
const kycStore = useKycFormStore();

const sameAsPermanentComputed = computed({
  get: () => kycStore.address.sameAsPermanent,
  set: (val) => {
    kycStore.address.sameAsPermanent = val
  }
})

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
const provinceOptions = ref([{name:'Gandaki'}]);
const districtOptions = ref([{name:'Gorkha'}]);
const localBodyOptions = ref([{name:'Palungtar'}]);

const form = {
  permanent: kycStore.address.permanent,
  temporary: kycStore.address.temporary
}

watch(
  () => kycStore.address.sameAsPermanent,
  (newVal) => {
    if (newVal) {
      Object.assign(form.temporary, form.permanent);
    } else {
      Object.keys(form.temporary).forEach(key => {
        form.temporary[key] = null;
      });
    }
  }
)

const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

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
        em.country = 'Country must contain only letters.';
        showErrorToast('Country must contain only letters.');
        hasError = true;
    }

    if (!f.province) {
        e.province = true;
        em.province = 'Province is required.';
        showErrorToast('Province is required.');
        hasError = true;
    } else if (!isAlphabetic(f.province)) {
        e.province = true;
        em.province = 'Province must contain only letters.';
        showErrorToast('Province must contain only letters.');
        hasError = true;
    }

    if (!f.district) {
        e.district = true;
        em.district = 'District is required.';
        showErrorToast('District is required.');
        hasError = true;
    } else if (!isAlphabetic(f.district)) {
        e.district = true;
        em.district = 'District must contain only letters.';
        showErrorToast('District must contain only letters.');
        hasError = true;
    }

    if (!f.localBody) {
        e.localBody = true;
        em.localBody = 'Local Body is required.';
        showErrorToast('Local Body is required.');
        hasError = true;
    } else if (!isAlphabetic(f.localBody)) {
        e.localBody = true;
        em.localBody = 'Local Body must contain only letters.';
        showErrorToast('Local Body must contain only letters.');
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
        em.tole = 'Tole is required';
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
    return true;
}

    function submitForm() {
      resetErrors();
      const permValid = validateSection('permanent');
      const tempValid = validateSection('temporary');

      if (!permValid || !tempValid) {
          return
        }

      toast.add({
          severity: 'success',
          summary: 'Form Submitted',
          detail: 'All required fields are valid!',
          life: 3000
      });

      router.push('/kyc-parent-info')
  }
</script>

<style scoped>
.overflow-auto {
    max-height: 80vh;
}
</style>
