<template>
    <MdEditor v-bind="editorProps" />
  </template>
  
  <script setup>
  import { MdEditor } from 'md-editor-v3';
  const toolbars = [
  'bold',
  'underline',
  'italic',
  '-',
  'strikeThrough',
  'title',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'table',
  'mermaid',
  'katex',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'previewOnly',
  'catalog'
];
  const editorProps = {
    language: 'en-US',
    showToolbarName : false,
    toolbars : toolbars,
  };
  </script>
  