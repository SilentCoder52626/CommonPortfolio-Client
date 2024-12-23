<template>
    <div>
        <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
          
          <h1 class="h3 mb-3 fw-normal">Please Register</h1>

          <div class="form-floating">
            <input v-model="data.name" class="form-control" id="name" placeholder="name" required>
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating">
            <input v-model="data.userName" type="text" class="form-control" id="userName" placeholder="user-name" required>
            <label for="userName">User Name</label>
          </div>
          <div class="form-floating">
            <input v-model="data.email" type="email" class="form-control" id="email" placeholder="name@example.com" required>
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input v-model="data.contact" type="phone" class="form-control" id="contact" placeholder="0000000000" required>
            <label for="contact">Contact</label>
          </div>
          <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" id="password" placeholder="Password" required>
            <label for="password">Password</label>
          </div>

          <div class="form-floating">
            <input v-model="data.confirmPassword" type="password" class="form-control" id="confirmPassword" placeholder="Password" required>
            <label for="confirmPassword">Confirm Password</label>
          </div>

         
          <button class="btn btn-primary w-100 py-2" type="submit">Register</button>
          
        </form>
      </main>
    </div>
</template>

<script setup>

import axios from '@/plugins/axios'
import { reactive } from 'vue';
import router from '@/router';

const data = reactive({
    userName: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword : ""
})
const submit = async () =>{
    if(data.password != data.confirmPassword){
        alert("Password and confirm password mis-matched.")
        return;
    }
    var response = await axios.post("auth/register",JSON.stringify(data));
    if(response.status == 200){
        alert("Successfyully registered.");
        await router.push("/login");
    }else{
        alert("Something went wrong.");

    }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>