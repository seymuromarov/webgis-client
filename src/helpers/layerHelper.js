import { serviceTypeEnum } from "../constants/enums/serviceEnums";
import { colorHelper, serviceHelper } from "@/helpers";

const mapper = {
    basemapMapping: val => {
        return {
            id: val.id,
            name: val.label,
            showingLabel: val.showingLabel,
            spatial: val.spatial,
            minZoomLevel: val.minZoomLevel,
            maxZoomLevel: val.maxZoomLevel,
            extent: val.extent,
            resourceType: val.resourceTypeId,
            mapType: val.mapTypeId,
            type: serviceTypeEnum.LAYER,
            isDisabled: val.isDisabled,
            isSelected: false,

            layersVisibility: false,
            collapseVisibility: false,

            unitedDynamicLayerName:
                val.unitedDynamicLayer != null
                    ? mapper.basemapMapping(val.unitedDynamicLayer)
                    : null,

            layers: null,
        };
    },
    dynamicMapping: val => {
        return {
            id: val.resourceTypeId === "local" ? val.id : val.id,
            name: val.label,
            showingLabel: val.showingLabel,
            minZoomLevel: val.minZoomLevel,
            maxZoomLevel: val.maxZoomLevel,
            extent: val.extent,
            resourceType: val.resourceTypeId,
            mapType: val.mapTypeId,
            type: serviceTypeEnum.LAYER,
            isDisabled: val.isDisabled,
            isSelected: false,
            isColorEnabled: true,

            ...(val.resourceTypeId === "local" && { color: null }),

            layersVisibility: false,
            collapseVisibility: false,

            query: { where: "" },
            layers: null,
            apiFrom: "internal",
        };
    },
    recursiveMap: val => {
        if (val.layers !== undefined) {
            return {
                name: val.label,
                mapTypeId: val.mapTypeId,
                children: val.children.map((val, i) =>
                    mapper.recursiveMap(val)
                ),
                type: serviceTypeEnum.CATEGORY,
                layers: val.layers.map((val, i) =>
                    val.mapTypeId == "basemap"
                        ? mapper.basemapMapping(val)
                        : mapper.dynamicMapping(val)
                ),
            };
        } else
            return val.mapTypeId == "basemap"
                ? mapper.basemapMapping(val)
                : mapper.dynamicMapping(val);
    },
    subLayerMapping: (item, layer) => {
        item.color = null;
        item.type = serviceTypeEnum.SUBLAYER;
        item.isSelected = true;
        item.uid = parseInt(layer.id.toString() + item.id.toString());
        item.parent = layer;
        return item;
    },
    mapLayers: layers => {
        let baseLayers = layers
            .filter(c => c.mapTypeId === "basemap")
            .map(val => mapper.recursiveMap(val));

        let dynamicLayers = layers
            .filter(c => c.mapTypeId === "dynamic")
            .map(val => mapper.recursiveMap(val));

        const mapResult = {
            baseLayers,
            dynamicLayers,
        };
        return mapResult;
    },

    recursiveLayerMapping: (layerArr, callback) => {
        for (let i = 0; i < layerArr.length; i++) {
            const item = layerArr[i];
            mapper.recursiveMapping(item, callback);
        }
        return layerArr;
    },

    recursiveTreeMapping: arr => {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i];
            item = mapper.recursiveTreeSelectMapping(item);
        }
    },
    recursiveTreeSelectMapping: item => {
        const isCategory = serviceHelper.isCategory(item);
        if (isCategory) {
            item.children = [...item.children, item.layers];
            const { id, name, children } = item;
            item = { id, name, children };

            for (let i = 0; i < item.children.length; i++) {
                const child = item.children[i];
                item.children = mapper.recursiveTreeSelectMapping(
                    child,
                    callback
                );
            }
            return item;
        } else {
            return { id: item.name, label: item.label };
        }
    },

    recursiveMapping: (item, callback) => {
        const isCategory = serviceHelper.isCategory(item);
        if (isCategory) {
            //group

            if (item.children && item.children.length > 0) {
                for (let i = 0; i < item.children.length; i++) {
                    const child = item.children[i];
                    mapper.recursiveMapping(child, callback);
                }
            }

            if (item.layers && item.layers.length > 0) {
                for (let i = 0; i < item.layers.length; i++) {
                    const layer = item.layers[i];
                    mapper.recursiveMapping(layer, callback);
                }
            }
        } //layer
        else {
            if (callback && typeof callback === "function") {
                callback(item);
            }
        }
    },
};

const functions = {
    renderArcgisSublayerConfig: service => {
        const subLayers = service.layers;
        const activeLayers = subLayers
            .filter(c => c.isSelected)
            .map((item, index) => {
                return item.id;
            });
        const hiddenLayers = subLayers
            .filter(c => !c.isSelected)
            .map((item, index) => {
                return item.id;
            });
        let config = "";
        if (activeLayers.length > 0) {
            config = "show:" + activeLayers.join(" , ");
        } else {
            config = "hide:" + hiddenLayers.join(" , ");
        }

        return config;
    },
    renderSubLayersColorString: layer => {
        const colorStringArr = [];
        for (let i = 0; i < layer.layers.length; i++) {
            let subLayer = layer.layers[i];

            if (subLayer.color !== undefined && subLayer.color !== null) {
                let colorString = colorHelper.renderColor(
                    subLayer.id,
                    subLayer.color.fill,
                    subLayer.color.border
                );

                colorStringArr.push(colorString);
            }
        }
        let result = "";
        if (colorStringArr.length > 0)
            result = "[" + colorStringArr.join(" , ") + "]";

        return result;
    },
};

export default {
    ...functions,
    // ...serviceHelper,
    ...mapper,
};
