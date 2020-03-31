import $store from "@/store/store.js";

const functions = {
    deleteService(service) {
        let layersToRemove = [];
        var mapLayer = $store.getters.mapLayer;
        mapLayer.getLayers().forEach(function (layer) {
            if (
                layer.get("name") != undefined &&
                layer.get("name") === service.name
            ) {
                layersToRemove.push(layer);
            }
        });
        let len = layersToRemove.length;
        for (let i = 0; i < len; i++) functions.removeLayer(layersToRemove[i]);
    },
    removeLayer(layer) {
        var mapLayer = $store.getters.mapLayer;
        mapLayer.removeLayer(layer);
        $store.dispatch("saveMap", mapLayer);
    },
    fitView(extent) {
        var map = mapLayer.get();
        map.getView().fit(extent);
        mapLayer.set(map);
    },
    renderNewService(service) {
        var isLayer = serviceHelper.isLayer(service);
        let zoomLevelProperties = getter.getZoomLevelOptions(service);

        let new_layer;

        let url = URL + "/api/map/service/" + service.name + "/MapServer/";
        if (isLayer) {
            var isDynamic = serviceHelper.isDynamic(service);
            if (isDynamic) {
                if (serviceHelper.isLocalService(service)) {
                    new_layer = new VectorTileLayer({
                        id: service.id,
                        ...zoomLevelProperties,
                        source: new VectorTileSource({
                            format: new MVT({
                                geometryName: "geom"
                            }),
                            url:
                                URL +
                                "/" +
                                MAP_URLS.MVT +
                                `/${service.id}/{z}/{x}/{y}/` +
                                (service.query.where != ""
                                    ? this.objectToQueryString(service.query)
                                    : "")
                        }),
                        style: this.getVectorStyle(service.color)
                    });
                } else {
                    new_layer = new ImageLayer({
                        ...zoomLevelProperties,
                        source: new ImageArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                token: this.token,
                                layers: layerHelper.renderArcgisSublayerConfig(service),
                                dynamicLayers: layerHelper.renderSubLayersColorString(service)
                            }
                        })
                    });
                }
            } else {
                if (service.spatial === 3857) {
                    url = url + "/tile/{z}/{y}/{x}?token=" + this.token;
                    new_layer = new TileLayer({
                        ...zoomLevelProperties,
                        source: new XYZ({
                            url: url,
                            projection: "EPSG:3857",
                            crossOrigin: "Anonymous"
                        })
                    });
                } else {
                    new_layer = new TileLayer({
                        ...zoomLevelProperties,
                        source: new TileArcGISRest({
                            url: url,
                            crossOrigin: "Anonymous",
                            params: {
                                token: this.token,
                                FORMAT: "png8"
                            }
                        })
                    });
                }
            }
        } else {
            var queryParams = service.layers.map((item, index) => {
                return {
                    layerId: item.id,
                    query: item.query
                };
            });
            var params = { queries: queryParams };
            new_layer = new VectorTileLayer({
                id: service.id,
                source: new VectorTileSource({
                    format: new MVT({
                        geometryName: "geom"
                    }),
                    url:
                        URL +
                        "/api/Tile/Intersect/VectorAsMvt" +
                        `/${service.id}/{z}/{x}/{y}/?` +
                        qs.stringify(params, {
                            arrayFormat: "indices",
                            allowDots: true
                        })
                }),
                style: feature => {
                    var featureLayerId = feature.get("layerId");
                    var layerIds = service.layers.map(item => {
                        return item.id;
                    });
                    var index = layerIds.indexOf(featureLayerId);

                    var color = materialColors[index];
                    var colorObj = {
                        border: {
                            hex8: color
                        },
                        fill: {
                            hex8: "#FFFFFF00"
                        }
                    };

                    return this.getVectorStyle(colorObj);
                }
            });
        }

        return new_layer;
    }
};
const getters = {
    getLayer(id) {
        let layer = null;
        mapLayer
            .get()
            .getLayers()
            .forEach(function (lyr) {
                var layerId = lyr.values_.id;
                if (layerId !== undefined && layerId === id) {
                    layer = lyr;
                }
            });
        return layer;
    },
    getZoomLevelOptions(service) {
        return {
            maxResolution: createXYZ().getResolution(service.minZoomLevel) * 1.01,
            minResolution: createXYZ().getResolution(service.maxZoomLevel)
        };
    }
};
export default { ...functions, ...getters };
