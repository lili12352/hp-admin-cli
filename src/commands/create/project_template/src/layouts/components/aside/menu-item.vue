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
      <template #title>
        <span> {{ props.menuItem.label }}</span>
      </template>`;
    },
    antdv: function () {
      return `<SvgIcon :iconName="props.menuItem.icon" :styleIcon="styleIcon" />
      <span > {{ props.menuItem.label }}</span>`;
    },
  },
};
</script>
