import { useUserInfoStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
const userInfoStore = useUserInfoStore();
const router = useRouter();
const login = async () => {
  await userInfoStore.login();
  router.push("/");
};
//#end;
() => {
  console.log(login);
};
return {
  slot: {},
  hook: {},
};
