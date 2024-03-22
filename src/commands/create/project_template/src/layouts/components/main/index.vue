<script setup lang="ts"></script>

<template>
  <div class="main-container">
    <router-view />
  </div>
</template>
<style lang="scss" scoped>
.main-container {
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
