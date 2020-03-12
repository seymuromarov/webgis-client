import request from "../utils/request";
import { URL } from "../config/urls";

export default {
    getCategories() {
        return request.get(URL + "/api/forum/Category");
    },
    getIssues(status = 1) {
        return request.get(URL + "/api/forum/Post/Statuses/" + status);
    },
    getIssueById(id) {
        return request.get(URL + "/api/forum/Post/" + id);
    },
    getIssueCount() {
        return request.get(URL + "/api/forum/Post/Counts");
    },
    insertIssue(body) {
        return request.post(URL + "/api/forum/Post", body);
    },
    deleteIssue(id) {
        return request.delete(URL + "/api/forum/Post/" + id);
    },
    insertComment(body) {
        return request.post(URL + "/api/forum/Comment", body);
    },
    deleteComment(id) {
        return request.delete(URL + "/api/forum/Comment/" + id);
    },
    closeIssue(id) {
        return request.put(URL + `/api/forum/Post/${id}/Close`);
    }
};
