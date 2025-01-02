<template>
    <div class="flex flex-col">
        <div class="w-full p-6 bg-white rounded-lg shadow max-w-md ">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                Change Password
            </h2>
            <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" @submit.prevent="submit" ref="ChangePasswordForm">
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Email</span>
                    <input v-model="data.email" type="email" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500" disabled="disabled">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Password</span>
                    <input v-model="data.oldPassword" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">New Password</span>
                    <input v-model="data.password" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>
                <label class="block mt-3">
                    <span class="text-sm text-gray-700">Re-Password</span>
                    <input v-model="data.confirmPassword" type="password" class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
                </label>

                <div class="mt-6">
                    <button type="submit" class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive, onMounted } from 'vue';
    import { useAuthStore } from '../../stores/authStore';
    import { useToast } from '../../composables/useToast';
    import loader from '../../composables/loader';
    import { afterSlot } from '../../composables/afterSlot';
    import axios from '../../plugins/axios';
    import router from '../../router';

    const authStore = useAuthStore();
    const $toast = useToast();
    const ChangePasswordForm = ref(null);

    const data = reactive({
        name: "",
        email: "",
        password: "",
        oldPassword: "",
        confirmPassword : ""
    })
    onMounted(async () => {
        try {
            loader.BlockWindow(ChangePasswordForm.value, afterSlot());
            
            const response = await axios.get("/api/user-details");
            if (response.status === 200) {
                const user = response.data;
                data.email = user.email;
                loader.UnBlockWindow();
            } else {
                $toast.error("Something went wrong.", "Error!");
                loader.UnBlockWindow();
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    });
    const submit = async () => {
        try {
            loader.BlockWindow(ChangePasswordForm.value,afterSlot());
        
            if(data.password != data.confirmPassword){
                $toast.info("Password and confirm password mis-matched.")
                loader.UnBlockWindow();
                return;
            }
            const response = await axios.post("/api/user/change-password", {
                "oldPassword" : data.oldPassword,
                "newPassword" : data.confirmPassword
            });
            if (response.status === 200) {
                const data = response.data;
                $toast.success(data.message);
                loader.UnBlockWindow();
                
                authStore.clearAuthDetails();
                await router.push("/login");
                
            } else if(response.status === 500){
                const data = response.data;
                $toast.info(data.reason);
                loader.UnBlockWindow();
                
            } else {
                $toast.error("Something went wrong.", "Error!");
                loader.UnBlockWindow();
            }


        } catch (error) {
            console.error("Error fetching user:", error);
        }

    } 
</script>

<style scoped>
</style>