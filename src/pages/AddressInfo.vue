<template>
    <Toast />
    <div class="flex justify-center">
        <div class="w-[60%] h-[35rem] mt-10 shadow-md bg-white rounded-md">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Address Details</p>
                <div class="grid grid-cols-2 gap-5 py-10">
                    <div>
                        <label>Country <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.country }" v-model="form.country" :options="countryOptions"
                            optionLabel="name" placeholder="Select Country"
                            @input="e => form.country = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                            <small v-if="errors.country" class="text-red-500 text-sm">
                              {{ errorMessages.country }}
                            </small>
                    </div>
                    <div>
                        <label>Province <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.province }" v-model="form.province" :options="provinceOptions"
                            optionLabel="name" placeholder="Select Province" 
                            @input="e => form.province = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                            <small v-if="errors.province" class="text-red-500 text-sm">
                              {{ errorMessages.province }}
                            </small>
                    </div>
                    <div>
                        <label>District <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.district }" v-model="form.district" :options="districtOptions"
                            optionLabel="name" placeholder="Select District" 
                            @input="e => form.district = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                            <small v-if="errors.district" class="text-red-500 text-sm">
                              {{ errorMessages.district }}
                            </small>
                    </div>
                    <div>
                        <label>Local Body <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.localBody }" v-model="form.localBody" :options="localBodyOptions"
                            optionLabel="name" placeholder="Select Local Body" />
                            <small v-if="errors.localBody" class="text-red-500 text-sm">
                              {{ errorMessages.localBody }}
                            </small>
                    </div>
                    <div>
                        <label>Ward No <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.wardNo }" v-model="form.wardNo"
                            />
                            <small v-if="errors.wardNo" class="text-red-500 text-sm">
                              {{ errorMessages.wardNo }}
                            </small>
                    </div>
                    <div>
                        <label>Tole <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.tole }" v-model="form.tole"
                            />
                            <small v-if="errors.tole" class="text-red-500 text-sm">
                              {{ errorMessages.tole }}
                            </small>
                    </div>
                    <div>
                        <label>House No</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.houseNo }" v-model="form.houseNo"
                            />
                            <small v-if="errors.houseNo" class="text-red-500 text-sm">
                              {{ errorMessages.houseNo }}
                            </small>
                    </div>
                    <div>
                        <label>Mobile <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.mobile }" v-model="form.mobile" :useGrouping="false" />
                            <small v-if="errors.mobile" class="text-red-500 text-sm">
                              {{ errorMessages.mobile }}
                            </small>
                    </div>
                    <div>
                        <label>Phone </label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.phone }" v-model="form.phone" :useGrouping="false" />
                            <small v-if="errors.phone" class="text-red-500 text-sm">
                              {{ errorMessages.phone }}
                            </small>
                    </div>
                    <div>
                        <label>Email <span class="text-red-500">*</span></label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.email }" type="email" v-model="form.email" />
                            <small v-if="errors.email" class="text-red-500 text-sm">
                              {{ errorMessages.email }}
                            </small>
                    </div>
                </div>
                <div>
                    <Button label="Next" class="w-40" @click="submitForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const form = ref({
    country: '',
    province: '',
    district: '',
    localBody: '',
    wardNo: null,
    tole: '',
    houseNo: null,
    phone: null,
    mobile:null,
    email:''
});

const errors = ref({
    country: false,
    province: false,
    district: false,
    localBody: false,
    wardNo: false,
    tole: false,
    houseNo: false,
    phone: false,
    mobile:false,
    email:false
});

const errorMessages = ref({
  country: '',
  province: '',
  district: '',
  localBody: '',
  wardNo: '',
  tole: '',
  houseNo: '',
  phone: '',
  mobile: '',
  email: ''
});

const countryOptions   = ref([]);
const provinceOptions  = ref([]);
const districtOptions  = ref([]);
const localBodyOptions = ref([]);

const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const resetErrors = () => {
    Object.keys(errors.value).forEach((key) => {
        errors.value[key] = false;
    });
};

const showErrorToast = (message) => {
  toast.add({
    severity: 'error',
    summary: 'Validation Error',
    detail: message,
    life: 3000
  });
};

const submitForm = () => {
    const f = form.value;
    resetErrors();

    let hasError = false;

  if (!f.country) {
    errors.value.country = true;
    errorMessages.value.country = 'Country is required.';
    showErrorToast('Country is required.');
    hasError = true;
  } else if (!isAlphabetic(f.country)) {
    errors.value.country = true;
    errorMessages.value.country = 'Country must contain only letters.';
    showErrorToast('Country must contain only letters.');
    hasError = true;
  }

  if (!f.province) {
    errors.value.province = true;
    errorMessages.value.province = 'Province is required.';
    showErrorToast('Province is required.');
    hasError = true;
  } else if (!isAlphabetic(f.province)) {
    errors.value.province = true;
    errorMessages.value.province = 'Province must contain only letters.';
    showErrorToast('Province must contain only letters.');
    hasError = true;
  }

  if (!f.district) {
    errors.value.district = true;
    errorMessages.value.district = 'District is required.';
    showErrorToast('District is required.');
    hasError = true;
  } else if (!isAlphabetic(f.district)) {
    errors.value.district = true;
    errorMessages.value.district = 'District must contain only letters.';
    showErrorToast('District must contain only letters.');
    hasError = true;
  }

  if (!f.localBody || !f.localBody.name) {
    errors.value.localBody = true;
    errorMessages.value.localBody = 'Local Body is required.';
    showErrorToast('Local Body is required.');
    hasError = true;
  } else if (!isAlphabetic(f.localBody.name)) {
    errors.value.localBody = true;
    errorMessages.value.localBody = 'Local Body must contain only letters.';
    showErrorToast('Local Body must contain only letters.');
    hasError = true;
  }

  if (
    f.wardNo === null ||
    f.wardNo === '' ||
    !Number.isInteger(f.wardNo) ||
    f.wardNo <= 0
  ) {
    errors.value.wardNo = true;
    errorMessages.value.wardNo = 'Ward No is required and must be a positive integer.';
    showErrorToast('Ward No is required and must be a positive integer.');
    hasError = true;
  }

  if (
    f.tole === null ||
    f.tole === '' ||
    !Number.isInteger(f.tole) ||
    f.tole <= 0
  ) {
    errors.value.tole = true;
    errorMessages.value.tole = 'Tole is required and must be a positive integer.';
    showErrorToast('Tole is required and must be a positive integer.');
    hasError = true;
  }

  if (
    f.houseNo !== null &&
    f.houseNo !== '' &&
    (!Number.isInteger(f.houseNo) || f.houseNo <= 0)
  ) {
    errors.value.houseNo = true;
    errorMessages.value.houseNo = 'If provided, House No must be a positive integer.';
    showErrorToast('If provided, House No must be a positive integer.');
    hasError = true;
  }

  const mobileStr = f.mobile != null ? f.mobile.toString() : '';
  if (!mobileStr || mobileStr.length !== 10 || !/^\d{10}$/.test(mobileStr)) {
    errors.value.mobile = true;
    errorMessages.value.mobile = 'Mobile number must be exactly 10 digits.';
    showErrorToast('Mobile number must be exactly 10 digits.');
    hasError = true;
  }

  if (f.phone !== null && f.phone !== '') {
    const phoneStr = f.phone.toString();
    if (phoneStr.length !== 7 || !/^\d{7}$/.test(phoneStr)) {
      errors.value.phone = true;
      errorMessages.value.phone = 'If provided, Phone number must be exactly 7 digits.';
      showErrorToast('If provided, Phone number must be exactly 7 digits.');
      hasError = true;
    }
  }

  if (!f.email) {
    errors.value.email = true;
    errorMessages.value.email = 'Email is required.';
    showErrorToast('Email is required.');
    hasError = true;
  } else if (!isValidEmail(f.email)) {
    errors.value.email = true;
    errorMessages.value.email = 'Please enter a valid email address.';
    showErrorToast('Please enter a valid email address.');
    hasError = true;
  }

  if (hasError) {
    return;
  }

    console.log('Form Data:', f);
};

</script>
