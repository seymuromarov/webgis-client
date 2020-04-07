import $store from "@/store/store.js";
const tableData = {
  get() {
    return $store.getters.tableData;
  },
  set(val) {
    $store.dispatch("SAVE_DATATABLE", val);
  }
};
const getters = {
  getData(serviceId) {
    let data = tableData.get();
    let result = data.find(x => x.service.id === serviceId);
    return result;
  },
  getTableActiveService() {
    return $store.getters.tableActiveService;
  }
};

const setters = {
  setVisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", true);
  },
  setUnvisible() {
    $store.dispatch("SAVE_DATATABLE_VISIBLE", false);
  },
  setPaging(serviceId, val) {
    let data = tableData.get();
    data = data.map(item => {
      if (item.service.id === serviceId) item.paging = val;
      return item;
    });
    tableData.set(data);
  }
};
export default { ...getters, ...setters };
