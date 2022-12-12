import request from "@/utils/request";
import { USERLIST, EDITORUSER } from "@/constants/api";
export function getUsers(data: any): any {
  return request({
    url: USERLIST,
    method: "post",
    data,
  });
}
export function editorUser(data: any) {
  return request({
    url: EDITORUSER + "/" + data.id,
    method: "put",
    data,
  });
}
