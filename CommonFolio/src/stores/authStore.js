import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    jwt: localStorage.getItem('token') || null,
    username: null,
    email: null,
    role: null,
  }),
  actions: {
    setAuthDetails(authDetails) {
      this.jwt = authDetails.jwt;
      this.username = authDetails.username;
      this.email = authDetails.email;
      this.role = authDetails.role;
      localStorage.setItem("token", authDetails.jwt);
    },
    clearAuthDetails() {
      this.jwt = null;
      this.username = null;
      this.email = null;
      this.role = null;
      localStorage.removeItem("token");

    },
  },
  getters: {
    isLoggedIn: (state) => !!state.jwt,
    isAdmin : (state) => state.role === "Admin",
  },
  persist: true, 
});
