<template>
  <div class="my-menu">
    <el-menu-item :index="props.menuItem.key" :key="props.menuItem.key">
      //#hook_1
    </el-menu-item>
  </div>
</template>

//#end;
<script>
return {
  hook_1: {
    element: function () {
      return ` <SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
      <span v-if="!systemStore.isCollapse"> {{ props.menuItem.label }}</span>`;
    },
    antdv: function () {
      return `<SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
      <span v-if="!systemStore.isCollapse"> {{ props.menuItem.label }}</span>`;
    },
  },
};
</script>
