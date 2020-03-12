import { layerHelper } from "@/helpers";
const mapper = {
    bunchMapper: item => {
        var data = {
            id: item.id,
            name: item.label,
            layers: item.layers.map(item => layerHelper.dynamicMapping(item)),
            type: "bunch",
            isActive: item.isActive,
            color: null,
            isSelected: false,
            isColorEnabled: true
        };
        return data;
    },
    mapBunchs: bunchs => {
        let mapResult = bunchs.map(item => mapper.bunchMapper(item));
        return mapResult;
    }
};

export default {
    ...mapper
};
