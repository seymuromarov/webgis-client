import $store from "@/store/store.js";
import { mapController, layerController } from "@/controllers";
const functions = {
  historyBack() {
    setters.setHistoryIsNeedUpdate(false);
    let historyIndex = getters.getHistoryIndex();
    historyIndex -= 1;
    setters.setHistoryIndex(historyIndex);

    let history = getters.getHistory();
    let historyItem = history[historyIndex - 1];

    let map = mapController.getMap();
    map.getView().setCenter(historyItem.center);
    map.getView().setZoom(historyItem.zoom);
    map.getView().setRotation(historyItem.rotation);
    mapController.setMap(map);

    setters.setHistoryIsNextExist(true);

    if (historyIndex === 1) setters.setHistoryIsPreviousExist(false);
  },

  historyNext() {
    let history = getters.getHistory();
    let historyIndex = getters.getHistoryIndex();
    if (historyIndex + 1 === history.length) {
      setters.setHistoryIsNextExist(false);
    }
    setters.setHistoryIsPreviousExist(true);

    setters.setHistoryIsNeedUpdate(false);

    historyIndex = historyIndex + 1;
    setters.setHistoryIndex(historyIndex);

    let historyItem = history[historyIndex - 1];
    let map = mapController.getMap();
    map.getView().setCenter(historyItem.center);
    map.getView().setZoom(historyItem.zoom);
    map.getView().setRotation(historyItem.rotation);
    mapController.setMap(map);
  },

  updateHistoryMap() {
    let isNeedUpdate = getters.getHistoryIsNeedUpdate();
    if (isNeedUpdate) {
      let map = mapController.getMap();
      let view = map.getView();

      let state = {
        zoom: view.getZoom(),
        center: view.getCenter(),
        rotation: view.getRotation(),
      };

      functions.updateHash();

      functions.addHistory(state);
      let history = getters.getHistory();
      setters.setHistoryIndex(history.length);
      setters.setHistoryIsNextExist(false);

      if (getters.getHistoryIndex() !== 1) {
        setters.setHistoryIsPreviousExist(true);
      }
    } else {
      setters.setHistoryIsNeedUpdate(true);
    }
  },

  updateHash() {
    let map = mapController.getMap();
    let view = map.getView();

    let state = {
      zoom: view.getZoom(),
      center: view.getCenter(),
      rotation: view.getRotation(),
    };
    var selectedLayers = layerController.getSelectedLayers();
    var selectedLayerIds = selectedLayers.map((item) => {
      return item.id;
    });
    let hash =
      "#shareMap=" +
      view.getZoom() +
      "&" +
      Math.round(view.getCenter()[0] * 100) / 100 +
      "&" +
      Math.round(view.getCenter()[1] * 100) / 100 +
      "&" +
      selectedLayerIds;
    window.history.pushState(state, "map", hash);
  },

  addHistory(data) {
    let history = getters.getHistory();
    history.push(data);
    setters.setHistory(history);
  },
};
const getters = {
  getHistory() {
    return $store.getters.history;
  },
  getHistoryIndex() {
    return $store.getters.historyIndex;
  },
  getHistoryIsNeedUpdate() {
    return $store.getters.historyIsNeedUpdate;
  },
  getHistoryIsNextExist() {
    return $store.getters.historyIsNextExist;
  },
  getHistoryIsPreviousExist() {
    return $store.getters.historyIsPreviousExist;
  },
};
const setters = {
  setHistory(payload) {
    $store.dispatch("saveHistory", payload);
  },
  setHistoryIsNeedUpdate(payload) {
    $store.dispatch("saveHistoryIsNeedUpdate", payload);
  },
  setHistoryIndex(payload) {
    $store.dispatch("saveHistoryIndex", payload);
  },
  setHistoryIsNextExist(payload) {
    $store.dispatch("saveHistoryIsNextExist", payload);
  },
  setHistoryIsPreviousExist(payload) {
    $store.dispatch("saveHistoryIsPreviousExist", payload);
  },
};

export default {
  ...getters,
  ...setters,
  ...functions,
};
