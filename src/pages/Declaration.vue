<template>
    <Toast />
    <div class="flex justify-center">
        <div class="w-[60%] mt-10 shadow-md bg-white">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Documents Uploads</p>

                <!-- Citizenship Front Side -->
                <div class="my-10 flex flex-col gap-2">
                    <label>Citizenship Front Side (jpg | jpeg | png)</label>
                    <FileUpload mode="basic" @select="(e) => onFileSelect(e, 'citizenshipFront')" customUpload auto
                        class="p-button-outlined" />
                    <span v-if="files.citizenshipFront" class="text-sm text-gray-600">
                        Selected: {{ files.citizenshipFront.name }}
                    </span>
                </div>

                <!-- Citizenship Back Side -->
                <div class="my-10 flex flex-col gap-2">
                    <label>Citizenship Back Side (jpg | jpeg | png)</label>
                    <FileUpload mode="basic" @select="(e) => onFileSelect(e, 'citizenshipBack')" customUpload auto
                        class="p-button-outlined" />
                    <span v-if="files.citizenshipBack" class="text-sm text-gray-600">
                        Selected: {{ files.citizenshipBack.name }}
                    </span>
                </div>

                <!-- Passport -->
                <div class="my-10 flex flex-col gap-2">
                    <label>Passport (jpg | jpeg | png)</label>
                    <FileUpload mode="basic" @select="(e) => onFileSelect(e, 'passport')" customUpload auto
                        class="p-button-outlined" />
                    <span v-if="files.passport" class="text-sm text-gray-600">
                        Selected: {{ files.passport.name }}
                    </span>
                </div>

                <!-- National ID -->
                <div class="my-10 flex flex-col gap-2">
                    <label>National ID (jpg | jpeg | png)</label>
                    <FileUpload mode="basic" @select="(e) => onFileSelect(e, 'nationalID')" customUpload auto
                        class="p-button-outlined" />
                    <span v-if="files.nationalID" class="text-sm text-gray-600">
                        Selected: {{ files.nationalID.name }}
                    </span>
                </div>

                <!-- PP size Photo -->
                <div class="my-10 flex flex-col gap-2">
                    <label>PP size Photo (jpg | jpeg | png)</label>
                    <FileUpload mode="basic" @select="(e) => onFileSelect(e, 'ppPhoto')" customUpload auto
                        class="p-button-outlined" />
                    <span v-if="files.ppPhoto" class="text-sm text-gray-600">
                        Selected: {{ files.ppPhoto.name }}
                    </span>
                </div>

                <!-- Submit Button -->
                <div>
                    <Button label="Submit" icon="pi pi-verified" class="w-40" @click="submitForm" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import FileUpload from 'primevue/fileupload';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const files = ref({
    citizenshipFront: null,
    citizenshipBack: null,
    passport: null,
    nationalID: null,
    ppPhoto: null,
});

const onFileSelect = (event, key) => {
    files.value[key] = event.files[0];
};

const submitForm = () => {
    if (!files.value.citizenshipFront) {
        toast.add({
            severity: 'warn',
            summary: 'Missing Document',
            detail: 'Citizenship Front Side is required',
            life: 3000,
        });
        return;
    }

    // Optional: handle the rest of the uploads
    console.log('Files ready to upload:', files.value);
    toast.add({
        severity: 'success',
        summary: 'Submitted',
        detail: 'Documents submitted successfully',
        life: 3000,
    });
};
</script>
