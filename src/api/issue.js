import request from "@/utils/request";
import { ISSUE_URLS } from "@/config/urls";

export default {
  get(id) {
    return request.get(ISSUE_URLS.GET(id));
  },
  getAll(params) {
    return request.get(ISSUE_URLS.GET_ALL, { params });
  },
  getAllOpen(params) {
    return this.getAll({ ...params, status: 1 });
  },
  getAllClosed(params) {
    return this.getAll({ ...params, status: 2 });
  },
  getCounts() {
    return request.get(ISSUE_URLS.GET_TOTAL_COUNTS);
  },
  add(data) {
    return request.post(ISSUE_URLS.ADD, data);
  },
  edit(data) {
    return request.put(ISSUE_URLS.EDIT, data);
  },
  delete(id) {
    return request.delete(ISSUE_URLS.DELETE(id));
  },
  close(id) {
    return request.delete(ISSUE_URLS.CLOSE(id));
  },
};
