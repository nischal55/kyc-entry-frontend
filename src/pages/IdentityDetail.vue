<template>
    <div class="flex justify-center">
        <div class="w-[60%] p-10 mt-10 shadow-md bg-white rounded-md">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Identity Details</p>
                <div class="grid grid-cols-2 gap-5 py-10">
                    <div>
                        <label>Identity Type</label><br />
                        <Dropdown class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.identityType }" v-model="form.identityType"
                            :options="salutationOptions" optionLabel="name" placeholder="Select Identity Type" />
                        <small v-if="errors.identityType" class="text-red-500">Identity type is required.</small>
                    </div>
                    <div>
                        <label>Identity Number</label><br />
                        <InputNumber class="w-full border border-slate-200 rounded-md h-10"
                            :class="{ 'border-red-500': errors.identityNumber }" v-model="form.identityNumber"
                            :useGrouping="false" />
                        <small v-if="errors.identityNumber" class="text-red-500">Identity number must be 10
                            digits.</small>
                    </div>
                    <div>
                        <label>Authority</label><br />
                        <InputText class="w-full border rounded-md h-10" :class="{ 'border-red-500': errors.authority }"
                            v-model="form.authority"
                            @input="e => form.authority = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.authority" class="text-red-500">Please enter a valid authority name.</small>
                    </div>
                    <div>
                        <label>Place of Issue</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.placeOfIssue }" v-model="form.placeOfIssue"
                            @input="e => form.placeOfIssue = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.placeOfIssue" class="text-red-500">Please enter a valid place.</small>
                    </div>
                    <div>
                        <label>Nationality</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.nationality }" v-model="form.nationality"
                            @input="e => form.nationality = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.nationality" class="text-red-500">Please enter a valid nationality.</small>
                    </div>
                    <div>
                        <label>Birth Place</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.birthPlace }" v-model="form.birthPlace"
                            @input="e => form.birthPlace = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.birthPlace" class="text-red-500">Please enter a valid birth place.</small>
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
import { ref, computed, toRaw } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import { useIdentityStore } from '@/stores/identityStore';

const router = useRouter();
const identityStore = useIdentityStore();

const form = computed({
    get: () => identityStore.form,
    set: (val) => identityStore.updateForm(val),
});

const salutationOptions = [
    { name: 'Citizenship' },
    { name: 'Passport' },
    { name: 'Driving License' },
    { name: 'National ID' }
];

const errors = ref({
    identityType: false,
    identityNumber: false,
    authority: false,
    placeOfIssue: false,
    nationality: false,
    birthPlace: false,
});

const isAlphabetic = (value) => /^[A-Za-z ]+$/.test(value);

const resetErrors = () => {
    Object.keys(errors.value).forEach(key => {
        errors.value[key] = false;
    });
};

const submitForm = () => {
    resetErrors();

    let hasError = false;

    // Required alphabetic fields
    const requiredTextFields = ['authority', 'placeOfIssue', 'nationality', 'birthPlace'];
    requiredTextFields.forEach(field => {
        if (!form.value[field] || !isAlphabetic(form.value[field])) {
            errors.value[field] = true;
            hasError = true;
        }
    });

    // Identity Type
    if (!form.value.identityType) {
        errors.value.identityType = true;
        hasError = true;
    }

    // Identity Number (just required now, no length check)
    if (!form.value.identityNumber) {
        errors.value.identityNumber = true;
        hasError = true;
    }

    if (hasError) return;

    const identityData = toRaw(form.value);
    identityStore.updateForm(identityData);
    router.push('/kyc-declaration-info');

    console.log('Identity details are valid:', identityData);
};
</script>
