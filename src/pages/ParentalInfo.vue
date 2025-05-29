<template>
    <div class="flex justify-center">
        <div class="w-[60%] p-10 mt-10 shadow-md bg-white rounded-md">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Family Details</p>
                <div class="grid grid-cols-2 gap-5 py-10">
                    <div>
                        <label>Father's Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.fatherName }" v-model="form.fatherName"
                            @input="e => form.fatherName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.fatherName" class="text-red-500">Please enter a valid name.</small>
                    </div>
                    <div>
                        <label>Mother's Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.motherName }" v-model="form.motherName"
                            @input="e => form.motherName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.motherName" class="text-red-500">Please enter a valid name.</small>
                    </div>
                    <div>
                        <label>GrandFather's Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.grandFatherName }" v-model="form.grandFatherName"
                            @input="e => form.grandFatherName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.grandFatherName" class="text-red-500">Please enter a valid name.</small>
                    </div>
                    <div>
                        <label>GrandMother's Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.grandMotherName }" v-model="form.grandMotherName"
                            @input="e => form.grandMotherName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.grandMotherName" class="text-red-500">Please enter a valid name.</small>
                    </div>

                    <!-- Marital Status Checkbox -->
                    <div class="col-span-2">
                        <label class="block mb-2">Marital Status</label>
                        <div class="flex items-center gap-5">
                            <div class="flex items-center gap-2">
                                <input type="radio" id="marriedYes" :value="true" v-model="form.married" />
                                <label for="marriedYes" class="text-sm font-medium">Married</label>
                            </div>
                            <div class="flex items-center gap-2">
                                <input type="radio" id="marriedNo" :value="false" v-model="form.married" />
                                <label for="marriedNo" class="text-sm font-medium">Unmarried</label>
                            </div>
                        </div>
                        <small v-if="errors.married" class="text-red-500">Please select your marital status.</small>
                    </div>

                    <!-- Conditionally rendered fields -->
                    <div v-if="form.married">
                        <label>Spouse Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.spouseName }" v-model="form.spouseName"
                            :disabled="!form.married"
                            @input="e => form.spouseName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.spouseName" class="text-red-500">Please enter a valid name.</small>
                    </div>
                    <div v-if="form.married">
                        <label>Father-in-Law's Name</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.fatherInLawName }" v-model="form.fatherInLawName"
                            :disabled="!form.married"
                            @input="e => form.fatherInLawName = e.target.value.replace(/[^a-zA-Z ]/g, '')" />
                        <small v-if="errors.fatherInLawName" class="text-red-500">Please enter a valid name.</small>
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
import { ref, computed, watch } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useFamilyStore } from '@/stores/family';
import { toRaw } from 'vue';
import { useRouter } from 'vue-router';

const familyStore = useFamilyStore();
const router = useRouter();

const form = computed({
    get: () => familyStore.form,
    set: (val) => familyStore.updateForm(val),
});

const errors = ref({
    fatherName: false,
    motherName: false,
    grandFatherName: false,
    grandMotherName: false,
    spouseName: false,
    fatherInLawName: false,
    married: false, // <-- new error field
});


const isAlphabetic = (value) => /^[A-Za-z ]+$/.test(value);

const resetErrors = () => {
    Object.keys(errors.value).forEach(key => {
        errors.value[key] = false;
    });
};

// Watch for marital status change and reset fields
watch(() => form.value.married, (newVal) => {
    if (!newVal) {
        form.value.spouseName = '';
        form.value.fatherInLawName = '';
    }
});

const validateField = (fieldName, value) => {
    if (!value || !isAlphabetic(value)) {
        errors.value[fieldName] = true;
        return false;
    }
    return true;
};

const submitForm = () => {
    resetErrors();
    let hasError = false;

    const requiredFields = ['fatherName', 'motherName', 'grandFatherName', 'grandMotherName'];
    requiredFields.forEach(field => {
        if (!validateField(field, form.value[field])) {
            hasError = true;
        }
    });

    // Validate marital status
    // if (form.value.married === null) {
    //     errors.value.married = true;
    //     hasError = true;
    // }

    // If married, validate additional fields
    if (form.value.married) {
        ['spouseName', 'fatherInLawName'].forEach(field => {
            const val = form.value[field];
            if (val && !isAlphabetic(val)) {
                errors.value[field] = true;
                hasError = true;
            }
        });
    }

    if (hasError) return;

    const familyData = toRaw(form.value);
    familyStore.updateForm(familyData);
    router.push('/kyc-financial-info');

    console.log('Family details are valid:', form.value);
};

</script>
