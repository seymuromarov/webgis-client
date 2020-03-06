import $store from "@/store/store.js";
import { bunchService } from "@/services";
import { bunchHelper } from "@/helpers";

const bunchLayerList = {
  get() {
    return $store.getters.bunchLayerList;
  },
  set(data) {
    $store.dispatch("saveBunchLayerList", data);
  }
};

const functions = {
  add(bunch) {
    let list = bunchLayerList.get();
    bunch = bunchHelper.bunchMapper(bunch);
    list.push(bunch);
    bunchLayerList.set(list);
  },
  remove(bunchId) {
    let list = bunchLayerList.get();
    for (let i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.id === bunchId) {
        const index = list.indexOf(item);
        list.splice(index, 1);
      }
    }
    bunchLayerList.set(list);
  }
};
const getters = {};

const setters = {
  setSelected(bunchId, status) {
    let list = bunchLayerList.get();

    list = list.map((item, index) => {
      if (item.id === bunchId) item.isSelected = status;
      return item;
    });
    // return bunchLayerList;
    bunchLayerList.set(list);
  },
  setColor(bunchId, color) {
    let list = bunchLayerList.get();
    list = list.map((item, index) => {
      if (item.id === bunchId) item.color = color;
      return item;
    });
    // return bunchLayerList;
    bunchLayerList.set(list);
  }
};

export default { ...setters, ...functions };
