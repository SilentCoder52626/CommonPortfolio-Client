<template>
    <span class="antialiased font-medium -ml-3">{{ message }}</span>
  </template>
  
  <script>
  export default {
    name: 'LoaderSlot',
    props: {
      message: {
        type: String,
        default: 'Loading...',
      },
    },
  };
  </script>
  