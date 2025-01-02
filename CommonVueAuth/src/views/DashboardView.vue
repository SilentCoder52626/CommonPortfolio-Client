<template >
  <div class="rounded overflow-hidden shadow-lg w-1/4" ref="dashboardTemplate">
    <div class="px-4 p-2">

      {{ message }}
   
    </div>
  </div>
</template>

<script setup>
import axios from '../plugins/axios'
import { onMounted,ref } from 'vue';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';

const $toast = useToast();

const message = ref("");
const dashboardTemplate = ref(null);
onMounted(async () => {
    try {
      loader.BlockWindow(dashboardTemplate.value, afterSlot());
      
      const response = await axios.get("/api/user-details");
      if (response.status === 200) {
        const user = response.data;
        message.value = "Hello, " + user.name;
        loader.UnBlockWindow();
      } else {
        $toast.error("Something went wrong.", "Error!");
        loader.UnBlockWindow();
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
});

</script>