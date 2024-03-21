<template>
  <div class="header">
    <div class="flex-align">
      <div class="head-left flex-align">
        <div class="fold-icon flex-center" @click="clickIcon">
          //#hook_2
        </div>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="item.path">
            <a class="breadcrumb" v-if="index < breadcrumbList.length - 1">{{
              item.name
            }}</a>
            <span class="breadcrumb" v-else>{{ item.name }}</span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="head-right flex-align">

        <el-tooltip placement="bottom" content="主题">
          <el-dropdown trigger="click">
            //#hook_4
            <template //#hook_5>
              <el-dropdown-menu>
                <el-dropdown-item
                  :disabled="systemStore.themeValue === item.value"
                  v-for="item in themeList"
                  :key="item.value"
                  @click="command(item.value)"
                >
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-tooltip>

        <el-tooltip :content="screen ? '退出' : '全屏'" placement="bottom">
          //#hook_3
        </el-tooltip>

        <el-dropdown>
          <div class="user-right flex-align">
            <el-avatar :size="30" src="" />
            <span class="user-name">{{ userInfoStore.userName }}</span>
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
                class="tooltip"
                :styleIcon="styleIcon"
              />
              <SvgIcon
                v-else
                @click="clickFullscreen"
                iconName="FullScreen"
                class="tooltip"
                :styleIcon="styleIcon"
              />`;
      },
      antdv: function () {
        return `<template #title>
            <span>{{ screen ? "退出" : "全屏" }}</span>
          </template>
          <SvgIcon
          class="tooltip"
            v-if="screen"
            @click="clickFullscreen"
            iconName="CompressOutlined"
            :styleIcon="styleIcon"
          />
          <SvgIcon
            v-else
            @click="clickFullscreen"
            iconName="ExpandOutlined"
            class="tooltip"
            :styleIcon="styleIcon"
          />`;
      },
    },
    hook_4: {
      element: function () {
        return `<SvgIcon
              class="tooltip"
              iconName="MagicStick"
              :styleIcon="styleIcon"
            />`;
      },
      antdv: function () {
        return `<SvgIcon
            class="tooltip"
            iconName="BgColorsOutlined"
            :styleIcon="styleIcon"
          />`;
      },
    },
    hook_5: {
      element: function () {
        return `#dropdown`;
      },
      antdv: function () {
        return `#overlay`;
      },
    },
  }

};
</script>
