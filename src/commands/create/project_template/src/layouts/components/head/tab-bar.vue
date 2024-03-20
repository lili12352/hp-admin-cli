<template>
  <div class="tab-bar flex-align">
    <div class="icon flex-align">
      <SvgIcon @click="clickScroll(-10)" iconName="ArrowLeftBold" />
    </div>
    <div class="scroll" id="scroll">
      <div class="tab-bar">
        <a
          class="tab"
          :class="{
            select: router.currentRoute.value.fullPath === tabKey.path,
          }"
          v-for="tabKey in systemStore.tabBarList"
          :key="tabKey.path"
          @click="goRouter(tabKey.path)"
          >{{ tabKey.name }}
          <div
            v-if="tabKey.path !== '/home'"
            class="close flex-center"
            @click.stop="systemStore.delTabbar(tabKey.path)"
          >
            <SvgIcon :styleIcon="styleIcon" iconName="Close" />
          </div>
        </a>
      </div>
    </div>
    <div class="icon flex-align">
      <SvgIcon @click="clickScroll(10)" iconName="ArrowRightBold" />
    </div>
  </div>
</template>
