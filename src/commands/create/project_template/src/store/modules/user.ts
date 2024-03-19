import { defineStore } from "pinia";
import { store } from "../index";
import { useSystemStoreWithOut } from "@/store/modules/system";
const systemStoreWithOut = useSystemStoreWithOut();

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
    component: "../views/home.vue",
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
interface State extends UserInfoParams {
  userName: string;
  token: string;
  role: string;
  routerList: RouterRes[];
}
interface UserInfoParams {
  userName: string;
  token: string;
  role: string;
}

export const useUserInfoStore = defineStore({
  id: "user",
  state: (): State => ({
    userName: "",
    token: "",
    role: "",
    routerList: [],
  }),
  actions: {
    dropLogin() {
      this.userName = "";
      this.token = "";
      this.role = "";
      this.routerList = [];
      systemStoreWithOut.resetSystem();
    },

    getToken() {
      return this.token;
    },
    setUser(params: UserInfoParams) {
      const { userName, token, role } = params;
      this.userName = userName;
      this.token = token;
      this.role = role;
    },
    async login() {
      await mn(0);
      this.setUser({
        userName: "admin",
        token: "d64406c94615a849a6cb0b71f3945879",
        role: "",
      });
    },
    async getUserInfo() {
      await mn(1000);
      this.role = "admin";
      systemStoreWithOut.setRouterList(routerList);
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
