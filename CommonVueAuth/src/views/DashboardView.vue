<template>
  <div>
    
    <div>
      {{ message }}
    </div>

   
  </div>
</template>

<script setup>
import axios from '../plugins/axios'
import { onMounted,ref } from 'vue';
import { useToast } from '../composables/useToast';

const $toast = useToast();
const message = ref("");

onMounted(async () => {
    try {
      const response = await axios.get("/api/user-details");
      if (response.status === 200) {
        const user = response.data;
        message.value = "Hello, " + user.name;
        isLoaded = true;
      } else {
        $toast.error("Something went wrong.", "Error!");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
});

</script>