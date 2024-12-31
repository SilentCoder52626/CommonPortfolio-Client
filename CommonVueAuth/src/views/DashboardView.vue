<template >
  <div ref="dashboardTemplate">
    
    <div>
      {{ message }}
    </div>

   
  </div>
</template>

<script setup>
import axios from '../plugins/axios'
import { onMounted,ref } from 'vue';
import { useToast } from '../composables/useToast';
import { useLoader } from '../composables/spinner';

const $toast = useToast();
const $loader = useLoader();
const message = ref("");
const dashboardTemplate = ref(null);

onMounted(async () => {
    try {
      
      $loader.blockWindow(dashboardTemplate.value);
      
      const response = await axios.get("/api/user-details");
      if (response.status === 200) {
        const user = response.data;
        message.value = "Hello, " + user.name;
        $loader.unBlockWindow();
      } else {
        $toast.error("Something went wrong.", "Error!");
        $loader.unBlockWindow();

      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
});

</script>