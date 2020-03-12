import $store from "@/store/store.js";
const tableData = {
    get() {
        return $store.getters.tableData;
    },
    set(val) {
        $store.dispatch("SAVE_DATATABLE", val);
    },
};
const getters = {
    getData(serviceId) {
        let data = tableData.get();
        return data.find(x => x.service.id === serviceId);
    },
};

const setters = {
    setPaging(serviceId, val) {
        let data = tableData.get();
        data = data.map(item => {
            if (item.service.id === serviceId) item.paging = val;
            return item;
        });
        tableData.set(data);
    },
};
export default { ...getters, ...setters };
