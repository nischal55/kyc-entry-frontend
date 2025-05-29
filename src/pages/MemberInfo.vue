<template>
    <div class="flex justify-center">
        <div class="w-[90%] lg:w-[60%] p-2 lg:p-5 mt-10 shadow-md bg-white rounded-md overflow-scroll">
            <div class="lg:p-10 p-2">
                <p class="text-blue-800 font-bold text-xl">Personal Informations</p>
                <div class="grid grid-col-1 lg:grid-cols-2 lg:gap-5 py-10">
                    <div>
                        <label>Salutation</label><br />
                        <Dropdown class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.salutation }" v-model="form.salutation"
                            :options="salutationOptions" optionLabel="name" placeholder="Select Salutation" />
                        <small v-if="errors.salutation" class="text-red-500">Salutation is required.</small>
                    </div>

                    <div>
                        <label>First Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.firstName }" v-model="form.firstName"
                            @input="e => form.firstName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.firstName" class="text-red-500">Enter a valid First Name.</small>
                    </div>

                    <div>
                        <label>Middle Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.middleName }" v-model="form.middleName"
                            @input="e => form.middleName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.middleName" class="text-red-500">Enter a valid Middle Name.</small>
                    </div>

                    <div>
                        <label>Last Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.lastName }" v-model="form.lastName"
                            @input="e => form.lastName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                        <small v-if="errors.lastName" class="text-red-500">Enter a valid Last Name.</small>
                    </div>

                    <div>
                        <label>Date of Birth</label><br />
                        <DatePicker class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.dob }" v-model="form.dob" />
                        <small v-if="errors.dob" class="text-red-500">Date of Birth is required.</small>
                    </div>

                    <div>
                        <label>Gender</label><br />
                        <Dropdown class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.gender }" v-model="form.gender" :options="genderOptions"
                            optionLabel="name" placeholder="Select Gender" />
                        <small v-if="errors.gender" class="text-red-500">Gender is required.</small>
                    </div>

                    <div>
                        <label>Mobile No</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.mobile }" v-model="form.mobile" :useGrouping="false" />
                        <small v-if="errors.mobile" class="text-red-500">Mobile number must be 10 digits.</small>
                    </div>

                    <div>
                        <label>Phone No</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.phone }" v-model="form.phone" :useGrouping="false" />
                        <small v-if="errors.phone" class="text-red-500">Phone number must be 7 digits.</small>
                    </div>

                    <div>
                        <label>Email</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.email }" type="email" v-model="form.email" />
                        <small v-if="errors.email" class="text-red-500">Enter a valid email address.</small>
                    </div>


                </div>
                <div>
                    <Button label="Next" class="w-full lg:w-40" @click="submitForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useKycFormStore } from '@/stores/kycForm';
import { toRaw } from 'vue'


const router = useRouter()
const kycStore = useKycFormStore();


const form = computed({
    get: () => kycStore.form,
    set: (val) => kycStore.updateForm(val),
});

const errors = ref({
    salutation: false,
    firstName: false,
    middleName: false,
    lastName: false,
    dob: false,
    gender: false,
    mobile: false,
    phone: false,
    email: false,
});

const salutationOptions = ref([
    { name: 'Mr' },
    { name: 'Mrs' },
    { name: 'Miss' },
]);

const identityOptions = ref([
    { name: 'Citizenship' },
    { name: 'Passport' },
    { name: 'Election Card' },
]);

const genderOptions = ref([
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },
]);

const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const resetErrors = () => {
    Object.keys(errors.value).forEach((key) => {
        errors.value[key] = false;
    });
};

const submitForm = () => {
    const f = form.value;
    resetErrors();

    let hasError = false;

    if (!f.salutation) errors.value.salutation = hasError = true;
    if (!f.firstName || !isAlphabetic(f.firstName)) errors.value.firstName = hasError = true;
    if (f.middleName && !isAlphabetic(f.middleName)) errors.value.middleName = hasError = true;
    if (!f.lastName || !isAlphabetic(f.lastName)) errors.value.lastName = hasError = true;
    if (!f.dob) errors.value.dob = hasError = true;
    if (!f.gender) errors.value.gender = hasError = true;
    if (!f.mobile || f.mobile.toString().length !== 10) errors.value.mobile = hasError = true;
    if (!f.phone || f.phone.toString().length !== 7) errors.value.phone = hasError = true;
    if (!f.email || !isValidEmail(f.email)) errors.value.email = hasError = true;

    if (hasError) return;
    const customer_data = toRaw(f)
    kycStore.updateForm(customer_data)
    router.push('/kyc-address-info')
};
</script>
