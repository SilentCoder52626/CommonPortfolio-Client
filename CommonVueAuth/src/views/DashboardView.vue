<template>
  <main>
    {{message}}
  </main>
</template>
<script setup>
import axios from '@/plugins/axios'
import { onMounted,ref } from 'vue';

const message = ref("");
onMounted(async  () => {
   const response = await axios.get("/api/user-details");
   if(response.status == 200){
      const user = await response.data;
      message.value = "Hello, " + user.name;

   }
})

</script>