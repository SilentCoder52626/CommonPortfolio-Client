<template>
  <template v-if="config.IsExceptionThrown">
    <NotFound />
  </template>
  <template v-if="!config.IsLoading && config.UseDefaultTheme">

    <DefaultTheme :userData="userResponse.data" />
  </template>
  <template v-if="config.IsLoading">
    <div class="flex justify-center items-center min-h-screen">
      <div class="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-indigo-600"></div>
    </div>
  </template>
</template>


<script setup>
import NotFound from '../components/NotFound.vue';
import DefaultTheme from '../components/portfolio/DefaultTheme.vue';
import axios from '../plugins/axios';
import { onMounted, reactive } from 'vue';


var userResponse = reactive({
  data: null
});
var config = reactive({
  IsLoading: true,
  UseDefaultTheme: false,
  IsExceptionThrown: false
});
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  config.IsLoading = true;

  const response = await axios.get('/api/' + props.userName + '/info');
  if (response.status == 200) {
    userResponse.data = response.data;
    var theme = response.data.setting.theme;
    if (theme == "Default") {
      config.UseDefaultTheme = true;
    }
    config.IsLoading = false;
    config.IsExceptionThrown = false;


  } else if (response.status == 500) {
    config.IsExceptionThrown = true;
    config.IsLoading = false;

  }

})

</script>
