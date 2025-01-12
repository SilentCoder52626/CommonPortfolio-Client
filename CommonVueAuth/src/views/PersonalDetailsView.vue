<template>
    <div class="rounded overflow-x-hidden shadow-lg p-3">
        <div class="border-b-2 border-indigo-500 pb-3 flex justify-between items-center">
            <h4 class="text-xl font-medium text-gray-700 capitalize mb-0">
                <fa icon="fa fa-user" /> Personal Details
            </h4>
            <button @click="ToogleView" :class="`text-sm text-white ${toogleBtnColor} px-3 py-1 rounded-md`">
                <fa :icon="toogleIcon" /> {{ EditView }}
            </button>

        </div>
        <form @submit.prevent="submit" ref="PersonalDetailsForm" class="mt-2">

            <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div class="position">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Position</label>
                        <input v-model="data.position" type="text" required :disabled="!isEditView"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Position">
                    </div>
                </div>
                <div class="subName">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Second Name</label>
                        <input v-model="data.subName" type="text" :disabled="!isEditView"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Nickname">
                    </div>
                </div>
                <div class="shortDescription">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Short Description</label>
                        <textarea v-model="data.shortDescription" type="text" :disabled="!isEditView"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Short and sweet description"> </textarea>
                    </div>
                </div>
                <div class="longDescription">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Detailed Description</label>
                        <textarea v-model="data.detailedDescription" type="text" :disabled="!isEditView"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Short and sweet description"> </textarea>
                    </div>
                </div>
                <div class="profile">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Profile Picture</label>
                        <input type="file" @change="handleProfileFileUpload" :disabled="!isEditView"
                            class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                        <p class="text-xs text-gray-400 mt-2">PNG and JPG are Allowed.</p>
                    </div>
                    <div v-if="imagePre.profilePicture">
                        <img :src="imagePre.profilePicture" alt="Profile Image" class="h-32 rounded-lg mt-4" />
                    </div>
                </div>
                <div class="banner">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Banner Image</label>
                        <input type="file" @change="handleBannerFileUpload" :disabled="!isEditView"
                            class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                        <p class="text-xs text-gray-400 mt-2">PNG and JPG are Allowed.</p>
                    </div>
                    <div v-if="imagePre.bannerImage">
                        <img :src="imagePre.bannerImage" alt="Banner Image" class="h-32 rounded-lg mt-4" />
                    </div>
                </div>



            </div>
            <div v-if="isEditView" class='actions mt-6 flex justify-end'>
                <button type="submit"
                    class="px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                    Save
                </button>

            </div>

        </form>

    </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from '../plugins/axios';
import loader from '../composables/loader';
import { useToast } from '../composables/useToast';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();
const PersonalDetailsForm = ref(null);

const EditView = ref('');
const isEditView = ref(false);
const toogleIcon = ref('fa-edit');
const toogleBtnColor = ref(null);


const ToogleView = () => {
    isEditView.value = !isEditView.value;
    EditView.value = isEditView.value ? 'Cancel' : 'Edit';
    toogleIcon.value = isEditView.value ? "circle-xmark" : "fa-edit";
    toogleBtnColor.value = isEditView.value ? 'bg-red-500' : 'bg-green-500';
    if (isEditView.value) {
        toogleIcon.value = "circle-xmark";
    } else {
        fetchData();
    }
}

const imagePre = reactive({
    bannerImage: null,
    profilePicture: null,
});
const data = reactive({
    bannerPicture: null,
    profilePicture: null,
    subName: null,
    position: null,
    shortDescription: null,
    detailedDescription: null,
    deleteProfilePicture: false,
    deleteBannerPicture: false

});

onMounted(async () => {
    EditView.value = "Edit";
    toogleIcon.value = "fa-edit";
    toogleBtnColor.value = "bg-green-500";
    fetchData();


});
async function fetchData() {
    loader.BlockWindow(PersonalDetailsForm.value, afterSlot());
    imagePre.bannerImage = null;
    imagePre.profilePicture = null;
    
    var response = await axios.get("/api/account-details");
    if (response && response.status === 200) {
        const responseData = response.data;

        data.position = responseData.position;
        data.subName = responseData.subName;
        data.shortDescription = responseData.shortDescription;
        data.detailedDescription = responseData.detailedDescription;

        imagePre.bannerImage = responseData.bannerPictureLink;
        imagePre.profilePicture = responseData.profilePictureLink;
        loader.UnBlockWindow();
    } else {
        loader.UnBlockWindow();
        $toast.error(response.data.reason, 'Error');
    }
}

const submit = async () => {

    loader.BlockWindow(PersonalDetailsForm.value, afterSlot("Please wait.."));

    const formData = new FormData();
    
    formData.append('position', data.position);
    formData.append('subName', data.subName);
    formData.append('profilePicture', data.profilePicture);
    formData.append('bannerPicture', data.bannerPicture);
    formData.append('shortDescription', data.shortDescription);
    formData.append('detailedDescription', data.detailedDescription);
    formData.append('deleteBannerPicture', data.deleteBannerPicture);
    formData.append('deleteProfilePicture', data.deleteProfilePicture);

    var response = await axios.post("/api/account-details/addorupdate", formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    if (response && response.status === 200) {
        $toast.success("Personal details saved successfully.");
        const responseData = response.data;

        data.bannerImage = responseData.bannerImage;
        data.profilePicture = responseData.profilePicture;
        data.position = responseData.position;
        data.subName = responseData.subName;
        data.shortDescription = responseData.shortDescription;
        data.detailedDescription = responseData.detailedDescription;


        loader.UnBlockWindow();
    } else {
        loader.UnBlockWindow();
        console.error(response);
        $toast.error(response.data.reason, 'Error');
    }
}

function handleBannerFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if ((file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePre.bannerImage = e.target.result;
            };
            reader.readAsDataURL(file);
            data.bannerPicture = file;

        } else {
            $toast.info('Please upload a valid PNG or JPG image.', 'Info');

        }
    }
    else {
        data.bannerImage = null;
        imagePre.bannerImage = null;
        data.deleteBannerPicture = true;
    }
}
function handleProfileFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if ((file.type === 'image/png' || file.type === 'image/jpeg')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePre.profilePicture = e.target.result;
            };
            reader.readAsDataURL(file);
            data.profilePicture = file;

        } else {
            $toast.info('Please upload a valid PNG or JPG image.', 'Info');
        }
    }
    else {
        data.profilePicture = null;
        imagePre.profilePicture = null;
        data.deleteProfilePicture = true;
    }
}
</script>


<style scoped></style>