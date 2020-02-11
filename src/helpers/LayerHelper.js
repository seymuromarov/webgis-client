import { emlakUsers } from "../constants/permissions";

class LayerHelper {
    constructor(self) {
        this.data = self;
        this.counter = 0;
    }

    basemapMapping(val) {
        return {
            id: val.id,
            name: val.label,
            showingLabel: val.showingLabel,
            order: this.counter++,
            spatial: val.spatial,
            minZoomLevel: val.minZoomLevel,
            maxZoomLevel: val.maxZoomLevel,
            extent: val.extent,
            resourceType: val.resourceTypeId,
            mapType: val.mapTypeId,
            unitedDynamicLayerName:
                val.unitedDynamicLayer != null
                    ? this.basemapMapping(val.unitedDynamicLayer)
                    : null,
            layersVisibility: false,
            collapseVisibility: false,

            layers: null,
        };
    }
    dynamicMapping(val, index) {
        return {
            id: val.resourceTypeId.trim() === "local" ? val.id : val.id,
            name: val.label,
            showingLabel: val.showingLabel,
            order: index + 1,
            minZoomLevel: val.minZoomLevel,
            maxZoomLevel: val.maxZoomLevel,
            extent: val.extent,
            resourceType: val.resourceTypeId,
            mapType: val.mapTypeId,
            isDisabled: val.isDisabled,
            layersVisibility: false,
            collapseVisibility: false,
            query: { where: "" },
            layers: null,
            apiFrom: "internal",
        };
    }

    recursiveMap = (val, index) => {
        if (val.layers !== undefined) {
            return {
                name: val.label,
                order: this.counter++,
                mapTypeId: val.mapTypeId,
                children: val.children.map((val, i) =>
                    this.recursiveMap(val, index)
                ),
                layers: val.layers.map((val, i) =>
                    val.mapTypeId == "basemap"
                        ? this.basemapMapping(val)
                        : this.dynamicMapping(val, index)
                ),
            };
        } else
            return val.mapTypeId == "basemap"
                ? this.basemapMapping(val)
                : this.dynamicMapping(val, index);
    };

    creator = layers => {
        let baseLayers = layers
            .filter(c => c.mapTypeId === "basemap")
            .map((val, index) => this.recursiveMap(val, index));

        let dynamicLayers = layers
            .filter(c => c.mapTypeId === "dynamic")
            .map((val, index) => this.recursiveMap(val, index));
        return {
            baseLayers,
            dynamicLayers,
        };
    };

    add = () => {};
    delete = () => {};
    setColor = () => {};
    setLayout = () => {};
}

export default LayerHelper;
