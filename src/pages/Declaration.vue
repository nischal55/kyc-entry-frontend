<template>
    <Toast />
    <div class="flex justify-center">
        <div class="w-[60%] h-[32rem] mt-10 shadow-md bg-white">
            <div class="p-10">
                <p class="text-blue-800 font-bold text-xl">Documents Uploads</p>
                <div class="my-10 flex items-center gap-24">
                    <label>Citizenship (jpg | jpeg | png)</label><br />
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                </div>
                <div class="my-10 flex items-center gap-26">
                    <label>Passport ( jpg | jpeg | png)</label><br />
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                </div>
                <div class="my-10 flex items-center gap-24">
                    <label>National ID (jpg | jpeg | png)</label><br />
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                </div>
                <div class="my-10 flex items-center gap-22">
                    <label>PP size Photo (jpg | jpeg | png)</label><br />
                    <FileUpload mode="basic" @select="onFileSelect" customUpload auto severity="secondary"
                        class="p-button-outlined" />
                </div>

                <div>
                    <Button label="Submit" icon="pi pi-verified" class="w-40" @click="submitForm" />
                </div>
            </div>

        </div>

    </div>
</template>


<script setup>
import FileUpload from 'primevue/fileupload';
</script>