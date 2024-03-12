import {
  getJavaScriptFileSuffix,
  isTs,
} from "../../../../project_utils/index.js";
export const storeIndex = (params) => {
  const { answers } = params;
  const { variant } = answers;
  return `import { defineStore } from "pinia";
import { store } from "../index";

const mn = (time) => {
  return new Promise((res) => {
    setTimeout(() => {
      res("1");
    }, time);
  });
};
const routerList = [
  {
    path: "/a",
    name: "系统管理",
    meta: { icon: "ChatLineSquare" },
    component: "../views/a.vue",
  },
  {
    path: "/option",
    name: "参数一",
    component: "../layouts/components/main/index.vue",
    meta: { icon: "ChatLineSquare" },
    children: [
      {
        path: "/option/a",
        name: "参数二",
        component: "../views/option_1/a.vue",
        meta: { icon: "ChatLineSquare" },
      },
      {
        path: "/option/b",
        name: "参数三",
        component: "../views/option_1/b.vue",
        meta: { icon: "ChatLineSquare" },
      },
      {
        path: "/option/c",
        name: "参数四",
        component: "../views/option_1/c.vue",
        meta: { icon: "ChatLineSquare" },
      },
    ],
  },
];
${isTs(
  `interface State extends UserInfoParams {
  routerList: RouterRes[];
}
interface UserInfoParams {
  userName: string;
  token: string;
  role: string;
}`,
  variant
)}


export const useUserInfoStore = defineStore({
  id: "user",
  state: ()${isTs(": State", variant)} => ({
    userName: "",
    token: "",
    role: "",
    routerList: [],
  }),
  actions: {
    getToken() {
      return this.token;
    },
    setUser(params${isTs(": UserInfoParams", variant)}) {
      const { userName, token, role } = params;
      this.userName = userName;
      this.token = token;
      this.role = role;
    },
    setRouterList(routerList: any) {
      this.role = "admin";
      this.routerList = routerList;
    },
    async login() {
      await mn(0);
      this.setUser({
        userName: "data",
        token: "d64406c94615a849a6cb0b71f3945879",
        role: "",
      });
    },
    async getUserInfo() {
      await mn(1000);
      this.setRouterList(routerList);
      console.log("获取用户信息");
      return routerList;
    },
  },
  persist: {
    paths: ["userName", "token"],
  },
});

export const useUserInfoStoreWithOut = () => {
  return useUserInfoStore(store);
};
`;
};
const createFileName = (answers) => {
  const { variant } = answers;
  return `user.${getJavaScriptFileSuffix(variant)}`;
};
export default {
  createFileName: createFileName,
  createTemplate: storeIndex,
};
