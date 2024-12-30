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
onMounted(async  () => {
   const response = await axios.get("/api/user-details");
   if(response.status == 200){
      const user = await response.data;
      message.value = "Hello, " + user.name;
   }else{
    $toast.error("Something went wrong.","Error!");
   }
})

</script>