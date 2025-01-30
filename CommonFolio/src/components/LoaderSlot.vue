<template>
    <span class="antialiased font-medium ">{{ message }}</span>
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
  