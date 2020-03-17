import $store from "@/store/store.js";
import { bunchHelper } from "@/helpers";

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
            var item = list[i];
            if (item.id === bunchId) {
                const index = list.indexOf(item);
                list.splice(index, 1);
            }
        }
        bunchLayerList.set(list);
    },
};
const getters = {
    getBunch(bunchId) {
        let bunch = bunchLayerList.get().find(c => c.id == bunchId);
        return bunch;
    },
    getBunchLayer(bunchId, layerId) {
        const bunch = getters.getBunch(bunchId);
        const layer = bunch.layers.find(c => c.id === layerId);
        return layer;
    },
};

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
    },
    setQuery(bunch, serviceId, where) {
        let list = bunchLayerList.get();
        list = list.map((item, index) => {
            if (item.id === bunch.id) {
                var services = bunch.layers;
                services.map(s => {
                    if (s.id === serviceId) s.query.where = where;
                    return s;
                });
            }
            return item;
        });
        // return bunchLayerList;
        bunchLayerList.set(list);
    },
};

export default { ...setters, ...functions, ...getters };
