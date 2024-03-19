import service from "@/utils/request";

/** 登录 */
export function userLoginApi(data) {
  return service({
    url: "user/login",
    method: "post",
    data,
  });
}
