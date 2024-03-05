## Introduction

hp-admin-cli是一款能根据需求自动配置vue后台管理的脚手架，内置使用vue3 + vue-router +pinia 其他功能均可自定义

## Install

```
npm i hp-admin-cli -g
```

## use

```
admin-cli create <name>
```

## peculiarity

- 极简操作，安装就可配置
- 自定义技术栈 :  vue3 +elementUI or vue3+Ant Design 由你搭配
- 自定义后台管理功能模块：权限配置 or 多语言 or 动态换肤 项目功能由你选择
- 代码规范可配置：自选是否在项目中应用eslint 和Prettier 

## Feature

- 框架技术自提
  - [x] 语言选择： typeScript or javaScript
  - [ ] ui库选择 ：element Plus or Ant Design
  - [ ] css扩展语言选择: less or scss
  - [ ] 代码规范:eslint 和Prettier
- 框架模块自提
  - [ ] 多语言：使用i18配置多语言
  - [ ] 多主题：内置普通、护眼、黑暗、深蓝四种主题模式
  - [ ] 多布局：内置左侧、顶部两种布局模型
  - [ ] 用户管理：登录、登出演示
  - [ ] 权限管理：内置页面权限（动态路由）、按钮权限
