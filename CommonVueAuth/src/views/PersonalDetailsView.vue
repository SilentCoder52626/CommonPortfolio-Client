<template>
    <div class="rounded overflow-x-hidden shadow-lg p-3" ref="PersonalDetailsForm">

        <form @submit.prevent="submit" >

            <div class="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div class="position">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Position</label>
                        <input v-model="data.position" type="text" required
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Position">
                    </div>
                </div>
                <div class="subName">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Second Name</label>
                        <input v-model="data.subName" type="text"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Nickname">
                    </div>
                </div>
                <div class="shortDescription">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Short Description</label>
                        <textarea v-model="data.shortDescription" type="text"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Short and sweet description"> </textarea>
                    </div>
                </div>
                <div class="longDescription">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Detailed Description</label>
                        <textarea v-model="data.detailedDescription" type="text"
                            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                            placeholder="Short and sweet description"> </textarea>
                    </div>
                </div>
                <div class="profile">
                    <div class="w-full">
                        <label class="text-base text-gray-500 font-semibold mb-2 block">Profile Picture</label>
                        <input type="file" @change="handleProfileFileUpload"
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
                        <input type="file" @change="handleBannerFileUpload"
                            class="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded" />
                        <p class="text-xs text-gray-400 mt-2">PNG and JPG are Allowed.</p>
                    </div>
                    <div v-if="imagePre.bannerImage">
                        <img :src="imagePre.bannerImage" alt="Banner Image" class="h-32 rounded-lg mt-4" />
                    </div>
                </div>
                


            </div>
            <div class='actions mt-6 flex justify-end'>
                    <button type="submit"  
                        class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500 w-1/5">
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

const imagePre = reactive({
    bannerImage: null,
    profilePicture: null,
});
const data = reactive({
    bannerImage: null,
    profilePicture: null,
    subName: null,
    position: null,
    shortDescription: null,
    detailedDescription: null


});

onMounted(async () => {
    loader.BlockWindow(PersonalDetailsForm.value, afterSlot());

    var response = await axios.get("/api/account-details");
    if (response && response.status === 200) {
        const responseData = response.data;

        data.bannerImage = responseData.bannerImage;
        data.profilePicture = responseData.profilePicture;
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

});

const submit = async () => {

    loader.BlockWindow(PersonalDetailsForm.value, afterSlot("Please wait.."));

    const formData = new FormData();
    formData.append('bannerImage', data.bannerImage);
    formData.append('profilePicture', data.profilePicture);
    formData.append('subName', data.subName);
    formData.append('position', data.position);
    formData.append('shortDescription', data.shortDescription);
    formData.append('detailedDescription', data.detailedDescription);

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
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePre.bannerImage = e.target.result;
        };
        reader.readAsDataURL(file);
        data.bannerImage = file;

    } else {
        data.bannerImage = null;
        imagePre.bannerImage = null;
        $toast.info('Please upload a valid PNG or JPG image.', 'Info');
    }
}
function handleProfileFileUpload(event) {
    const file = event.target.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePre.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
        data.profilePicture = file;
    } else {
        data.profilePicture = null;
        imagePre.profilePicture = null;
        $toast.info('Please upload a valid PNG or JPG image.', 'Info');
    }
}
</script>


<style scoped></style>