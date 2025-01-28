<template>
  <div class="rounded overflow-x-hidden shadow-lg w-full" ref="dashboardTemplate">
    <div class="px-4 py-4 p-2">
      <b>{{ username }}</b> <br /><br />

      <div v-html="marked(info)">

      </div>

    </div>
  </div>
</template>

<script setup>
import axios from '../plugins/axios'
import { onMounted, ref } from 'vue';
import { useToast } from '../composables/useToast';
import loader from '../composables/loader';
import { afterSlot } from '../composables/afterSlot';
import { marked } from 'marked';
const $toast = useToast();
const info = ref("");
const username = ref("");
const dashboardTemplate = ref(null);

onMounted(async () => {
  try {
    loader.BlockWindow(dashboardTemplate.value, afterSlot());

    const response = await axios.get("/api/user-details");
    if (response.status === 200) {
      const user = response.data;
      username.value = `Hey, ${user.name}`;
      info.value = `
Welcome to Common Portfolio
A dynamic portfolio generator to showcase your skills and projects effortlessly!

Follow these tips to set up your portfolio with ease:

1. **Banner Image**: Use this [Canva Design](https://www.canva.com/design/DAGckV_b3Sg/qDFFYezEKR1YNVH8Fpm0cg/edit?utm_content=DAGckV_b3Sg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) as your banner image.
2. **Connect GitHub**: Link your **GitHub account** to populate the Projects tab automatically.
3. **Showcase Blogs**: Create an account on [Dev.to](https://dev.to/) (*a community of software developers helping one another*). Once posted, your blogs can be displayed on your portfolio.
4. **Skills Icons**: Use the \`code\` class only from \`<i class="fa-solid fa-code"></i>\` for your skills icon. If it’s unavailable, feel free to select any icon of your choice. The icon list will be updated soon!
5. **Contact Page**: Use [Web3Forms](https://web3forms.com/) (*a free contact form API to send submissions to your email*).

Enjoy creating your portfolio and showcasing your talent!
`;
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