<template>
    <div>
        <main class="form-signin w-100 m-auto">
        <form @submit.prevent="submit">
          
          <h1 class="h3 mb-3 fw-normal">Please Login</h1>

          <div class="form-floating">
            <input v-model="data.userName"  class="form-control" id="userName" placeholder="User Name">
            <label for="userName">User Name</label>
            <span class="text-danger">{{ validation.userNameVal }}</span>

          </div>
          <div class="form-floating">
            <input v-model="data.password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">Password</label>
            <span class="text-danger">{{ validation.passwordVal }}</span>
          </div>

          <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
          
        </form>
      </main>
    </div>
</template>

<script setup>
import axios from '@/plugins/axios'
import { reactive } from 'vue';
import router from '../router';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/composables/useToast';

const $toast = useToast();
const authStore = useAuthStore();

const data =  reactive(
  {
  userName: "",
  password: ""
});

const validation =  reactive(
  {
  userNameVal: "",
  passwordVal: ""
});

const submit =  async () =>{
    validation.userNameVal = "";
    validation.passwordVal = "";

    if(checkValidation()){
        const response = await axios.post("/auth/login",data);
        if (response.status === 200) {
            const authResponse = await response.data;
            
            authStore.setAuthDetails({
              jwt : authResponse.jwt,
              username: authResponse.username,
              email: authResponse.email,
              role: authResponse.role,
            });
            $toast.success('Login Successfully!', 'Success');

            await router.push("/");
        } else {
            console.error(response);
            $toast.error(response.data.reason, 'Error'); 

        }
    }
  
    

};
const checkValidation = () => {
    if(!data.userName){
      validation.userNameVal = "Username is required."
        return false;
    }
    if(!data.password){
      validation.passwordVal = "Password is required."
        return false;
    }
    return true;
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