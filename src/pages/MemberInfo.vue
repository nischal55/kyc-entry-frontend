<template>
    <Toast />
    <div class="flex justify-center">
        <div class="w-[60%] h-[35rem] mt-10 shadow-md bg-white">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Personal Informations</p>
                <div class="grid grid-cols-2 gap-5 py-10">
                    <div>
                        <label>First Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.firstName }" v-model="form.firstName"
                            @input="e => form.firstName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                    </div>
                    <div>
                        <label>Middle Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.middleName }" v-model="form.middleName"
                            @input="e => form.middleName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                    </div>
                    <div>
                        <label>Last Name</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.lastName }" v-model="form.lastName"
                            @input="e => form.lastName = e.target.value.replace(/[^a-zA-Z]/g, '')" />
                    </div>
                    <div>
                        <label>Date of Birth</label><br />
                        <DatePicker class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.dob }" v-model="form.dob" />
                    </div>
                    <div>
                        <label>Gender</label><br />
                        <Dropdown class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.gender }" v-model="form.gender" :options="genderOptions"
                            optionLabel="name" placeholder="Select Gender" />
                    </div>
                    <div>
                        <label>Mobile No</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.mobile }" v-model="form.mobile" :useGrouping="false" />
                    </div>
                    <div>
                        <label>Phone No</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.phone }" v-model="form.phone" :useGrouping="false" />
                    </div>
                    <div>
                        <label>Email</label><br />
                        <InputText class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.email }" type="email" v-model="form.email" />
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
import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const form = ref({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: null,
    gender: null,
    mobile: null,
    phone: null,
    email: '',
});

const errors = ref({
    firstName: false,
    middleName: false,
    lastName: false,
    dob: false,
    gender: false,
    mobile: false,
    phone: false,
    email: false,
});

const genderOptions = ref([
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Others' },
]);

const isAlphabetic = (value) => /^[A-Za-z]+$/.test(value);
const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const isExactDigits = (value, length) =>
    typeof value === 'number' && value.toString().length === length;

const resetErrors = () => {
    Object.keys(errors.value).forEach((key) => {
        errors.value[key] = false;
    });
};

const showError = (message) => {
    toast.add({
        severity: 'error',
        summary: 'Validation Error',
        detail: message,
        life: 3000,
    });
};

const submitForm = () => {
    const f = form.value;
    resetErrors();

    let hasError = false;

    // First Name
    if (!f.firstName) {
        errors.value.firstName = true;
        hasError = true;
        showError('Enter the Valid First Name.');
    } else if (!isAlphabetic(f.firstName)) {
        errors.value.firstName = true;
        hasError = true;
        showError('Enter the Valid First Name.');
    }

    // Middle Name (optional)
    if (f.middleName && !isAlphabetic(f.middleName)) {
        errors.value.middleName = true;
        hasError = true;
        showError('Enter the Valid Middle Name.');
    }

    // Last Name
    if (!f.lastName) {
        errors.value.lastName = true;
        hasError = true;
        showError('Enter the Valid Last Name.');
    } else if (!isAlphabetic(f.lastName)) {
        errors.value.lastName = true;
        hasError = true;
        showError('Last Name should contain only letters.');
    }

    // DOB
    if (!f.dob) {
        errors.value.dob = true;
        hasError = true;
        showError('Date of Birth is required.');
    }

    // Gender
    if (!f.gender) {
        errors.value.gender = true;
        hasError = true;
        showError('Gender is required.');
    }

    // Mobile No - must be exactly 10 digits
    const mobileStr = f.mobile != null ? f.mobile.toString() : '';
    if (!mobileStr || mobileStr.length !== 10 || !/^\d{10}$/.test(mobileStr)) {
        errors.value.mobile = true;
        hasError = true;
        showError('Mobile number must be exactly 10 digits.');
    }

    // Phone No - must be exactly 7 digits
    const phoneStr = f.phone != null ? f.phone.toString() : '';
    if (!phoneStr || phoneStr.length !== 7 || !/^\d{7}$/.test(phoneStr)) {
        errors.value.phone = true;
        hasError = true;
        showError('Phone number must be exactly 7 digits.');
    }

    // Email
    if (!f.email) {
        errors.value.email = true;
        hasError = true;
        showError('Email is required.');
    } else if (!isValidEmail(f.email)) {
        errors.value.email = true;
        hasError = true;
        showError('Please enter a valid email address.');
    }

    if (hasError) {
        // Just return after showing all toasts
        return;
    }

    toast.add({
        severity: 'success',
        summary: 'Form Submitted',
        detail: 'All required fields are valid!',
        life: 3000,
    });

    console.log('Form Data:', f);
};

</script>
