<template>
  <div class="header">
    <div class="flex-align">
      <div class="head-left flex-align">
        <div class="fold-icon flex-center" @click="clickIcon">
          //#hook_2
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
            <a v-if="index < breadcrumbList.length - 1">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head-right flex-align">
        <div class="flex-align">
              //#hook_3
            </div>
        <el-dropdown>
          <div class="user-right flex-align">
            <el-avatar :size="30" src="" />
            <span>{{ userInfoStore.userName }}</span>
          </div>
          <template //#hook_1>
            <el-dropdown-menu>
              <el-dropdown-item @click="clickGoGithub">github</el-dropdown-item>
              <el-dropdown-item divided @click="dropLogin"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <TabBar />
  </div>

</template>

//#end;
<script>
return {
  slot:{
    hook_1: {
      element: function () {
        return `#dropdown`;
      },
      antdv: function () {
        return `#overlay`;
      },
    },
    hook_2: {
      element: function () {
        return `<SvgIcon
            :iconName="systemStore.isCollapse ? 'Expand' : 'Fold'"
            :styleIcon="styleIcon"
          />`;
      },
      antdv: function () {
        return `<SvgIcon
            :iconName="
              systemStore.isCollapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'
            "
            :styleIcon="styleIcon"
          />`;
      },
    },
    hook_3: {
      element: function () {
        return `<SvgIcon
                v-if="screen"
                @click="clickFullscreen"
                iconName="fullscreen-exit"
                :styleIcon="styleIcon"
              />
              <SvgIcon
                v-else
                @click="clickFullscreen"
                iconName="FullScreen"
                :styleIcon="styleIcon"
              />`;
      },
      antdv: function () {
        return `<SvgIcon
                v-if="screen"
                @click="clickFullscreen"
                iconName="CompressOutlined"
                :styleIcon="styleIcon"
              />
              <SvgIcon
                v-else
                @click="clickFullscreen"
                iconName="ExpandOutlined"
                :styleIcon="styleIcon"
              />"
          />`;
      },
    },
  }

};
</script>
