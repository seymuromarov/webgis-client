import request from "../utils/request";
import { BUNCH_URL } from "../config/urls";
let get = data => {
    return request.post(BUNCH_URL.ADD, data);
};
let getAll = () => {
    return request.get(BUNCH_URL.GET_ALL);
};
let add = data => {
    return request.post(BUNCH_URL.ADD, data);
};
let edit = data => {
    return request.post(BUNCH_URL.ADD, data);
};
let remove = id => {
    return request.delete(BUNCH_URL.DELETE + "/" + id);
};

export default { add, getAll, remove };
