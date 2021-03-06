import $store from "@/store/store.js";
import { bunchHelper } from "@/helpers";
import { deepClone } from "@/utils";
const bunchLayerList = {
  get() {
    return $store.getters.bunchLayerList;
  },
  set(data) {
    $store.dispatch("saveBunchLayerList", data);
  },
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
      const item = list[i];
      if (item.id === bunchId) {
        const index = list.indexOf(item);
        list.splice(index, 1);
      }
    }
    bunchLayerList.set(list);
  },
};
const getters = {
  getBunchLayerList() {
    let data = bunchLayerList.get();
    return deepClone(data);
  },
  getBunch(bunchId) {
    let bunch = bunchLayerList.get().find((c) => c.id == bunchId);
    return bunch;
  },
  getBunchLayer(bunchId, layerId) {
    const bunch = getters.getBunch(bunchId);
    const layer = bunch.layers.find((c) => c.id === layerId);
    return layer;
  },
  getExtentCoordinates(bunchId) {
    var arr = [];
    let bunch = getters.getBunch(bunchId);
    bunch.layers.forEach(function(layer) {
      arr.push(layer.query.extentCoordinates);
    });
    return arr;
  },
};

const setters = {
  setBunchLayerList(data) {
    $store.dispatch("saveBunchLayerList", data);
  },
  setSelected(bunch, status) {
    let list = bunchLayerList.get();

    list = list.map((item, index) => {
      if (item.id === bunch.id) item.isSelected = status;
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
  },
  setQuery(bunch, bunchLayerId, query) {
    let list = bunchLayerList.get();
    list = list.map((item, index) => {
      if (item.id === bunch.id) {
        const services = bunch.layers;
        services.map((s) => {
          if (s.id === bunchLayerId) s.query.where = query;
          return s;
        });
      }
      return item;
    });
    // return bunchLayerList;
    bunchLayerList.set(list);
  },
  setExtentCoordinates(bunch, coordinates) {
    let list = bunchLayerList.get();
    list = list.map((item, index) => {
      if (item.id === bunch.id) {
        const layers = bunch.layers;

        layers.forEach(function(layer) {
          layer.query.extentCoordinates = coordinates;
        });
      }
      return item;
    });
    bunchLayerList.set(list);
  },
};

export default { ...setters, ...functions, ...getters };
