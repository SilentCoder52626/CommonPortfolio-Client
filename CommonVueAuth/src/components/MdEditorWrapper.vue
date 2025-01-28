<template>
    <MdEditor v-bind="editorProps" />
  </template>
  
  <script setup>
  import { MdEditor } from 'md-editor-v3';
  const toolbars = ['bold', 'underline', 'italic','title', 'quote','unordered list','ordered list'];

  const editorProps = {
    language: 'en-US',
    showToolbarName : false,
  };
  </script>
  