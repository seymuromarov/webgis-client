import request from "../utils/request";
import { BUNCH_URL } from "../config/urls";
let addBunch = data => {
  return request.post(BUNCH_URL.ADD, data);
};
let editBunch = data => {
  return request.post(BUNCH_URL.ADD, data);
};
let deleteBunch = data => {
  return request.post(BUNCH_URL.ADD, data);
};
let getBunch = data => {
  return request.post(BUNCH_URL.ADD, data);
};
let getAllBunchs = () => {
  return request.get(BUNCH_URL.GET_ALL);
};

export default { addBunch };
