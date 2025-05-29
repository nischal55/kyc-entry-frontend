<template>
    <Toast />

    <div class="flex justify-center">
        <div class="w-[60%] p-5 mt-10 shadow-md bg-white rounded-md overflow-auto">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Permanent Address</p>
                <div class="grid grid-cols-2 gap-5 py-6">
                    <div>
                        <label>Country <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.country }" v-model="form.permanent.country"
                            :options="countryOptions" optionLabel="name" optionValue="name" placeholder="Select Country"
                            @input="e => form.permanent.country = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.permanent.country" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.country }}
                        </small>
                    </div>

                    <div>
                        <label>Province <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.province }" v-model="form.permanent.province"
                            :options="provinceOptions" optionLabel="name" placeholder="Select Province"
                            @input="e => form.permanent.province = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.permanent.province" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.province }}
                        </small>
                    </div>

                    <div>
                        <label>District <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.district }" v-model="form.permanent.district"
                            :options="districtOptions" optionLabel="name" placeholder="Select District"
                            @input="e => form.permanent.district = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.permanent.district" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.district }}
                        </small>
                    </div>

                    <div>
                        <label>Local Body <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.localBody }" v-model="form.permanent.localBody"
                            :options="localBodyOptions" optionLabel="name" placeholder="Select Local Body" />
                        <small v-if="errors.permanent.localBody" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.localBody }}
                        </small>
                    </div>

                    <div>
                        <label>Ward No <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.wardNo }" v-model="form.permanent.wardNo" />
                        <small v-if="errors.permanent.wardNo" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.wardNo }}
                        </small>
                    </div>

                    <div>
                        <label>Tole <span class="text-red-500">*</span></label><br />
                        <InputText class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.tole }" v-model="form.permanent.tole" />
                        <small v-if="errors.permanent.tole" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.tole }}
                        </small>
                    </div>

                    <div>
                        <label>House No</label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.houseNo }" v-model="form.permanent.houseNo" />
                        <small v-if="errors.permanent.houseNo" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.houseNo }}
                        </small>
                    </div>

                    <div>
                        <label>Mobile No<span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.mobile }" v-model="form.permanent.mobile"
                            :useGrouping="false" />
                        <small v-if="errors.permanent.mobile" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.mobile }}
                        </small>
                    </div>

                    <div>
                        <label>Phone No</label><br />
                        <InputNumber class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.phone }" v-model="form.permanent.phone"
                            :useGrouping="false" />
                        <small v-if="errors.permanent.phone" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.phone }}
                        </small>
                    </div>

                    <div>
                        <label>Email <span class="text-red-500">*</span></label><br />
                        <InputText class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.permanent.email }" type="email"
                            v-model="form.permanent.email" />
                        <small v-if="errors.permanent.email" class="text-red-500 text-sm">
                            {{ errorMessages.permanent.email }}
                        </small>
                    </div>
                </div>

                <div class="py-4 flex items-center">
                    <input type="checkbox" id="sameAddress" v-model="sameAsPermanent" @change="toggleTemporaryAddress()"
                        class="mr-2" />
                    <label for="sameAddress" class="font-medium">Temporary address same as permanent</label>
                </div>

                <p class="text-blue-800 font-bold text-xl pt-4">Temporary Address</p>
                <div class="grid grid-cols-2 gap-5 py-6">
                    <div>
                        <label>Country <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.country }" v-model="form.temporary.country"
                            :options="countryOptions" optionLabel="name" placeholder="Select Country"
                            :disabled="sameAsPermanent"
                            @input="e => form.temporary.country = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.temporary.country" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.country }}
                        </small>
                    </div>

                    <div>
                        <label>Province <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.province }" v-model="form.temporary.province"
                            :options="provinceOptions" optionLabel="name" placeholder="Select Province"
                            :disabled="sameAsPermanent"
                            @input="e => form.temporary.province = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.temporary.province" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.province }}
                        </small>
                    </div>

                    <div>
                        <label>District <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.district }" v-model="form.temporary.district"
                            :options="districtOptions" optionLabel="name" placeholder="Select District"
                            :disabled="sameAsPermanent"
                            @input="e => form.temporary.district = e.target.value?.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.temporary.district" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.district }}
                        </small>
                    </div>

                    <div>
                        <label>Local Body <span class="text-red-500">*</span></label><br />
                        <Dropdown class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.localBody }" v-model="form.temporary.localBody"
                            :options="localBodyOptions" optionLabel="name" placeholder="Select Local Body"
                            :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.localBody" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.localBody }}
                        </small>
                    </div>

                    <div>
                        <label>Ward No <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.wardNo }" v-model="form.temporary.wardNo"
                            :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.wardNo" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.wardNo }}
                        </small>
                    </div>

                    <div>
                        <label>Tole <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.tole }" v-model="form.temporary.tole"
                            :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.tole" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.tole }}
                        </small>
                    </div>

                    <div>
                        <label>House No</label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.houseNo }" v-model="form.temporary.houseNo"
                            :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.houseNo" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.houseNo }}
                        </small>
                    </div>

                    <div>
                        <label>Mobile <span class="text-red-500">*</span></label><br />
                        <InputNumber class="w-full border  border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.mobile }" v-model="form.temporary.mobile"
                            :useGrouping="false" :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.mobile" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.mobile }}
                        </small>
                    </div>

                    <div>
                        <label>Phone</label><br />
                        <InputNumber class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.phone }" v-model="form.temporary.phone"
                            :useGrouping="false" :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.phone" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.phone }}
                        </small>
                    </div>

                    <div>
                        <label>Email <span class="text-red-500">*</span></label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.temporary.email }" type="email"
                            v-model="form.temporary.email" :disabled="sameAsPermanent" />
                        <small v-if="errors.temporary.email" class="text-red-500 text-sm">
                            {{ errorMessages.temporary.email }}
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
import { ref, reactive } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const form = reactive({
    permanent: {
        country: '',
        province: '',
        district: '',
        localBody: null,
        wardNo: null,
        tole: '',
        houseNo: null,
        phone: null,
        mobile: null,
        email: ''
    },
    temporary: {
        country: '',
        province: '',
        district: '',
        localBody: null,
        wardNo: null,
        tole: null,
        houseNo: null,
        phone: null,
        mobile: null,
        email: ''
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
        phone: false,
        mobile: false,
        email: false
    },
    temporary: {
        country: false,
        province: false,
        district: false,
        localBody: false,
        wardNo: false,
        tole: false,
        houseNo: false,
        phone: false,
        mobile: false,
        email: false
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
        phone: '',
        mobile: '',
        email: ''
    },
    temporary: {
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
    }
});

const sameAsPermanent = ref(false);

const countryOptions = ref([{ name: 'Nepal' }]);
const provinceOptions = ref([]);
const districtOptions = ref([]);
const localBodyOptions = ref([]);

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

function clearTemporaryErrors() {
    for (const field in errors.temporary) {
        errors.temporary[field] = false;
        errorMessages.temporary[field] = '';
    }
}

function toggleTemporaryAddress() {
    if (sameAsPermanent.value) {
        form.temporary.country = form.permanent.country;
        form.temporary.province = form.permanent.province;
        form.temporary.district = form.permanent.district;
        form.temporary.localBody = form.permanent.localBody;
        form.temporary.wardNo = form.permanent.wardNo;
        form.temporary.tole = form.permanent.tole;
        form.temporary.houseNo = form.permanent.houseNo;
        form.temporary.phone = form.permanent.phone;
        form.temporary.mobile = form.permanent.mobile;
        form.temporary.email = form.permanent.email;

        for (const field in errors.temporary) {
            errors.temporary[field] = false;
            errorMessages.temporary[field] = '';
        }
    } else {
        for (const key in form.temporary) {
            form.temporary[key] = null;
        }
        clearTemporaryErrors();
    }
}

function submitForm() {
    resetErrors();
    let hasError = false;

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

        if (!f.localBody || !f.localBody.name) {
            e.localBody = true;
            em.localBody = 'Local Body is required.';
            showErrorToast('Local Body is required.');
            hasError = true;
        } else if (!isAlphabetic(f.localBody.name)) {
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

        if (
            f.tole === null ||
            f.tole === ''
        ) {
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

        const mobileStr = f.mobile != null ? f.mobile.toString() : '';
        if (!mobileStr || mobileStr.length !== 10 || !/^\d{10}$/.test(mobileStr)) {
            e.mobile = true;
            em.mobile = 'Mobile number must be exactly 10 digits.';
            showErrorToast('Mobile number must be exactly 10 digits.');
            hasError = true;
        }

        if (f.phone !== null && f.phone !== '') {
            const phoneStr = f.phone.toString();
            if (phoneStr.length !== 7 || !/^\d{7}$/.test(phoneStr)) {
                e.phone = true;
                em.phone = 'If provided, Phone number must be exactly 7 digits.';
                showErrorToast('If provided, Phone number must be exactly 7 digits.');
                hasError = true;
            }
        }

        if (!f.email) {
            e.email = true;
            em.email = 'Email is required.';
            showErrorToast('Email is required.');
            hasError = true;
        } else if (!isValidEmail(f.email)) {
            e.email = true;
            em.email = 'Please enter a valid email address.';
            showErrorToast('Please enter a valid email address.');
            hasError = true;
        }
    }

    validateSection('permanent');
    validateSection('temporary');

    if (hasError) {
        return;
    }

    toast.add({
        severity: 'success',
        summary: 'Form Submitted',
        detail: 'All required fields are valid!',
        life: 3000
    });

    console.log('Permanent Address:', form.permanent);
    console.log('Temporary Address:', form.temporary);
}
</script>

<style scoped>
.overflow-auto {
    max-height: 80vh;
}
</style>
