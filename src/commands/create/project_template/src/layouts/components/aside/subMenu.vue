<template>
  <el-sub-menu
    :index="props.menu.key"
    v-if="menu.children && menu.children.length > 0"
    :key="props.menu.key"
  >
    <template #title>
      <SvgIcon :iconName="menu.icon" :styleIcon="styleIcon" />
      <span v-if="!systemStore.isCollapse">{{ menu.label }}</span>
    </template>
    <div class="my-menu">
      <MenuItem
        v-for="menuItem in menu.children"
        :key="menuItem.key"
        :menuItem="menuItem"
      />
    </div>
  </el-sub-menu>
</template>
