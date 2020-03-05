const mapper = {
  mapBunchs: bunchs => {
    let mapResult = bunchs.map((item, index) => {
      return {
        id: item.id,
        name: item.label,
        layers: item.layers,
        type: "bunch",
        isActive: item.isActive,
        isSelected: false,
        isColorEnabled: true
      };
    });
    return mapResult;
  }
};

export default {
  ...mapper
};
