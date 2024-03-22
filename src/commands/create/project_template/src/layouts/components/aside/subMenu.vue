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

    <div v-for="menuItem in menu.children" :key="menuItem.key">
      <SubMenu
        :menu="menuItem"
        :isCollapse="systemStore.isCollapse"
        v-if="menuItem.children && menuItem.children.length > 0"
      />
      <div class="my-menu" v-else>
        <MenuItem :menuItem="menuItem" />
      </div>
    </div>
  </el-sub-menu>
</template>
