<template>
  <div class="header">
    <div class="fold-icon" @click="clickIcon">
      <SvgIcon
        :iconName="systemStore.isCollapse ? 'Expand' : 'Fold'"
        :styleIcon="styleIcon"
      />
    </div>
  </div>
</template>
