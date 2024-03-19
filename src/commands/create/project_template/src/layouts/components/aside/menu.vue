<template>
  <el-menu
    :collapse-transition="false"
    :collapse="props.isCollapse"
    active-text-color="#ffffff"
    text-color="#ffffffa6"
    background-color="#1a1a1a"
    class="el-menu-vertical-demo"
    :default-active="defaultActive"
    :show-timeout="0"
    :hide-timeout="0"
    @select="select"
  >
    <slot />
  </el-menu>
</template>
