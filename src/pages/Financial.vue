<template>
    <div class="flex justify-center">
        <div class="w-[60%] p-5 mt-10 shadow-md bg-white rounded-md">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Financial Information</p>
                <div class="grid grid-cols-2 gap-5 py-10">

                    <!-- Annual Income -->
                    <div>
                        <label>Annual Income</label><br />
                        <InputNumber class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.annualIncome }" v-model="form.annualIncome"
                            :useGrouping="false" />
                        <p v-if="errors.annualIncome" class="text-red-500 text-sm mt-1">Enter a valid annual income.</p>
                    </div>

                    <!-- Annual Transaction Volume -->
                    <div>
                        <label>Annual Transaction Volume</label><br />
                        <InputNumber class="w-full border border-slate-300 rounded-md h-10"
                            :class="{ 'border-red-500': errors.transactionVolume }" v-model="form.transactionVolume"
                            :useGrouping="false" />
                        <p v-if="errors.transactionVolume" class="text-red-500 text-sm mt-1">Enter a valid transaction
                            volume.</p>
                    </div>

                    <!-- Occupation -->
                    <div>
                        <label>Occupation</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.occupation }" v-model="form.occupation" />
                        <p v-if="errors.occupation" class="text-red-500 text-sm mt-1">Occupation is required.</p>
                    </div>

                    <!-- Designation -->
                    <div>
                        <label>Designation</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.designation }" v-model="form.designation" />
                        <p v-if="errors.designation" class="text-red-500 text-sm mt-1">Designation is required.</p>
                    </div>

                    <!-- PAN No -->
                    <div>
                        <label>PAN No</label><br />
                        <InputText class="w-full border rounded-md h-10" :class="{ 'border-red-500': errors.pan }"
                            v-model="form.pan" />
                        <p v-if="errors.pan" class="text-red-500 text-sm mt-1">Enter a valid PAN (e.g., alphanumeric).
                        </p>
                    </div>

                    <!-- Source of Income -->
                    <div>
                        <label>Source of Income</label><br />
                        <InputText class="w-full border rounded-md h-10"
                            :class="{ 'border-red-500': errors.sourceOfIncome }" v-model="form.sourceOfIncome" />
                        <p v-if="errors.sourceOfIncome" class="text-red-500 text-sm mt-1">Source of income is required.
                        </p>
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
import Button from 'primevue/button';

const form = ref({
    annualIncome: null,
    transactionVolume: null,
    occupation: '',
    designation: '',
    pan: '',
    sourceOfIncome: '',
});

const errors = ref({
    annualIncome: false,
    transactionVolume: false,
    occupation: false,
    designation: false,
    pan: false,
    sourceOfIncome: false,
});

const resetErrors = () => {
    Object.keys(errors.value).forEach(key => {
        errors.value[key] = false;
    });
};

const submitForm = () => {
    resetErrors();
    let hasError = false;

    const f = form.value;

    // Annual Income
    if (f.annualIncome === null || isNaN(f.annualIncome) || f.annualIncome <= 0) {
        errors.value.annualIncome = true;
        hasError = true;
    }

    // Annual Transaction Volume
    if (f.transactionVolume === null || isNaN(f.transactionVolume) || f.transactionVolume <= 0) {
        errors.value.transactionVolume = true;
        hasError = true;
    }

    // Occupation
    if (!f.occupation.trim()) {
        errors.value.occupation = true;
        hasError = true;
    }

    // Designation
    if (!f.designation.trim()) {
        errors.value.designation = true;
        hasError = true;
    }

    // PAN No
    if (!f.pan.trim() || !/^[A-Za-z0-9]{5,15}$/.test(f.pan)) {
        errors.value.pan = true;
        hasError = true;
    }

    // Source of Income
    if (!f.sourceOfIncome.trim()) {
        errors.value.sourceOfIncome = true;
        hasError = true;
    }

    if (hasError) return;

    console.log('Form Data:', f);
};
</script>
